import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Plus, Search, Eye, ArrowRightLeft, Printer, CheckCircle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const traspasos = [
  {
    id: 'TRA-0156',
    tipo: 'Nota de Traspaso',
    items: 5,
    origen: 'Almacén Central',
    destino: 'Lab. Química',
    solicitante: 'Enc. Lab. Química',
    fechaSolicitud: '2025-11-03',
    fechaEjecucion: null,
    estado: 'Pendiente',
    motivo: 'Reposición de reactivos según solicitud SOL-0234'
  },
  {
    id: 'TRA-0155',
    tipo: 'Nota de Salida',
    items: 3,
    origen: 'Lab. Física',
    destino: 'Dr. Juan Pérez (Consumo)',
    solicitante: 'Dr. Juan Pérez',
    fechaSolicitud: '2025-11-02',
    fechaEjecucion: '2025-11-02',
    estado: 'Completado',
    motivo: 'Materiales para práctica de laboratorio'
  },
  {
    id: 'TRA-0154',
    tipo: 'Nota de Entrada',
    items: 12,
    origen: 'Orden de Compra OC-0154',
    destino: 'Almacén Central',
    solicitante: 'Dept. Adquisiciones',
    fechaSolicitud: '2025-11-01',
    fechaEjecucion: '2025-11-01',
    estado: 'Completado',
    motivo: 'Recepción de compra del proveedor BioInsumos'
  },
  {
    id: 'TRA-0153',
    tipo: 'Nota de Traspaso',
    items: 8,
    origen: 'Almacén Central',
    destino: 'Lab. Biología',
    solicitante: 'Enc. Lab. Biología',
    fechaSolicitud: '2025-10-31',
    fechaEjecucion: '2025-11-01',
    estado: 'Completado',
    motivo: 'Reabastecimiento de material de bioseguridad'
  },
]

export function TraspasosView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTipo, setFilterTipo] = useState('todos')
  const [filterEstado, setFilterEstado] = useState('todos')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tipoNota, setTipoNota] = useState<'traspaso' | 'salida' | 'entrada'>('traspaso')

  const filteredTraspasos = traspasos.filter(tra => {
    const matchSearch = tra.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       tra.origen.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       tra.destino.toLowerCase().includes(searchTerm.toLowerCase())
    const matchTipo = filterTipo === 'todos' || tra.tipo === filterTipo
    const matchEstado = filterEstado === 'todos' || tra.estado === filterEstado
    return matchSearch && matchTipo && matchEstado
  })

  const getEstadoBadgeVariant = (estado: string) => {
    if (estado === 'Pendiente') return 'outline'
    if (estado === 'En proceso') return 'secondary'
    if (estado === 'Completado') return 'default'
    return 'outline'
  }

  const getTipoBadgeVariant = (tipo: string) => {
    if (tipo === 'Nota de Entrada') return 'default'
    if (tipo === 'Nota de Salida') return 'destructive'
    if (tipo === 'Nota de Traspaso') return 'secondary'
    return 'outline'
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2">Traspasos y Movimientos</h1>
          <p className="text-gray-500">Gestión de notas de entrada, salida y traspasos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Nota
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Generar Nota de Movimiento</DialogTitle>
              <DialogDescription>
                Registra entradas, salidas o traspasos de ítems entre ubicaciones
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Tipo de Nota *</Label>
                <Select value={tipoNota} onValueChange={(val) => setTipoNota(val as typeof tipoNota)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrada">Nota de Entrada (Recepción de compra)</SelectItem>
                    <SelectItem value="salida">Nota de Salida (Consumo definitivo)</SelectItem>
                    <SelectItem value="traspaso">Nota de Traspaso (Entre almacenes)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Origen *</Label>
                  {tipoNota === 'entrada' ? (
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Orden de compra" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oc1">OC-0156 - Química del Sur</SelectItem>
                        <SelectItem value="oc2">OC-0155 - LabEquip Bolivia</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar ubicación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alm1">Almacén Central</SelectItem>
                        <SelectItem value="lab1">Lab. Química</SelectItem>
                        <SelectItem value="lab2">Lab. Física</SelectItem>
                        <SelectItem value="lab3">Lab. Biología</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Destino *</Label>
                  {tipoNota === 'salida' ? (
                    <Input placeholder="Nombre del receptor (consumo definitivo)" />
                  ) : (
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar ubicación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alm1">Almacén Central</SelectItem>
                        <SelectItem value="lab1">Lab. Química</SelectItem>
                        <SelectItem value="lab2">Lab. Física</SelectItem>
                        <SelectItem value="lab3">Lab. Biología</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Motivo/Justificación *</Label>
                <Input placeholder="Ej: Reposición según solicitud SOL-0234" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Ítems a {tipoNota === 'entrada' ? 'Recibir' : tipoNota === 'salida' ? 'Retirar' : 'Traspasar'}</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Agregar Ítem
                  </Button>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ítem</TableHead>
                        <TableHead>Stock Disponible</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Unidad</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Ácido Sulfúrico H2SO4</TableCell>
                        <TableCell>25 L</TableCell>
                        <TableCell>
                          <Input type="number" className="w-20" defaultValue="5" />
                        </TableCell>
                        <TableCell>Litros</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Eliminar</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Guantes de Látex</TableCell>
                        <TableCell>45 pares</TableCell>
                        <TableCell>
                          <Input type="number" className="w-20" defaultValue="20" />
                        </TableCell>
                        <TableCell>Pares</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Eliminar</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <p className="text-sm text-gray-500">2 ítems agregados</p>
              </div>

              <div className="space-y-2">
                <Label>Fecha de Movimiento</Label>
                <Input type="date" />
              </div>

              <div className="space-y-2">
                <Label>Observaciones Adicionales</Label>
                <Input placeholder="Información adicional sobre el movimiento" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Guardar e Imprimir
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Generar Nota
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Pendientes</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{traspasos.filter(t => t.estado === 'Pendiente').length}</div>
            <p className="text-xs text-gray-500">Requieren procesamiento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Movimientos Hoy</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">5</div>
            <p className="text-xs text-gray-500">Completados hoy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Este Mes</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{traspasos.length}</div>
            <p className="text-xs text-gray-500">Total de movimientos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Ítems Movidos</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{traspasos.reduce((sum, t) => sum + t.items, 0)}</div>
            <p className="text-xs text-gray-500">En todas las notas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="pendientes">
            Pendientes
            {traspasos.filter(t => t.estado === 'Pendiente').length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {traspasos.filter(t => t.estado === 'Pendiente').length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completados">Completados</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Lista de Movimientos</CardTitle>
                  <CardDescription>Total: {filteredTraspasos.length} movimientos</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={filterTipo} onValueChange={setFilterTipo}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los tipos</SelectItem>
                      <SelectItem value="Nota de Entrada">Entradas</SelectItem>
                      <SelectItem value="Nota de Salida">Salidas</SelectItem>
                      <SelectItem value="Nota de Traspaso">Traspasos</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterEstado} onValueChange={setFilterEstado}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Pendiente">Pendientes</SelectItem>
                      <SelectItem value="Completado">Completados</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Buscar..."
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
                    <TableHead>ID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Origen</TableHead>
                    <TableHead>Destino</TableHead>
                    <TableHead>Ítems</TableHead>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTraspasos.map((traspaso) => (
                    <TableRow key={traspaso.id}>
                      <TableCell className="font-mono font-medium">{traspaso.id}</TableCell>
                      <TableCell>
                        <Badge variant={getTipoBadgeVariant(traspaso.tipo)}>
                          {traspaso.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell>{traspaso.origen}</TableCell>
                      <TableCell>{traspaso.destino}</TableCell>
                      <TableCell>{traspaso.items} ítems</TableCell>
                      <TableCell>{traspaso.solicitante}</TableCell>
                      <TableCell>
                        {traspaso.fechaEjecucion || traspaso.fechaSolicitud}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getEstadoBadgeVariant(traspaso.estado)}>
                          {traspaso.estado}
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

        <TabsContent value="pendientes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Movimientos Pendientes</CardTitle>
              <CardDescription>Requieren procesamiento y ejecución</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Origen → Destino</TableHead>
                    <TableHead>Ítems</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {traspasos
                    .filter(t => t.estado === 'Pendiente')
                    .map((traspaso) => (
                    <TableRow key={traspaso.id}>
                      <TableCell className="font-mono font-medium">{traspaso.id}</TableCell>
                      <TableCell>
                        <Badge variant={getTipoBadgeVariant(traspaso.tipo)}>
                          {traspaso.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{traspaso.origen}</span>
                          <ArrowRightLeft className="h-4 w-4 text-gray-400" />
                          <span>{traspaso.destino}</span>
                        </div>
                      </TableCell>
                      <TableCell>{traspaso.items} ítems</TableCell>
                      <TableCell className="max-w-xs truncate">{traspaso.motivo}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">Ver Detalles</Button>
                          <Button size="sm">Procesar</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completados" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Movimientos Completados</CardTitle>
              <CardDescription>Historial de movimientos ejecutados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Origen → Destino</TableHead>
                    <TableHead>Ítems</TableHead>
                    <TableHead>Fecha Ejecución</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {traspasos
                    .filter(t => t.estado === 'Completado')
                    .map((traspaso) => (
                    <TableRow key={traspaso.id}>
                      <TableCell className="font-mono font-medium">{traspaso.id}</TableCell>
                      <TableCell>
                        <Badge variant={getTipoBadgeVariant(traspaso.tipo)}>
                          {traspaso.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{traspaso.origen}</span>
                          <ArrowRightLeft className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{traspaso.destino}</span>
                        </div>
                      </TableCell>
                      <TableCell>{traspaso.items} ítems</TableCell>
                      <TableCell>{traspaso.fechaEjecucion}</TableCell>
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
      </Tabs>
    </div>
  )
}
