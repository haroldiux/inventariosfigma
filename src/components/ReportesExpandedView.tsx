import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { supabase } from "../services/supabase";
import { toast } from "sonner";
import { Download, BarChart3 } from "lucide-react";

interface PriceReport {
  product_name: string;
  supplier_name: string;
  region_name: string;
  gross_price: number;
  tax_rate: number;
  net_price: number;
  is_invoiced: boolean;
  created_at: string;
}

interface InventoryReport {
  product_name: string;
  sku: string;
  category_name: string;
  unit_name: string;
  current_stock: number;
  min_stock: number;
  max_stock: number;
}

interface PurchaseReport {
  order_number: string;
  supplier_name: string;
  order_date: string;
  status: string;
  subtotal: number;
  total_tax: number;
  total_amount: number;
}

export function ReportesExpandedView() {
  const [reportType, setReportType] = useState<"prices" | "inventory" | "purchases">(
    "prices"
  );
  const [priceReports, setPriceReports] = useState<PriceReport[]>([]);
  const [inventoryReports, setInventoryReports] = useState<InventoryReport[]>([]);
  const [purchaseReports, setPurchaseReports] = useState<PurchaseReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterSupplier, setFilterSupplier] = useState("");
  const [filterRegion, setFilterRegion] = useState("");

  const [suppliers, setSuppliers] = useState<{ id: string; name: string }[]>([]);
  const [regions, setRegions] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    loadFilters();
  }, []);

  useEffect(() => {
    loadReport();
  }, [reportType, filterSupplier, filterRegion]);

  const loadFilters = async () => {
    try {
      const [suppliersRes, regionsRes] = await Promise.all([
        supabase.from("suppliers").select("id, name"),
        supabase.from("regions").select("id, name"),
      ]);

      if (suppliersRes.data) setSuppliers(suppliersRes.data);
      if (regionsRes.data) setRegions(regionsRes.data);
    } catch (error) {
      console.error("Error loading filters:", error);
    }
  };

  const loadReport = async () => {
    setLoading(true);
    try {
      if (reportType === "prices") {
        await loadPriceReport();
      } else if (reportType === "inventory") {
        await loadInventoryReport();
      } else if (reportType === "purchases") {
        await loadPurchaseReport();
      }
    } catch (error) {
      console.error("Error loading report:", error);
      toast.error("Error al cargar reporte");
    } finally {
      setLoading(false);
    }
  };

  const loadPriceReport = async () => {
    let query = supabase.from("supplier_price_history").select(
      `
      gross_price,
      tax_rate,
      net_price,
      is_invoiced,
      created_at,
      product:products(name),
      supplier:suppliers(name),
      region:regions(name)
      `
    );

    if (filterSupplier) {
      query = query.eq("supplier_id", filterSupplier);
    }
    if (filterRegion) {
      query = query.eq("region_id", filterRegion);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) throw error;

    const formatted = data?.map((item: any) => ({
      product_name: item.product?.name || "",
      supplier_name: item.supplier?.name || "",
      region_name: item.region?.name || "",
      gross_price: item.gross_price,
      tax_rate: item.tax_rate,
      net_price: item.net_price,
      is_invoiced: item.is_invoiced,
      created_at: item.created_at,
    })) || [];

    setPriceReports(formatted);
  };

  const loadInventoryReport = async () => {
    const { data, error } = await supabase.from("products").select(
      `
      name,
      sku,
      current_stock,
      min_stock,
      max_stock,
      category:categories(name),
      unit_of_measure:units_of_measure(name)
      `
    );

    if (error) throw error;

    const formatted = data?.map((item: any) => ({
      product_name: item.name,
      sku: item.sku,
      category_name: item.category?.name || "",
      unit_name: item.unit_of_measure?.name || "",
      current_stock: item.current_stock,
      min_stock: item.min_stock,
      max_stock: item.max_stock,
    })) || [];

    setInventoryReports(formatted);
  };

  const loadPurchaseReport = async () => {
    let query = supabase.from("purchase_orders").select(
      `
      order_number,
      order_date,
      status,
      subtotal,
      total_tax,
      total_amount,
      supplier:suppliers(name)
      `
    );

    if (filterSupplier) {
      query = query.eq("supplier_id", filterSupplier);
    }

    const { data, error } = await query.order("order_date", {
      ascending: false,
    });

    if (error) throw error;

    const formatted = data?.map((item: any) => ({
      order_number: item.order_number,
      supplier_name: item.supplier?.name || "",
      order_date: item.order_date,
      status: item.status,
      subtotal: item.subtotal,
      total_tax: item.total_tax,
      total_amount: item.total_amount,
    })) || [];

    setPurchaseReports(formatted);
  };

  const downloadReport = () => {
    let csv = "";
    let filename = "reporte.csv";

    if (reportType === "prices") {
      csv = generatePriceCSV();
      filename = "reporte-precios.csv";
    } else if (reportType === "inventory") {
      csv = generateInventoryCSV();
      filename = "reporte-inventario.csv";
    } else if (reportType === "purchases") {
      csv = generatePurchaseCSV();
      filename = "reporte-compras.csv";
    }

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const generatePriceCSV = () => {
    const headers = [
      "Producto",
      "Proveedor",
      "Región",
      "Precio Bruto",
      "Tasa %",
      "Precio Neto",
      "Facturado",
      "Fecha",
    ];
    const rows = priceReports.map((report) => [
      report.product_name,
      report.supplier_name,
      report.region_name,
      report.gross_price.toFixed(2),
      report.tax_rate.toFixed(2),
      report.net_price.toFixed(2),
      report.is_invoiced ? "Sí" : "No",
      report.created_at,
    ]);

    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  };

  const generateInventoryCSV = () => {
    const headers = [
      "Producto",
      "SKU",
      "Categoría",
      "Unidad",
      "Stock Actual",
      "Stock Mín.",
      "Stock Máx.",
    ];
    const rows = inventoryReports.map((report) => [
      report.product_name,
      report.sku,
      report.category_name,
      report.unit_name,
      report.current_stock,
      report.min_stock,
      report.max_stock,
    ]);

    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  };

  const generatePurchaseCSV = () => {
    const headers = [
      "Orden",
      "Proveedor",
      "Fecha",
      "Estado",
      "Subtotal",
      "Impuestos",
      "Total",
    ];
    const rows = purchaseReports.map((report) => [
      report.order_number,
      report.supplier_name,
      report.order_date,
      report.status,
      report.subtotal.toFixed(2),
      report.total_tax.toFixed(2),
      report.total_amount.toFixed(2),
    ]);

    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Generando reporte...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reportes</h1>
        <p className="text-gray-600 mt-2">
          Análisis de precios, inventario y compras
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros de Reporte</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Reporte</label>
              <Select
                value={reportType}
                onValueChange={(value: any) => setReportType(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prices">Historial de Precios</SelectItem>
                  <SelectItem value="inventory">Estado de Inventario</SelectItem>
                  <SelectItem value="purchases">Órdenes de Compra</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {reportType !== "inventory" && (
              <div>
                <label className="block text-sm font-medium mb-2">Proveedor</label>
                <Select value={filterSupplier} onValueChange={setFilterSupplier}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {reportType === "prices" && (
              <div>
                <label className="block text-sm font-medium mb-2">Región</label>
                <Select value={filterRegion} onValueChange={setFilterRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    {regions.map((region) => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Button
            onClick={downloadReport}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar CSV
          </Button>
        </CardContent>
      </Card>

      {reportType === "prices" && (
        <Card>
          <CardHeader>
            <CardTitle>Historial de Precios</CardTitle>
            <CardDescription>
              {priceReports.length} registros encontrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Región</TableHead>
                    <TableHead>Precio Bruto</TableHead>
                    <TableHead>Tasa %</TableHead>
                    <TableHead>Precio Neto</TableHead>
                    <TableHead>Facturado</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {priceReports.map((report, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">
                        {report.product_name}
                      </TableCell>
                      <TableCell>{report.supplier_name}</TableCell>
                      <TableCell>{report.region_name}</TableCell>
                      <TableCell>${report.gross_price.toFixed(2)}</TableCell>
                      <TableCell>{report.tax_rate.toFixed(2)}%</TableCell>
                      <TableCell className="font-semibold">
                        ${report.net_price.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            report.is_invoiced
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {report.is_invoiced ? "Sí" : "No"}
                        </span>
                      </TableCell>
                      <TableCell>{report.created_at.split("T")[0]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {reportType === "inventory" && (
        <Card>
          <CardHeader>
            <CardTitle>Estado de Inventario</CardTitle>
            <CardDescription>
              {inventoryReports.length} productos registrados
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
                    <TableHead>Stock Actual</TableHead>
                    <TableHead>Stock Mín.</TableHead>
                    <TableHead>Stock Máx.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryReports.map((report, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">
                        {report.product_name}
                      </TableCell>
                      <TableCell>{report.sku}</TableCell>
                      <TableCell>{report.category_name}</TableCell>
                      <TableCell>{report.unit_name}</TableCell>
                      <TableCell className="font-bold">
                        {report.current_stock}
                      </TableCell>
                      <TableCell>{report.min_stock}</TableCell>
                      <TableCell>{report.max_stock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {reportType === "purchases" && (
        <Card>
          <CardHeader>
            <CardTitle>Órdenes de Compra</CardTitle>
            <CardDescription>
              {purchaseReports.length} órdenes registradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Orden</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Subtotal</TableHead>
                    <TableHead>Impuestos</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseReports.map((report, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">
                        {report.order_number}
                      </TableCell>
                      <TableCell>{report.supplier_name}</TableCell>
                      <TableCell>{report.order_date}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            report.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {report.status}
                        </span>
                      </TableCell>
                      <TableCell>${report.subtotal.toFixed(2)}</TableCell>
                      <TableCell>${report.total_tax.toFixed(2)}</TableCell>
                      <TableCell className="font-bold">
                        ${report.total_amount.toFixed(2)}
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
