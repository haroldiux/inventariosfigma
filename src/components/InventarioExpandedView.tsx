import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { supabase } from "../services/supabase";
import { toast } from "sonner";
import { Plus, Edit2, AlertCircle } from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  current_stock: number;
  min_stock: number;
  max_stock: number;
  category?: { name: string };
  unit_of_measure?: { name: string; abbreviation: string };
}

interface StockMovement {
  id: string;
  product_id: string;
  quantity_change: number;
  movement_type: string;
  reason: string;
  created_at: string;
}

export function InventarioExpandedView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    quantity: "",
    movementType: "entrada",
    reason: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("products").select(
        `*,
        category:categories(id, name),
        unit_of_measure:units_of_measure(name, abbreviation)`
      );

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error loading products:", error);
      toast.error("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStock = async () => {
    if (!formData.quantity || !selectedProduct) {
      toast.error("Complete los campos");
      return;
    }

    try {
      const quantity = parseFloat(formData.quantity);
      const newStock = selectedProduct.current_stock + quantity;

      if (newStock < 0) {
        toast.error("No hay suficiente stock");
        return;
      }

      const { error: updateError } = await supabase
        .from("products")
        .update({ current_stock: newStock })
        .eq("id", selectedProduct.id);

      if (updateError) throw updateError;

      toast.success("Stock actualizado");
      setFormData({ quantity: "", movementType: "entrada", reason: "" });
      setShowDialog(false);
      loadProducts();
    } catch (error) {
      console.error("Error updating stock:", error);
      toast.error("Error al actualizar stock");
    }
  };

  const getStockStatus = (product: Product) => {
    if (product.current_stock < product.min_stock) {
      return { color: "bg-red-100", textColor: "text-red-800", label: "BAJO" };
    } else if (product.current_stock > product.max_stock) {
      return { color: "bg-orange-100", textColor: "text-orange-800", label: "ALTO" };
    }
    return { color: "bg-green-100", textColor: "text-green-800", label: "OK" };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  const lowStockProducts = products.filter((p) => p.current_stock < p.min_stock);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inventario</h1>
        <p className="text-gray-600 mt-2">
          Gestione el inventario y movimientos de stock
        </p>
      </div>

      {lowStockProducts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <CardTitle className="text-orange-900">
                Productos con Stock Bajo
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockProducts.map((product) => (
                <p key={product.id} className="text-sm text-orange-800">
                  <span className="font-semibold">{product.name}</span> - Stock actual:{" "}
                  {product.current_stock} (Mínimo: {product.min_stock})
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Estado del Inventario</CardTitle>
          <CardDescription>
            Productos y sus niveles actuales de stock
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Unidad</TableHead>
                  <TableHead>Stock Mín.</TableHead>
                  <TableHead>Stock Actual</TableHead>
                  <TableHead>Stock Máx.</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => {
                  const status = getStockStatus(product);
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>{product.category?.name}</TableCell>
                      <TableCell>
                        {product.unit_of_measure?.abbreviation}
                      </TableCell>
                      <TableCell>{product.min_stock}</TableCell>
                      <TableCell className="font-bold">
                        {product.current_stock}
                      </TableCell>
                      <TableCell>{product.max_stock}</TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color} ${status.textColor}`}
                        >
                          {status.label}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Dialog open={showDialog && selectedProduct?.id === product.id} onOpenChange={(open) => {
                          setShowDialog(open);
                          if (!open) setSelectedProduct(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowDialog(true);
                              }}
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Movimiento
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>
                                Registrar Movimiento - {product.name}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Tipo de Movimiento</Label>
                                <div className="flex gap-4 mt-2">
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      value="entrada"
                                      checked={formData.movementType === "entrada"}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          movementType: e.target.value,
                                        })
                                      }
                                    />
                                    <span>Entrada</span>
                                  </label>
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      value="salida"
                                      checked={formData.movementType === "salida"}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          movementType: e.target.value,
                                        })
                                      }
                                    />
                                    <span>Salida</span>
                                  </label>
                                </div>
                              </div>

                              <div>
                                <Label>Cantidad *</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={formData.quantity}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      quantity: e.target.value,
                                    })
                                  }
                                  placeholder="0.00"
                                />
                              </div>

                              <div>
                                <Label>Razón/Nota</Label>
                                <Input
                                  value={formData.reason}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      reason: e.target.value,
                                    })
                                  }
                                  placeholder="Motivo del movimiento"
                                />
                              </div>

                              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                                <p className="text-sm text-blue-800">
                                  <span className="font-semibold">Stock Actual:</span>{" "}
                                  {product.current_stock}{" "}
                                  {product.unit_of_measure?.abbreviation}
                                </p>
                                <p className="text-sm text-blue-800 mt-1">
                                  <span className="font-semibold">Nuevo Stock:</span>{" "}
                                  {(
                                    product.current_stock +
                                    (formData.movementType === "entrada"
                                      ? parseFloat(formData.quantity || "0")
                                      : -parseFloat(formData.quantity || "0"))
                                  ).toFixed(2)}{" "}
                                  {product.unit_of_measure?.abbreviation}
                                </p>
                              </div>

                              <Button
                                onClick={handleUpdateStock}
                                className="w-full bg-green-600 hover:bg-green-700"
                              >
                                Registrar Movimiento
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
