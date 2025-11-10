import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Plus, Search, Eye, FileText, Printer, TrendingUp, ShoppingCart } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const ordenesCompra = [
  {
    id: 'OC-0156',
    numeroOrden: '000156',
    proveedor: 'Química del Sur SRL',
    solicitudOrigen: 'SOL-0232',
    items: 8,
    montoTotal: 4500,
    fechaEmision: '2025-11-01',
    fechaEntrega: '2025-11-08',
    estado: 'En tránsito',
    autorizado: 'Lic. Carlos Mendoza',
  },
  {
    id: 'OC-0155',
    numeroOrden: '000155',
    proveedor: 'LabEquip Bolivia',
    solicitudOrigen: 'SOL-0230',
    items: 5,
    montoTotal: 2300,
    fechaEmision: '2025-10-30',
    fechaEntrega: '2025-11-06',
    estado: 'Pendiente entrega',
    autorizado: 'Lic. Carlos Mendoza',
  },
  {
    id: 'OC-0154',
    numeroOrden: '000154',
    proveedor: 'BioInsumos Científicos',
    solicitudOrigen: 'SOL-0228',
    items: 12,
    montoTotal: 8750,
    fechaEmision: '2025-10-28',
    fechaEntrega: null,
    estado: 'Recibida',
    autorizado: 'Lic. Carlos Mendoza',
  },
]

const historialCompras = [
  { 
    fecha: '2025-10-28', 
    proveedor: 'Química del Sur SRL', 
    item: 'Ácido Sulfúrico H2SO4 1L', 
    cantidad: 20,
    precioUnitario: 85,
    total: 1700
  },
  { 
    fecha: '2025-10-15', 
    proveedor: 'BioInsumos Científicos', 
    item: 'Guantes de Látex (100 unid)', 
    cantidad: 5,
    precioUnitario: 120,
    total: 600
  },
  { 
    fecha: '2025-10-10', 
    proveedor: 'LabEquip Bolivia', 
    item: 'Pipetas 10ml', 
    cantidad: 50,
    precioUnitario: 15,
    total: 750
  },
]

export function ComprasView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEstado, setFilterEstado] = useState('todos')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredOrdenes = ordenesCompra.filter(orden => {
    const matchSearch = orden.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       orden.proveedor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEstado = filterEstado === 'todos' || orden.estado === filterEstado
    return matchSearch && matchEstado
  })

  const getEstadoBadgeVariant = (estado: string) => {
    if (estado === 'Borrador') return 'outline'
    if (estado === 'En tránsito') return 'secondary'
    if (estado === 'Pendiente entrega') return 'outline'
    if (estado === 'Recibida') return 'default'
    return 'secondary'
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2">Órdenes de Compra</h1>
          <p className="text-gray-500">Gestión de adquisiciones y órdenes de compra</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Orden de Compra
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Orden de Compra</DialogTitle>
              <DialogDescription>
                Genera una nueva orden de compra a partir de una solicitud aprobada
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Solicitud Origen *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar solicitud" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SOL-0234">SOL-0234 - Lab. Química (8 ítems)</SelectItem>
                      <SelectItem value="SOL-0233">SOL-0233 - Lab. Física (5 ítems)</SelectItem>
                      <SelectItem value="SOL-0232">SOL-0232 - Lab. Biología (12 ítems)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Proveedor *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prov1">Química del Sur SRL</SelectItem>
                      <SelectItem value="prov2">LabEquip Bolivia</SelectItem>
                      <SelectItem value="prov3">BioInsumos Científicos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
                <Label>Comparativa de Proveedores para los ítems seleccionados</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Proveedor</TableHead>
                      <TableHead>Ítems Disponibles</TableHead>
                      <TableHead>Precio Promedio</TableHead>
                      <TableHead>Última Compra</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Química del Sur SRL</TableCell>
                      <TableCell>7/8 ítems</TableCell>
                      <TableCell className="text-green-600">Bs. 85.50</TableCell>
                      <TableCell>2025-10-28</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">LabEquip Bolivia</TableCell>
                      <TableCell>8/8 ítems</TableCell>
                      <TableCell>Bs. 92.00</TableCell>
                      <TableCell>2025-10-10</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-2">
                <Label>Ítems de la Orden</Label>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ítem</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Precio Unit.</TableHead>
                        <TableHead>Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Ácido Sulfúrico H2SO4 1L</TableCell>
                        <TableCell>20</TableCell>
                        <TableCell>Bs. 85.00</TableCell>
                        <TableCell>Bs. 1,700.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Guantes de Látex (100 unid)</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>Bs. 120.00</TableCell>
                        <TableCell>Bs. 600.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-end p-3 bg-gray-50 rounded-lg">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total de la Orden</p>
                    <p className="text-2xl font-semibold">Bs. 2,300.00</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Autorizado por *</Label>
                <Input placeholder="Nombre completo del autorizador" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fecha de Emisión</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Fecha Estimada de Entrega</Label>
                  <Input type="date" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button variant="outline">Guardar como Borrador</Button>
              <Button onClick={() => setIsDialogOpen(false)}>Emitir Orden</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Órdenes Activas</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{ordenesCompra.filter(o => o.estado !== 'Recibida').length}</div>
            <p className="text-xs text-gray-500">En proceso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Pendientes de Entrega</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{ordenesCompra.filter(o => o.estado === 'Pendiente entrega').length}</div>
            <p className="text-xs text-gray-500">Esperando recepción</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total del Mes</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">Bs. {ordenesCompra.reduce((sum, o) => sum + o.montoTotal, 0).toLocaleString()}</div>
            <p className="text-xs text-gray-500">Noviembre 2025</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Completadas</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{ordenesCompra.filter(o => o.estado === 'Recibida').length}</div>
            <p className="text-xs text-gray-500">Este mes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ordenes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ordenes">Órdenes de Compra</TabsTrigger>
          <TabsTrigger value="historial">Historial de Compras</TabsTrigger>
        </TabsList>

        <TabsContent value="ordenes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Lista de Órdenes de Compra</CardTitle>
                  <CardDescription>Total: {filteredOrdenes.length} órdenes</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={filterEstado} onValueChange={setFilterEstado}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los estados</SelectItem>
                      <SelectItem value="Borrador">Borrador</SelectItem>
                      <SelectItem value="En tránsito">En tránsito</SelectItem>
                      <SelectItem value="Pendiente entrega">Pendiente entrega</SelectItem>
                      <SelectItem value="Recibida">Recibida</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Buscar orden..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-[250px]"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° Orden</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Solicitud Origen</TableHead>
                    <TableHead>Ítems</TableHead>
                    <TableHead>Monto Total</TableHead>
                    <TableHead>Fecha Emisión</TableHead>
                    <TableHead>Entrega</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrdenes.map((orden) => (
                    <TableRow key={orden.id}>
                      <TableCell className="font-mono font-medium">{orden.numeroOrden}</TableCell>
                      <TableCell>{orden.proveedor}</TableCell>
                      <TableCell className="font-mono">{orden.solicitudOrigen}</TableCell>
                      <TableCell>{orden.items} ítems</TableCell>
                      <TableCell className="font-medium">Bs. {orden.montoTotal.toLocaleString()}</TableCell>
                      <TableCell>{orden.fechaEmision}</TableCell>
                      <TableCell>{orden.fechaEntrega || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={getEstadoBadgeVariant(orden.estado)}>
                          {orden.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historial" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Historial de Compras</CardTitle>
                  <CardDescription>Búsqueda y comparativa por proveedor e ítem</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filtrar por proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los proveedores</SelectItem>
                      <SelectItem value="prov1">Química del Sur SRL</SelectItem>
                      <SelectItem value="prov2">LabEquip Bolivia</SelectItem>
                      <SelectItem value="prov3">BioInsumos Científicos</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Buscar ítem..." className="w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Ítem</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Precio Unit.</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Tendencia</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historialCompras.map((compra, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{compra.fecha}</TableCell>
                      <TableCell>{compra.proveedor}</TableCell>
                      <TableCell className="font-medium">{compra.item}</TableCell>
                      <TableCell>{compra.cantidad}</TableCell>
                      <TableCell>Bs. {compra.precioUnitario.toFixed(2)}</TableCell>
                      <TableCell className="font-medium">Bs. {compra.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-sm">-3.4%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Análisis de Proveedores</CardTitle>
              <CardDescription>Comparativa de precios y desempeño</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Órdenes Totales</TableHead>
                    <TableHead>Monto Total</TableHead>
                    <TableHead>Precio Promedio</TableHead>
                    <TableHead>Tiempo Entrega</TableHead>
                    <TableHead>Calificación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Química del Sur SRL</TableCell>
                    <TableCell>8 órdenes</TableCell>
                    <TableCell>Bs. 36,400</TableCell>
                    <TableCell className="text-green-600">Bs. 85.50</TableCell>
                    <TableCell>5-7 días</TableCell>
                    <TableCell>
                      <Badge variant="default">Excelente</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">LabEquip Bolivia</TableCell>
                    <TableCell>12 órdenes</TableCell>
                    <TableCell>Bs. 54,200</TableCell>
                    <TableCell>Bs. 92.00</TableCell>
                    <TableCell>7-10 días</TableCell>
                    <TableCell>
                      <Badge variant="default">Muy Bueno</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">BioInsumos Científicos</TableCell>
                    <TableCell>6 órdenes</TableCell>
                    <TableCell>Bs. 28,750</TableCell>
                    <TableCell>Bs. 98.50</TableCell>
                    <TableCell>10-14 días</TableCell>
                    <TableCell>
                      <Badge variant="outline">Bueno</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
