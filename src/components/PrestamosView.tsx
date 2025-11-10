import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Plus, Search, Eye, QrCode, Mail, HandHeart, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import type { UserRole } from '../App'

interface PrestamosViewProps {
  userRole: UserRole
}

const prestamos = [
  {
    id: 'PRE-0089',
    item: 'Microscopio Binocular',
    codigo: 'EQU-023-05',
    custodio: 'Dr. Juan Pérez',
    email: 'juan.perez@unitepc.edu.bo',
    cedula: '9876543 LP',
    area: 'Lab. Química',
    fechaPrestamo: '2025-11-01',
    fechaDevolucion: '2025-11-08',
    estado: 'Activo',
    qrCode: 'PRE0089QR2025'
  },
  {
    id: 'PRE-0088',
    item: 'Balanza Analítica',
    codigo: 'EQU-012-03',
    custodio: 'Ing. María García',
    email: 'maria.garcia@unitepc.edu.bo',
    cedula: '8765432 LP',
    area: 'Lab. Física',
    fechaPrestamo: '2025-10-28',
    fechaDevolucion: '2025-11-06',
    estado: 'Activo',
    qrCode: 'PRE0088QR2025'
  },
  {
    id: 'PRE-0087',
    item: 'Pipeta Automática 100-1000μL',
    codigo: 'EQU-045-12',
    custodio: 'Lic. Carlos López',
    email: 'carlos.lopez@unitepc.edu.bo',
    cedula: '7654321 LP',
    area: 'Lab. Biología',
    fechaPrestamo: '2025-10-25',
    fechaDevolucion: '2025-11-04',
    estado: 'Vencido',
    qrCode: 'PRE0087QR2025'
  },
  {
    id: 'PRE-0086',
    item: 'Centrífuga de Laboratorio',
    codigo: 'EQU-034-08',
    custodio: 'Dr. Ana Martínez',
    email: 'ana.martinez@unitepc.edu.bo',
    cedula: '6543210 LP',
    area: 'Lab. Química',
    fechaPrestamo: '2025-10-20',
    fechaDevolucion: '2025-10-27',
    fechaDevuelto: '2025-10-27',
    estado: 'Devuelto',
    estadoEquipo: 'Bueno',
    qrCode: 'PRE0086QR2025'
  },
]

export function PrestamosView({ userRole }: PrestamosViewProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEstado, setFilterEstado] = useState('todos')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPrestamo, setSelectedPrestamo] = useState<typeof prestamos[0] | null>(null)

  const filteredPrestamos = prestamos.filter(pre => {
    const matchSearch = pre.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       pre.custodio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       pre.item.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEstado = filterEstado === 'todos' || pre.estado === filterEstado
    return matchSearch && matchEstado
  })

  const getEstadoBadgeVariant = (estado: string) => {
    if (estado === 'Activo') return 'default'
    if (estado === 'Vencido') return 'destructive'
    if (estado === 'Devuelto') return 'secondary'
    return 'outline'
  }

  const canCreate = userRole === 'encargado_lab'
  const canManage = userRole === 'encargado_lab'

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2">Préstamos de Equipamiento</h1>
          <p className="text-gray-500">Gestión de préstamos retornables con custodia</p>
        </div>
        {canCreate && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Préstamo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Registrar Préstamo de Equipamiento</DialogTitle>
                <DialogDescription>
                  Complete la información del custodio y equipo. Se generará QR y notificación por correo.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ítem a Prestar *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Buscar equipo disponible" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="item1">Microscopio Binocular - EQU-023-05</SelectItem>
                        <SelectItem value="item2">Balanza Analítica - EQU-012-03</SelectItem>
                        <SelectItem value="item3">Pipeta Automática - EQU-045-12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Área/Laboratorio</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lab1">Lab. Química</SelectItem>
                        <SelectItem value="lab2">Lab. Física</SelectItem>
                        <SelectItem value="lab3">Lab. Biología</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Datos del Custodio</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nombre Completo *</Label>
                        <Input placeholder="Dr. Juan Pérez" />
                      </div>
                      <div className="space-y-2">
                        <Label>Cédula de Identidad *</Label>
                        <Input placeholder="9876543 LP" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Email para Notificación *</Label>
                        <Input type="email" placeholder="juan.perez@unitepc.edu.bo" />
                      </div>
                      <div className="space-y-2">
                        <Label>Teléfono de Contacto</Label>
                        <Input placeholder="+591 78945612" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">
                      <Mail className="inline h-4 w-4 mr-1" />
                      El custodio recibirá una notificación por correo con los detalles del préstamo y código QR
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fecha de Préstamo</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de Devolución Estimada *</Label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Observaciones</Label>
                  <Input placeholder="Estado del equipo, condiciones especiales, etc." />
                </div>

                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                  <QrCode className="h-5 w-5 text-gray-500" />
                  <div className="text-sm">
                    <p className="font-medium">Código QR</p>
                    <p className="text-gray-500">Se generará automáticamente al registrar el préstamo</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Registrar Préstamo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Préstamos Activos</CardTitle>
            <HandHeart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{prestamos.filter(p => p.estado === 'Activo').length}</div>
            <p className="text-xs text-gray-500">En custodia actualmente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Vencidos</CardTitle>
            <AlertCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-600">{prestamos.filter(p => p.estado === 'Vencido').length}</div>
            <p className="text-xs text-gray-500">Requieren seguimiento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Devoluciones Hoy</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">0</div>
            <p className="text-xs text-gray-500">Programadas para hoy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Completados Este Mes</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{prestamos.filter(p => p.estado === 'Devuelto').length}</div>
            <p className="text-xs text-gray-500">Devueltos correctamente</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activos">
            Activos
            <Badge variant="secondary" className="ml-2">
              {prestamos.filter(p => p.estado === 'Activo').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="vencidos">
            Vencidos
            {prestamos.filter(p => p.estado === 'Vencido').length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {prestamos.filter(p => p.estado === 'Vencido').length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="activos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Préstamos Activos</CardTitle>
                  <CardDescription>Equipos actualmente en custodia</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={filterEstado} onValueChange={setFilterEstado}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Activo">Activos</SelectItem>
                      <SelectItem value="Vencido">Vencidos</SelectItem>
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
                    <TableHead>ID Préstamo</TableHead>
                    <TableHead>Equipo</TableHead>
                    <TableHead>Custodio</TableHead>
                    <TableHead>Área</TableHead>
                    <TableHead>Fecha Préstamo</TableHead>
                    <TableHead>Vence</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrestamos
                    .filter(p => p.estado === 'Activo')
                    .map((prestamo) => (
                    <TableRow key={prestamo.id}>
                      <TableCell className="font-mono font-medium">{prestamo.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{prestamo.item}</p>
                          <p className="text-sm text-gray-500">{prestamo.codigo}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{prestamo.custodio}</p>
                          <p className="text-sm text-gray-500">{prestamo.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{prestamo.area}</TableCell>
                      <TableCell>{prestamo.fechaPrestamo}</TableCell>
                      <TableCell>{prestamo.fechaDevolucion}</TableCell>
                      <TableCell>
                        <Badge variant={getEstadoBadgeVariant(prestamo.estado)}>
                          {prestamo.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedPrestamo(prestamo)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {canManage && (
                            <Button variant="outline" size="sm">
                              Registrar Devolución
                            </Button>
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

        <TabsContent value="vencidos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Préstamos Vencidos</CardTitle>
              <CardDescription>Equipos con fecha de devolución vencida</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Equipo</TableHead>
                    <TableHead>Custodio</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Vencimiento</TableHead>
                    <TableHead>Días Vencido</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prestamos
                    .filter(p => p.estado === 'Vencido')
                    .map((prestamo) => {
                      const diasVencido = Math.floor((new Date().getTime() - new Date(prestamo.fechaDevolucion).getTime()) / (1000 * 60 * 60 * 24))
                      return (
                        <TableRow key={prestamo.id}>
                          <TableCell className="font-mono font-medium">{prestamo.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{prestamo.item}</p>
                              <p className="text-sm text-gray-500">{prestamo.codigo}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{prestamo.custodio}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{prestamo.email}</p>
                              <p className="text-gray-500">CI: {prestamo.cedula}</p>
                            </div>
                          </TableCell>
                          <TableCell>{prestamo.fechaDevolucion}</TableCell>
                          <TableCell>
                            <Badge variant="destructive">{diasVencido} días</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Mail className="h-4 w-4 mr-1" />
                                Recordatorio
                              </Button>
                              {canManage && (
                                <Button size="sm">Registrar Devolución</Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
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
                  <CardTitle>Historial de Préstamos</CardTitle>
                  <CardDescription>Registro completo de préstamos devueltos</CardDescription>
                </div>
                <Input placeholder="Buscar..." className="w-[250px]" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Equipo</TableHead>
                    <TableHead>Custodio</TableHead>
                    <TableHead>Préstamo</TableHead>
                    <TableHead>Devolución</TableHead>
                    <TableHead>Estado Equipo</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prestamos
                    .filter(p => p.estado === 'Devuelto')
                    .map((prestamo) => (
                    <TableRow key={prestamo.id}>
                      <TableCell className="font-mono font-medium">{prestamo.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{prestamo.item}</p>
                          <p className="text-sm text-gray-500">{prestamo.codigo}</p>
                        </div>
                      </TableCell>
                      <TableCell>{prestamo.custodio}</TableCell>
                      <TableCell>{prestamo.fechaPrestamo}</TableCell>
                      <TableCell>{prestamo.fechaDevuelto}</TableCell>
                      <TableCell>
                        <Badge variant="default">{prestamo.estadoEquipo}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">Devuelto</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedPrestamo && (
        <Dialog open={!!selectedPrestamo} onOpenChange={() => setSelectedPrestamo(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles del Préstamo {selectedPrestamo.id}</DialogTitle>
              <DialogDescription>Información completa del préstamo y custodio</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500">Equipo</Label>
                  <p className="font-medium">{selectedPrestamo.item}</p>
                  <p className="text-sm text-gray-500">{selectedPrestamo.codigo}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Área</Label>
                  <p className="font-medium">{selectedPrestamo.area}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Custodio</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Nombre</Label>
                    <p className="font-medium">{selectedPrestamo.custodio}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">CI</Label>
                    <p className="font-medium">{selectedPrestamo.cedula}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Email</Label>
                    <p className="font-medium">{selectedPrestamo.email}</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-gray-500">Fecha Préstamo</Label>
                    <p className="font-medium">{selectedPrestamo.fechaPrestamo}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Fecha Devolución</Label>
                    <p className="font-medium">{selectedPrestamo.fechaDevolucion}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Estado</Label>
                    <Badge variant={getEstadoBadgeVariant(selectedPrestamo.estado)}>
                      {selectedPrestamo.estado}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="h-32 w-32 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">Código QR: {selectedPrestamo.qrCode}</p>
                  <Button variant="outline" size="sm" className="mt-2">Imprimir Nota</Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedPrestamo(null)}>Cerrar</Button>
              {canManage && selectedPrestamo.estado !== 'Devuelto' && (
                <Button>Registrar Devolución</Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
