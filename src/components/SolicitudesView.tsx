import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Plus, Search, Eye, CheckCircle, XCircle, Clock, FileText } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import type { UserRole } from '../App'

interface SolicitudesViewProps {
  userRole: UserRole
}

const solicitudes = [
  {
    id: 'SOL-0234',
    tipo: 'Reposición',
    solicitante: 'Enc. Lab. Química',
    subAlmacen: 'Lab. Química - Campus Central',
    almacen: 'Almacén Campus Central',
    items: 5,
    fechaSolicitud: '2025-11-03',
    estado: 'Pendiente Sub-Almacén',
    nivelActual: 'Sub-Almacén',
    prioridad: 'Media',
    justificacion: 'Necesario para práctica de química orgánica del lunes 11/nov',
    itemsSolicitados: [
      { codigo: 'QUI-001', nombre: 'Ácido Sulfúrico H2SO4', cantidad: 5, unidad: 'Litros' },
      { codigo: 'QUI-087', nombre: 'Etanol 96%', cantidad: 10, unidad: 'Litros' }
    ],
    rutaAprobacion: {
      subAlmacen: { estado: null, fecha: null, responsable: null, observaciones: null },
      almacen: { estado: null, fecha: null, responsable: null, observaciones: null },
      adquisicion: { estado: null, fecha: null, responsable: null, observaciones: null }
    },
    ubicacionActualItems: null,
    rutaItems: []
  },
  {
    id: 'SOL-0233',
    tipo: 'Reposición',
    solicitante: 'Enc. Lab. Física',
    subAlmacen: 'Lab. Física - Campus Norte',
    almacen: 'Almacén Campus Norte',
    items: 8,
    fechaSolicitud: '2025-11-02',
    estado: 'Pendiente Almacén',
    nivelActual: 'Almacén',
    prioridad: 'Alta',
    justificacion: 'Stock bajo en reactivos esenciales para prácticas del semestre',
    itemsSolicitados: [
      { codigo: 'FIS-023', nombre: 'Balanza Digital', cantidad: 2, unidad: 'Unidades' },
      { codigo: 'BIO-045', nombre: 'Guantes de Látex', cantidad: 200, unidad: 'Pares' }
    ],
    rutaAprobacion: {
      subAlmacen: { estado: 'Aprobada', fecha: '2025-11-02 14:30', responsable: 'Enc. Lab. Física', observaciones: 'Stock crítico' },
      almacen: { estado: null, fecha: null, responsable: null, observaciones: null },
      adquisicion: { estado: null, fecha: null, responsable: null, observaciones: null }
    },
    ubicacionActualItems: null,
    rutaItems: []
  },
  {
    id: 'SOL-0232',
    tipo: 'Compra Nueva',
    solicitante: 'Enc. Lab. Biología',
    subAlmacen: 'Lab. Biología - Campus Central',
    almacen: 'Almacén Campus Central',
    items: 12,
    fechaSolicitud: '2025-11-01',
    estado: 'Pendiente Adquisición',
    nivelActual: 'Adquisición',
    prioridad: 'Alta',
    justificacion: 'Requiere compra de nuevos insumos no disponibles en almacén',
    itemsSolicitados: [
      { codigo: 'EQU-023', nombre: 'Microscopio Binocular', cantidad: 3, unidad: 'Unidades' },
      { codigo: 'LAB-089', nombre: 'Probetas 100ml', cantidad: 50, unidad: 'Unidades' }
    ],
    rutaAprobacion: {
      subAlmacen: { estado: 'Aprobada', fecha: '2025-11-01 10:15', responsable: 'Enc. Lab. Biología', observaciones: 'Urgente para nuevo semestre' },
      almacen: { estado: 'Aprobada', fecha: '2025-11-02 09:00', responsable: 'Admin. Campus Central', observaciones: 'No disponible en stock, requiere compra' },
      adquisicion: { estado: null, fecha: null, responsable: null, observaciones: null }
    },
    ubicacionActualItems: null,
    rutaItems: []
  },
  {
    id: 'SOL-0231',
    tipo: 'Reposición desde Almacén',
    solicitante: 'Enc. Lab. Química',
    subAlmacen: 'Lab. Química - Campus Central',
    almacen: 'Almacén Campus Central',
    items: 3,
    fechaSolicitud: '2025-10-30',
    estado: 'Completada',
    nivelActual: 'Completada',
    prioridad: 'Media',
    justificacion: 'Material para práctica de titulación',
    itemsSolicitados: [
      { codigo: 'QUI-010', nombre: 'NaOH 1M', cantidad: 2, unidad: 'Litros' }
    ],
    rutaAprobacion: {
      subAlmacen: { estado: 'Aprobada', fecha: '2025-10-30 08:00', responsable: 'Enc. Lab. Química', observaciones: null },
      almacen: { estado: 'Entregada', fecha: '2025-10-31 11:00', responsable: 'Admin. Campus Central', observaciones: 'Entregado desde stock almacén' },
      adquisicion: { estado: 'No requerida', fecha: null, responsable: null, observaciones: null }
    },
    ubicacionActualItems: 'Lab. Química - Campus Central',
    rutaItems: [
      { ubicacion: 'Almacén Campus Central', fecha: '2025-10-31 09:00', accion: 'Preparado' },
      { ubicacion: 'En tránsito', fecha: '2025-10-31 10:30', accion: 'Enviado' },
      { ubicacion: 'Lab. Química - Campus Central', fecha: '2025-10-31 11:00', accion: 'Recibido y verificado' }
    ]
  },
  {
    id: 'SOL-0230',
    tipo: 'Compra Nueva',
    solicitante: 'Enc. Lab. Simulación Clínica',
    subAlmacen: 'Lab. Simulación Clínica - Campus Colonial',
    almacen: 'Almacén Campus Colonial',
    items: 100,
    fechaSolicitud: '2025-10-28',
    estado: 'En Adquisiciones',
    nivelActual: 'Adquisición',
    prioridad: 'Alta',
    justificacion: 'Equipamiento nuevo para ampliación de laboratorio',
    itemsSolicitados: [
      { codigo: 'LAB-089', nombre: 'Probetas Graduadas 100ml', cantidad: 100, unidad: 'Unidades' }
    ],
    rutaAprobacion: {
      subAlmacen: { estado: 'Aprobada', fecha: '2025-10-28 14:00', responsable: 'Enc. Lab. Simulación Clínica', observaciones: 'Ampliación laboratorio' },
      almacen: { estado: 'Aprobada', fecha: '2025-10-29 10:00', responsable: 'Admin. Campus Colonial', observaciones: 'Requiere compra' },
      adquisicion: { estado: 'Compra realizada', fecha: '2025-10-30 16:00', responsable: 'Dept. Adquisiciones', observaciones: 'Orden de compra #OC-445. Llegada estimada: 2025-11-08' }
    },
    ubicacionActualItems: 'Dept. Adquisiciones (En tránsito)',
    rutaItems: [
      { ubicacion: 'Proveedor LabEquip Bolivia', fecha: '2025-10-30', accion: 'Compra realizada' },
      { ubicacion: 'Dept. Adquisiciones', fecha: '2025-11-05', accion: 'Recibido y en verificación' }
    ]
  },
  {
    id: 'SOL-0229',
    tipo: 'Reposición',
    solicitante: 'Enc. Lab. Química',
    subAlmacen: 'Lab. Química - Campus Central',
    almacen: 'Almacén Campus Central',
    items: 2,
    fechaSolicitud: '2025-10-27',
    estado: 'Denegada por Almacén',
    nivelActual: 'Denegada',
    prioridad: 'Baja',
    justificacion: 'Solicitud duplicada',
    itemsSolicitados: [
      { codigo: 'QUI-001', nombre: 'Ácido Sulfúrico H2SO4', cantidad: 5, unidad: 'Litros' }
    ],
    rutaAprobacion: {
      subAlmacen: { estado: 'Aprobada', fecha: '2025-10-27 15:00', responsable: 'Enc. Lab. Química', observaciones: null },
      almacen: { estado: 'Denegada', fecha: '2025-10-28 09:00', responsable: 'Admin. Campus Central', observaciones: 'Solicitud duplicada con SOL-0234' },
      adquisicion: { estado: null, fecha: null, responsable: null, observaciones: null }
    },
    ubicacionActualItems: null,
    rutaItems: []
  },
]

export function SolicitudesView({ userRole }: SolicitudesViewProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEstado, setFilterEstado] = useState('todas')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSolicitud, setSelectedSolicitud] = useState<typeof solicitudes[0] | null>(null)

  const filteredSolicitudes = solicitudes.filter(sol => {
    const matchSearch = sol.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       sol.solicitante.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEstado = filterEstado === 'todas' || sol.estado === filterEstado
    return matchSearch && matchEstado
  })

  const getEstadoBadgeVariant = (estado: string) => {
    if (estado.includes('Pendiente')) return 'outline'
    if (estado === 'Completada') return 'default'
    if (estado.includes('Denegada')) return 'destructive'
    if (estado === 'En Adquisiciones') return 'secondary'
    return 'secondary'
  }

  const canApprove = (solicitud: typeof solicitudes[0]) => {
    if (userRole === 'encargado_lab' && solicitud.nivelActual === 'Sub-Almacén') return true
    if (userRole === 'encargado_almacen' && solicitud.nivelActual === 'Almacén') return true
    if (userRole === 'encargado_adquisicion' && solicitud.nivelActual === 'Adquisición') return true
    return false
  }

  const canCreate = userRole === 'encargado_lab'

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2">Solicitudes</h1>
          <p className="text-gray-500">Gestión del flujo de solicitudes multi-nivel</p>
        </div>
        {canCreate && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nueva Solicitud
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Nueva Solicitud de Reposición</DialogTitle>
                <DialogDescription>
                  Complete los detalles de la solicitud. Será enviada a Almacén para su revisión
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tipo de Solicitud</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reposicion">Reposición de Stock</SelectItem>
                        <SelectItem value="nuevo">Nuevo Equipamiento</SelectItem>
                        <SelectItem value="compra">Compra Nueva</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Prioridad</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baja">Baja</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="urgente">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Justificación *</Label>
                  <Textarea 
                    placeholder="Explique el motivo de la solicitud y el uso que se le dará..." 
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ítems Solicitados</Label>
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex gap-2">
                      <Input placeholder="Buscar ítem..." className="flex-1" />
                      <Button variant="outline">Agregar</Button>
                    </div>
                    <p className="text-sm text-gray-500">0 ítems agregados</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                <Button onClick={() => setIsDialogOpen(false)}>Enviar Solicitud</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Solicitudes</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{solicitudes.length}</div>
            <p className="text-xs text-gray-500">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{solicitudes.filter(s => s.estado.includes('Pendiente')).length}</div>
            <p className="text-xs text-gray-500">Requieren atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Aprobadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{solicitudes.filter(s => s.estado === 'Completada').length}</div>
            <p className="text-xs text-gray-500">Finalizadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Denegadas</CardTitle>
            <XCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{solicitudes.filter(s => s.estado.includes('Denegada')).length}</div>
            <p className="text-xs text-gray-500">Este mes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="todas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="pendientes">
            Pendientes
            <Badge variant="secondary" className="ml-2">
              {solicitudes.filter(s => s.estado.includes('Pendiente')).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="completadas">Completadas</TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Lista de Solicitudes</CardTitle>
                  <CardDescription>Total: {filteredSolicitudes.length} solicitudes</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={filterEstado} onValueChange={setFilterEstado}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todos los estados</SelectItem>
                      <SelectItem value="Pendiente Sub-Almacén">Pendiente Sub-Almacén</SelectItem>
                      <SelectItem value="Pendiente Almacén">Pendiente Almacén</SelectItem>
                      <SelectItem value="Pendiente Adquisición">Pendiente Adquisición</SelectItem>
                      <SelectItem value="En Adquisiciones">En Adquisiciones</SelectItem>
                      <SelectItem value="Completada">Completada</SelectItem>
                      <SelectItem value="Denegada por Almacén">Denegada</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Buscar solicitud..."
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
                    <TableHead>Sub-Almacén</TableHead>
                    <TableHead>Flujo de Aprobación</TableHead>
                    <TableHead>Ítems</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSolicitudes.map((solicitud) => (
                    <TableRow key={solicitud.id}>
                      <TableCell className="font-mono font-medium">{solicitud.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{solicitud.tipo}</p>
                          <Badge variant={
                            solicitud.prioridad === 'Alta' ? 'destructive' : 
                            solicitud.prioridad === 'Media' ? 'outline' : 
                            'secondary'
                          } className="mt-1">
                            {solicitud.prioridad}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{solicitud.subAlmacen}</p>
                          <p className="text-xs text-gray-500">{solicitud.solicitante}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                            solicitud.rutaAprobacion.subAlmacen.estado === 'Aprobada' ? 'bg-green-100 text-green-700' :
                            solicitud.rutaAprobacion.subAlmacen.estado === 'Denegada' ? 'bg-red-100 text-red-700' :
                            solicitud.nivelActual === 'Sub-Almacén' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-400'
                          }`}>
                            {solicitud.rutaAprobacion.subAlmacen.estado === 'Aprobada' ? '✓' : 
                             solicitud.rutaAprobacion.subAlmacen.estado === 'Denegada' ? '✗' : 
                             solicitud.nivelActual === 'Sub-Almacén' ? '●' : '1'}
                          </div>
                          <div className="h-0.5 w-4 bg-gray-300"></div>
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                            solicitud.rutaAprobacion.almacen.estado === 'Aprobada' || solicitud.rutaAprobacion.almacen.estado === 'Entregada' ? 'bg-green-100 text-green-700' :
                            solicitud.rutaAprobacion.almacen.estado === 'Denegada' ? 'bg-red-100 text-red-700' :
                            solicitud.nivelActual === 'Almacén' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-400'
                          }`}>
                            {solicitud.rutaAprobacion.almacen.estado === 'Aprobada' || solicitud.rutaAprobacion.almacen.estado === 'Entregada' ? '✓' : 
                             solicitud.rutaAprobacion.almacen.estado === 'Denegada' ? '✗' : 
                             solicitud.nivelActual === 'Almacén' ? '●' : '2'}
                          </div>
                          <div className="h-0.5 w-4 bg-gray-300"></div>
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                            solicitud.rutaAprobacion.adquisicion.estado === 'Compra realizada' || solicitud.rutaAprobacion.adquisicion.estado === 'Aprobada' ? 'bg-green-100 text-green-700' :
                            solicitud.rutaAprobacion.adquisicion.estado === 'No requerida' ? 'bg-gray-100 text-gray-700' :
                            solicitud.nivelActual === 'Adquisición' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-400'
                          }`}>
                            {solicitud.rutaAprobacion.adquisicion.estado === 'Compra realizada' || solicitud.rutaAprobacion.adquisicion.estado === 'Aprobada' ? '✓' : 
                             solicitud.rutaAprobacion.adquisicion.estado === 'No requerida' ? '-' : 
                             solicitud.nivelActual === 'Adquisición' ? '●' : '3'}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                          <span>Sub</span>
                          <span>→</span>
                          <span>Alm</span>
                          <span>→</span>
                          <span>Adq</span>
                        </div>
                      </TableCell>
                      <TableCell>{solicitud.items} ítems</TableCell>
                      <TableCell>{solicitud.fechaSolicitud}</TableCell>
                      <TableCell>
                        <Badge variant={getEstadoBadgeVariant(solicitud.estado)}>
                          {solicitud.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedSolicitud(solicitud)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {canApprove(solicitud) && (
                            <>
                              <Button variant="ghost" size="sm" className="text-green-600">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
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
              <CardTitle>Solicitudes Pendientes de Aprobación</CardTitle>
              <CardDescription>Solicitudes que requieren tu atención</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Área</TableHead>
                    <TableHead>Ítems</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {solicitudes.filter(s => s.estado.includes('Pendiente')).map((solicitud) => (
                    <TableRow key={solicitud.id}>
                      <TableCell className="font-mono font-medium">{solicitud.id}</TableCell>
                      <TableCell>{solicitud.solicitante}</TableCell>
                      <TableCell>{solicitud.subAlmacen}</TableCell>
                      <TableCell>{solicitud.items} ítems</TableCell>
                      <TableCell>
                        <Badge variant={solicitud.prioridad === 'Alta' ? 'destructive' : 'outline'}>
                          {solicitud.prioridad}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">Ver Detalles</Button>
                          {canApprove(solicitud) && (
                            <>
                              <Button size="sm">Aprobar</Button>
                              <Button variant="destructive" size="sm">Denegar</Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completadas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes Completadas</CardTitle>
              <CardDescription>Historial de solicitudes finalizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Área</TableHead>
                    <TableHead>Fecha Solicitud</TableHead>
                    <TableHead>Fecha Completada</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {solicitudes.filter(s => s.estado === 'Completada').map((solicitud) => (
                    <TableRow key={solicitud.id}>
                      <TableCell className="font-mono font-medium">{solicitud.id}</TableCell>
                      <TableCell>{solicitud.solicitante}</TableCell>
                      <TableCell>{solicitud.subAlmacen}</TableCell>
                      <TableCell>{solicitud.fechaSolicitud}</TableCell>
                      <TableCell>{solicitud.rutaAprobacion.almacen.fecha || '2025-10-31'}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedSolicitud && (
        <Dialog open={!!selectedSolicitud} onOpenChange={() => setSelectedSolicitud(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles de Solicitud {selectedSolicitud.id}</DialogTitle>
              <DialogDescription>Información completa y flujo de aprobaciones</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500">Solicitante</Label>
                  <p className="font-medium">{selectedSolicitud.solicitante}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Sub-Almacén</Label>
                  <p className="font-medium">{selectedSolicitud.subAlmacen}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Tipo</Label>
                  <p className="font-medium">{selectedSolicitud.tipo}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Prioridad</Label>
                  <Badge variant={selectedSolicitud.prioridad === 'Alta' ? 'destructive' : 'outline'}>
                    {selectedSolicitud.prioridad}
                  </Badge>
                </div>
                <div>
                  <Label className="text-gray-500">Almacén Asignado</Label>
                  <p className="font-medium">{selectedSolicitud.almacen}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Ubicación Actual Ítems</Label>
                  <p className="font-medium">{selectedSolicitud.ubicacionActualItems || 'Pendiente'}</p>
                </div>
              </div>
              <div>
                <Label className="text-gray-500">Justificación</Label>
                <p className="mt-1 text-sm border rounded-md p-3 bg-gray-50">{selectedSolicitud.justificacion}</p>
              </div>
              
              <div>
                <Label className="text-gray-500 mb-2 block">Ítems Solicitados</Label>
                <div className="border rounded-md">
                  {selectedSolicitud.itemsSolicitados.map((item, idx) => (
                    <div key={idx} className="flex justify-between p-3 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{item.codigo} - {item.nombre}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.cantidad} {item.unidad}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-gray-500 mb-2 block">Flujo de Aprobaciones UNITEPC</Label>
                <div className="space-y-2">
                  <div className={`flex items-center gap-3 p-3 border rounded-md ${
                    selectedSolicitud.rutaAprobacion.subAlmacen.estado === 'Aprobada' ? 'bg-green-50' :
                    selectedSolicitud.rutaAprobacion.subAlmacen.estado === 'Denegada' ? 'bg-red-50' :
                    selectedSolicitud.nivelActual === 'Sub-Almacén' ? 'bg-blue-50' : ''
                  }`}>
                    {selectedSolicitud.rutaAprobacion.subAlmacen.estado === 'Aprobada' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : selectedSolicitud.rutaAprobacion.subAlmacen.estado === 'Denegada' ? (
                      <XCircle className="h-5 w-5 text-red-600" />
                    ) : selectedSolicitud.nivelActual === 'Sub-Almacén' ? (
                      <Clock className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-gray-400" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">1. Encargado de Sub-Almacén (Laboratorio)</p>
                      <p className="text-sm text-gray-500">
                        {selectedSolicitud.rutaAprobacion.subAlmacen.estado ? (
                          <>
                            {selectedSolicitud.rutaAprobacion.subAlmacen.estado} - {selectedSolicitud.rutaAprobacion.subAlmacen.fecha}
                            <br />
                            {selectedSolicitud.rutaAprobacion.subAlmacen.responsable}
                            {selectedSolicitud.rutaAprobacion.subAlmacen.observaciones && (
                              <><br />Obs: {selectedSolicitud.rutaAprobacion.subAlmacen.observaciones}</>
                            )}
                          </>
                        ) : 'Pendiente de revisión'}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-3 p-3 border rounded-md ${
                    selectedSolicitud.rutaAprobacion.almacen.estado === 'Aprobada' || selectedSolicitud.rutaAprobacion.almacen.estado === 'Entregada' ? 'bg-green-50' :
                    selectedSolicitud.rutaAprobacion.almacen.estado === 'Denegada' ? 'bg-red-50' :
                    selectedSolicitud.nivelActual === 'Almacén' ? 'bg-blue-50' : 'opacity-50'
                  }`}>
                    {selectedSolicitud.rutaAprobacion.almacen.estado === 'Aprobada' || selectedSolicitud.rutaAprobacion.almacen.estado === 'Entregada' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : selectedSolicitud.rutaAprobacion.almacen.estado === 'Denegada' ? (
                      <XCircle className="h-5 w-5 text-red-600" />
                    ) : selectedSolicitud.nivelActual === 'Almacén' ? (
                      <Clock className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-gray-400" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">2. Administración de Campus (Almacén)</p>
                      <p className="text-sm text-gray-500">
                        {selectedSolicitud.rutaAprobacion.almacen.estado ? (
                          <>
                            {selectedSolicitud.rutaAprobacion.almacen.estado} - {selectedSolicitud.rutaAprobacion.almacen.fecha}
                            <br />
                            {selectedSolicitud.rutaAprobacion.almacen.responsable}
                            {selectedSolicitud.rutaAprobacion.almacen.observaciones && (
                              <><br />Obs: {selectedSolicitud.rutaAprobacion.almacen.observaciones}</>
                            )}
                          </>
                        ) : 'Pendiente de revisión'}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-3 p-3 border rounded-md ${
                    selectedSolicitud.rutaAprobacion.adquisicion.estado === 'Compra realizada' || selectedSolicitud.rutaAprobacion.adquisicion.estado === 'Aprobada' ? 'bg-green-50' :
                    selectedSolicitud.rutaAprobacion.adquisicion.estado === 'No requerida' ? 'bg-gray-50' :
                    selectedSolicitud.nivelActual === 'Adquisición' ? 'bg-blue-50' : 'opacity-50'
                  }`}>
                    {selectedSolicitud.rutaAprobacion.adquisicion.estado === 'Compra realizada' || selectedSolicitud.rutaAprobacion.adquisicion.estado === 'Aprobada' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : selectedSolicitud.rutaAprobacion.adquisicion.estado === 'No requerida' ? (
                      <CheckCircle className="h-5 w-5 text-gray-600" />
                    ) : selectedSolicitud.nivelActual === 'Adquisición' ? (
                      <Clock className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-gray-400" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">3. Departamento de Adquisiciones</p>
                      <p className="text-sm text-gray-500">
                        {selectedSolicitud.rutaAprobacion.adquisicion.estado ? (
                          <>
                            {selectedSolicitud.rutaAprobacion.adquisicion.estado}
                            {selectedSolicitud.rutaAprobacion.adquisicion.fecha && <> - {selectedSolicitud.rutaAprobacion.adquisicion.fecha}</>}
                            {selectedSolicitud.rutaAprobacion.adquisicion.responsable && (
                              <><br />{selectedSolicitud.rutaAprobacion.adquisicion.responsable}</>
                            )}
                            {selectedSolicitud.rutaAprobacion.adquisicion.observaciones && (
                              <><br />Obs: {selectedSolicitud.rutaAprobacion.adquisicion.observaciones}</>
                            )}
                          </>
                        ) : 'Pendiente de revisión'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedSolicitud.rutaItems.length > 0 && (
                <div>
                  <Label className="text-gray-500 mb-2 block">Mapa de Ruta de Ítems</Label>
                  <div className="border rounded-md p-4 bg-gray-50">
                    {selectedSolicitud.rutaItems.map((ruta, idx) => (
                      <div key={idx} className="flex items-start gap-3 mb-3 last:mb-0">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-medium flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{ruta.ubicacion}</p>
                          <p className="text-sm text-gray-500">{ruta.accion} - {ruta.fecha}</p>
                        </div>
                        {idx < selectedSolicitud.rutaItems.length - 1 && (
                          <div className="absolute left-[19px] mt-8 h-full w-0.5 bg-blue-200" style={{height: '20px'}}></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedSolicitud(null)}>Cerrar</Button>
              {canApprove(selectedSolicitud) && (
                <>
                  <Button variant="destructive">Denegar</Button>
                  <Button>Aprobar</Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
