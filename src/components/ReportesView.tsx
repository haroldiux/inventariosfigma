import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { BarChart3, FileText, Download, TrendingUp, Package, ShoppingCart, Calendar } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export function ReportesView() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">Reportes y Analytics</h1>
        <p className="text-gray-500">Genera reportes e informes del sistema de inventarios</p>
      </div>

      <Tabs defaultValue="inventario" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventario">Inventario</TabsTrigger>
          <TabsTrigger value="movimientos">Movimientos</TabsTrigger>
          <TabsTrigger value="compras">Compras</TabsTrigger>
          <TabsTrigger value="prestamos">Préstamos</TabsTrigger>
          <TabsTrigger value="solicitudes">Solicitudes</TabsTrigger>
        </TabsList>

        <TabsContent value="inventario" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Reporte de Inventario Actual
                </CardTitle>
                <CardDescription>
                  Stock actual por almacén, categoría o ubicación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Filtrar por:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sede" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todas las sedes</SelectItem>
                        <SelectItem value="lapaz">La Paz</SelectItem>
                        <SelectItem value="cbba">Cochabamba</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Almacén" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="central">Almacén Central</SelectItem>
                        <SelectItem value="quim">Lab. Química</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas las categorías</SelectItem>
                      <SelectItem value="react">Reactivos Químicos</SelectItem>
                      <SelectItem value="equip">Equipamiento</SelectItem>
                      <SelectItem value="bio">Bioseguridad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Reporte
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Inventario Valorizado
                </CardTitle>
                <CardDescription>
                  Valor total del inventario por categoría
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Opciones:</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sede" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas las sedes</SelectItem>
                      <SelectItem value="lapaz">La Paz</SelectItem>
                      <SelectItem value="cbba">Cochabamba</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de visualización" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="categoria">Por categoría</SelectItem>
                      <SelectItem value="ubicacion">Por ubicación</SelectItem>
                      <SelectItem value="proveedor">Por proveedor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm">Valor Total Estimado</p>
                  <p className="text-2xl font-semibold text-blue-600">Bs. 284,500.00</p>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Reporte
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Ítems con Stock Bajo
                </CardTitle>
                <CardDescription>
                  Listado de ítems que requieren reposición
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Filtros:</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Nivel de criticidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los niveles</SelectItem>
                      <SelectItem value="critico">Crítico (Stock = 0)</SelectItem>
                      <SelectItem value="alto">Alto (&lt; 30% mínimo)</SelectItem>
                      <SelectItem value="medio">Medio (&lt; 50% mínimo)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="react">Reactivos</SelectItem>
                      <SelectItem value="equip">Equipamiento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm">Ítems Críticos</p>
                  <p className="text-2xl font-semibold text-red-600">15 ítems</p>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Reporte
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Consumo por Período
                </CardTitle>
                <CardDescription>
                  Análisis de consumo de ítems por período
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Período:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-500">Desde</label>
                      <input type="date" className="w-full border rounded-md px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Hasta</label>
                      <input type="date" className="w-full border rounded-md px-3 py-2 text-sm" />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Área/Laboratorio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="quim">Lab. Química</SelectItem>
                      <SelectItem value="fis">Lab. Física</SelectItem>
                      <SelectItem value="bio">Lab. Biología</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Reporte
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="movimientos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Historial de Movimientos
                </CardTitle>
                <CardDescription>
                  Entradas, salidas y traspasos por período
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Período:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-500">Desde</label>
                      <input type="date" className="w-full border rounded-md px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Hasta</label>
                      <input type="date" className="w-full border rounded-md px-3 py-2 text-sm" />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de movimiento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="entrada">Entradas</SelectItem>
                      <SelectItem value="salida">Salidas</SelectItem>
                      <SelectItem value="traspaso">Traspasos</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="central">Almacén Central</SelectItem>
                      <SelectItem value="quim">Lab. Química</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Reporte
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Estadísticas de Movimientos
                </CardTitle>
                <CardDescription>
                  Resumen y tendencias de movimientos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                    <div>
                      <p className="text-sm text-green-700">Entradas</p>
                      <p className="text-xl font-semibold text-green-600">234</p>
                    </div>
                    <p className="text-sm text-green-600">Este mes</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-md">
                    <div>
                      <p className="text-sm text-red-700">Salidas</p>
                      <p className="text-xl font-semibold text-red-600">189</p>
                    </div>
                    <p className="text-sm text-red-600">Este mes</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div>
                      <p className="text-sm text-blue-700">Traspasos</p>
                      <p className="text-xl font-semibold text-blue-600">67</p>
                    </div>
                    <p className="text-sm text-blue-600">Este mes</p>
                  </div>
                </div>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Estadísticas
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compras" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Historial de Compras
                </CardTitle>
                <CardDescription>
                  Órdenes de compra por período y proveedor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Filtros:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-500">Desde</label>
                      <input type="date" className="w-full border rounded-md px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Hasta</label>
                      <input type="date" className="w-full border rounded-md px-3 py-2 text-sm" />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los proveedores</SelectItem>
                      <SelectItem value="prov1">Química del Sur</SelectItem>
                      <SelectItem value="prov2">LabEquip Bolivia</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="completada">Completadas</SelectItem>
                      <SelectItem value="proceso">En proceso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Reporte
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Comparativa de Proveedores
                </CardTitle>
                <CardDescription>
                  Análisis de precios y desempeño
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Opciones:</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoría de ítem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="react">Reactivos</SelectItem>
                      <SelectItem value="equip">Equipamiento</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="precio">Mejor precio</SelectItem>
                      <SelectItem value="entrega">Tiempo de entrega</SelectItem>
                      <SelectItem value="volumen">Volumen de compras</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 bg-gray-50 border rounded-md">
                  <p className="text-sm text-gray-500">Proveedor más económico</p>
                  <p className="font-semibold">Química del Sur SRL</p>
                  <p className="text-sm text-green-600">-15% vs promedio</p>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Reporte
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="prestamos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Historial de Préstamos
                </CardTitle>
                <CardDescription>
                  Préstamos activos y completados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Filtros:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-500">Desde</label>
                      <input type="date" className="w-full border rounded-md px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Hasta</label>
                      <input type="date" className="w-full border rounded-md px-3 py-2 text-sm" />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="activo">Activos</SelectItem>
                      <SelectItem value="vencido">Vencidos</SelectItem>
                      <SelectItem value="devuelto">Devueltos</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="quim">Lab. Química</SelectItem>
                      <SelectItem value="fis">Lab. Física</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Reporte
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Préstamos por Custodio
                </CardTitle>
                <CardDescription>
                  Historial de préstamos por usuario
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Opciones:</label>
                  <input 
                    type="text" 
                    placeholder="Buscar custodio..." 
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mes">Este mes</SelectItem>
                      <SelectItem value="trimestre">Este trimestre</SelectItem>
                      <SelectItem value="semestre">Este semestre</SelectItem>
                      <SelectItem value="anio">Este año</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border-b">
                    <p className="text-sm">Total de préstamos</p>
                    <p className="font-semibold">156</p>
                  </div>
                  <div className="flex items-center justify-between p-2 border-b">
                    <p className="text-sm">Devoluciones a tiempo</p>
                    <p className="font-semibold text-green-600">142 (91%)</p>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <p className="text-sm">Devoluciones tardías</p>
                    <p className="font-semibold text-red-600">14 (9%)</p>
                  </div>
                </div>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Reporte
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="solicitudes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Reporte de Solicitudes
                </CardTitle>
                <CardDescription>
                  Análisis del flujo de solicitudes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Filtros:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-500">Desde</label>
                      <input type="date" className="w-full border rounded-md px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Hasta</label>
                      <input type="date" className="w-full border rounded-md px-3 py-2 text-sm" />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="pendiente">Pendientes</SelectItem>
                      <SelectItem value="aprobada">Aprobadas</SelectItem>
                      <SelectItem value="denegada">Denegadas</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="quim">Lab. Química</SelectItem>
                      <SelectItem value="fis">Lab. Física</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Reporte
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Tiempo de Respuesta
                </CardTitle>
                <CardDescription>
                  Análisis de tiempos de aprobación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 border rounded-md">
                    <p className="text-sm text-gray-500">Tiempo promedio</p>
                    <p className="text-xl font-semibold">2.5 días</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border-b">
                      <p className="text-sm">Aprobadas</p>
                      <p className="font-semibold text-green-600">234 (78%)</p>
                    </div>
                    <div className="flex items-center justify-between p-2 border-b">
                      <p className="text-sm">Pendientes</p>
                      <p className="font-semibold text-yellow-600">45 (15%)</p>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <p className="text-sm">Denegadas</p>
                      <p className="font-semibold text-red-600">21 (7%)</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Estadísticas
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
