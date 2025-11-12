import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Switch } from "./ui/switch";
import { supabase } from "../services/supabase";
import { calculatePrice, getSystemConfig } from "../services/priceCalculator";
import { toast } from "sonner";
import { Plus, Trash2, Eye, Download } from "lucide-react";

interface Supplier {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  unit_of_measure?: { abbreviation: string };
}

interface Region {
  id: string;
  name: string;
}

interface PurchaseOrder {
  id: string;
  order_number: string;
  supplier_id: string;
  order_date: string;
  expected_delivery_date: string;
  status: string;
  subtotal: number;
  total_tax: number;
  total_amount: number;
  supplier?: { name: string };
  purchase_order_items?: PurchaseOrderItem[];
}

interface PurchaseOrderItem {
  id: string;
  product_id: string;
  quantity: number;
  gross_price: number;
  tax_rate: number;
  tax_amount: number;
  net_price: number;
  is_invoiced: boolean;
  line_total: number;
  product?: { name: string; sku: string };
}

export function ComprasExpandedView() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const [orderForm, setOrderForm] = useState({
    supplierId: "",
    orderDate: new Date().toISOString().split("T")[0],
    expectedDeliveryDate: "",
    notes: "",
  });

  const [itemForm, setItemForm] = useState({
    productId: "",
    regionId: "",
    quantity: "",
    grossPrice: "",
    isInvoiced: true,
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [ordersRes, suppliersRes, productsRes, regionsRes] = await Promise.all([
        supabase
          .from("purchase_orders")
          .select(`*, supplier:suppliers(id, name), purchase_order_items(*)`)
          .order("order_date", { ascending: false }),
        supabase.from("suppliers").select("id, name"),
        supabase
          .from("products")
          .select("id, name, sku, unit_of_measure:units_of_measure(abbreviation)"),
        supabase.from("regions").select("id, name"),
      ]);

      if (ordersRes.data) setOrders(ordersRes.data);
      if (suppliersRes.data) setSuppliers(suppliersRes.data);
      if (productsRes.data) setProducts(productsRes.data);
      if (regionsRes.data) setRegions(regionsRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  const generateOrderNumber = () => {
    const date = new Date();
    const timestamp = date.getTime().toString().slice(-6);
    return `ORD-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}-${timestamp}`;
  };

  const handleCreateOrder = async () => {
    if (!orderForm.supplierId) {
      toast.error("Seleccione un proveedor");
      return;
    }

    try {
      const orderNumber = generateOrderNumber();
      const { data, error } = await supabase
        .from("purchase_orders")
        .insert([
          {
            order_number: orderNumber,
            supplier_id: orderForm.supplierId,
            order_date: orderForm.orderDate,
            expected_delivery_date: orderForm.expectedDeliveryDate || null,
            notes: orderForm.notes,
          },
        ])
        .select();

      if (error) throw error;

      toast.success("Orden de compra creada");
      setOrderForm({
        supplierId: "",
        orderDate: new Date().toISOString().split("T")[0],
        expectedDeliveryDate: "",
        notes: "",
      });
      loadInitialData();
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Error al crear orden");
    }
  };

  const handleAddItem = async (orderId: string) => {
    if (
      !itemForm.productId ||
      !itemForm.regionId ||
      !itemForm.quantity ||
      !itemForm.grossPrice
    ) {
      toast.error("Complete todos los campos");
      return;
    }

    try {
      const config = await getSystemConfig(supabase);
      const calculation = await calculatePrice(
        {
          grossPrice: parseFloat(itemForm.grossPrice),
          regionId: itemForm.regionId,
          isInvoiced: itemForm.isInvoiced,
          ivaPercentage: config.iva,
          uninvoicedIncrement: config.uninvoicedIncrement,
        },
        supabase
      );

      const quantity = parseFloat(itemForm.quantity);
      const lineTotal = calculation.netPrice * quantity;

      const { error } = await supabase.from("purchase_order_items").insert([
        {
          purchase_order_id: orderId,
          product_id: itemForm.productId,
          supplier_id: selectedOrder?.supplier_id,
          region_id: itemForm.regionId,
          quantity,
          gross_price: calculation.grossPrice,
          tax_rate: calculation.taxRate,
          tax_amount: calculation.taxAmount,
          net_price: calculation.netPrice,
          is_invoiced: itemForm.isInvoiced,
          line_total: lineTotal,
        },
      ]);

      if (error) throw error;

      const totalTax = (selectedOrder?.purchase_order_items || []).reduce(
        (sum, item) => sum + item.tax_amount,
        calculation.taxAmount
      );
      const subtotal = (selectedOrder?.purchase_order_items || []).reduce(
        (sum, item) => sum + item.gross_price * item.quantity,
        calculation.grossPrice * quantity
      );
      const totalAmount = subtotal + totalTax;

      await supabase
        .from("purchase_orders")
        .update({
          subtotal,
          total_tax: totalTax,
          total_amount: totalAmount,
        })
        .eq("id", orderId);

      toast.success("Producto agregado a la orden");
      setItemForm({
        productId: "",
        regionId: "",
        quantity: "",
        grossPrice: "",
        isInvoiced: true,
      });
      loadInitialData();
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Error al agregar producto");
    }
  };

  const handleDeleteItem = async (itemId: string, orderId: string) => {
    try {
      const { error } = await supabase
        .from("purchase_order_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;

      toast.success("Producto removido");
      loadInitialData();
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error al eliminar producto");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Órdenes de Compra</h1>
        <p className="text-gray-600 mt-2">
          Gestione órdenes de compra con cálculos automáticos de impuestos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Órdenes de Compra</CardTitle>
                <CardDescription>Todas las órdenes registradas</CardDescription>
              </div>
              <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Orden
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Crear Nueva Orden de Compra</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Proveedor *</Label>
                      <Select
                        value={orderForm.supplierId}
                        onValueChange={(value) =>
                          setOrderForm({ ...orderForm, supplierId: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione proveedor" />
                        </SelectTrigger>
                        <SelectContent>
                          {suppliers.map((supplier) => (
                            <SelectItem key={supplier.id} value={supplier.id}>
                              {supplier.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Fecha de Orden</Label>
                      <Input
                        type="date"
                        value={orderForm.orderDate}
                        onChange={(e) =>
                          setOrderForm({ ...orderForm, orderDate: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label>Fecha Entrega Esperada</Label>
                      <Input
                        type="date"
                        value={orderForm.expectedDeliveryDate}
                        onChange={(e) =>
                          setOrderForm({
                            ...orderForm,
                            expectedDeliveryDate: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Notas</Label>
                      <Input
                        value={orderForm.notes}
                        onChange={(e) =>
                          setOrderForm({ ...orderForm, notes: e.target.value })
                        }
                        placeholder="Notas adicionales"
                      />
                    </div>

                    <Button
                      onClick={handleCreateOrder}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Crear Orden
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 border rounded-lg cursor-pointer transition ${
                    selectedOrder?.id === order.id
                      ? "bg-blue-50 border-blue-300"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{order.order_number}</p>
                      <p className="text-sm text-gray-600">{order.supplier?.name}</p>
                      <p className="text-xs text-gray-500">{order.order_date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        ${order.total_amount.toFixed(2)}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedOrder && (
          <Card>
            <CardHeader>
              <CardTitle>Detalles de Orden</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Número de Orden</p>
                <p className="font-semibold">{selectedOrder.order_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Proveedor</p>
                <p className="font-semibold">{selectedOrder.supplier?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fecha</p>
                <p className="font-semibold">{selectedOrder.order_date}</p>
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>${selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuestos:</span>
                  <span>${selectedOrder.total_tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>${selectedOrder.total_amount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {selectedOrder && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Ítems de la Orden</CardTitle>
                <CardDescription>
                  Productos incluidos en {selectedOrder.order_number}
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Producto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Agregar Producto a Orden</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Producto *</Label>
                      <Select
                        value={itemForm.productId}
                        onValueChange={(value) =>
                          setItemForm({ ...itemForm, productId: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione producto" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name} ({product.sku})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Región *</Label>
                      <Select
                        value={itemForm.regionId}
                        onValueChange={(value) =>
                          setItemForm({ ...itemForm, regionId: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione región" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region.id} value={region.id}>
                              {region.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Cantidad *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={itemForm.quantity}
                        onChange={(e) =>
                          setItemForm({ ...itemForm, quantity: e.target.value })
                        }
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <Label>Precio Bruto *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={itemForm.grossPrice}
                        onChange={(e) =>
                          setItemForm({ ...itemForm, grossPrice: e.target.value })
                        }
                        placeholder="0.00"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="invoiced-item">Facturado</Label>
                      <Switch
                        id="invoiced-item"
                        checked={itemForm.isInvoiced}
                        onCheckedChange={(checked) =>
                          setItemForm({ ...itemForm, isInvoiced: checked })
                        }
                      />
                    </div>

                    <Button
                      onClick={() => handleAddItem(selectedOrder.id)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Agregar Producto
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Precio Bruto</TableHead>
                    <TableHead>Impuesto %</TableHead>
                    <TableHead>Precio Neto</TableHead>
                    <TableHead>Total Línea</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(selectedOrder.purchase_order_items || []).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.product?.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.gross_price.toFixed(2)}</TableCell>
                      <TableCell>{item.tax_rate.toFixed(2)}%</TableCell>
                      <TableCell>${item.net_price.toFixed(2)}</TableCell>
                      <TableCell className="font-semibold">
                        ${item.line_total.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() =>
                            handleDeleteItem(item.id, selectedOrder.id)
                          }
                          className="p-1 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
