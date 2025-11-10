import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Plus, Search, Eye, Edit, Users, Building2, Settings, Shield } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const usuarios = [
  { id: 1, nombre: 'Juan Pérez González', email: 'juan.perez@unitepc.edu.bo', rol: 'Docente', area: 'Facultad de Ingeniería', estado: 'Activo' },
  { id: 2, nombre: 'María García López', email: 'maria.garcia@unitepc.edu.bo', rol: 'Encargado Lab', area: 'Lab. Química', estado: 'Activo' },
  { id: 3, nombre: 'Carlos Mendoza', email: 'carlos.mendoza@unitepc.edu.bo', rol: 'Encargado Almacén', area: 'Almacén Central', estado: 'Activo' },
  { id: 4, nombre: 'Ana Martínez', email: 'ana.martinez@unitepc.edu.bo', rol: 'Encargado Adquisición', area: 'Dept. Adquisiciones', estado: 'Activo' },
]

const almacenes = [
  { id: 1, nombre: 'Almacén Central', tipo: 'Almacén', sede: 'La Paz', campus: 'Campus Central', responsable: 'Carlos Mendoza', estado: 'Activo' },
  { id: 2, nombre: 'Lab. Química', tipo: 'Subalmacén', sede: 'La Paz', campus: 'Campus Central', responsable: 'María García', estado: 'Activo' },
  { id: 3, nombre: 'Lab. Física', tipo: 'Subalmacén', sede: 'La Paz', campus: 'Campus Central', responsable: 'Pedro Rojas', estado: 'Activo' },
  { id: 4, nombre: 'Lab. Biología', tipo: 'Subalmacén', sede: 'La Paz', campus: 'Campus Central', responsable: 'Laura Torres', estado: 'Activo' },
]

const categorias = [
  { id: 1, nombre: 'Reactivos Químicos', subcategorias: 8, items: 245, estado: 'Activo' },
  { id: 2, nombre: 'Equipamiento', subcategorias: 5, items: 78, estado: 'Activo' },
  { id: 3, nombre: 'Bioseguridad', subcategorias: 3, items: 156, estado: 'Activo' },
  { id: 4, nombre: 'Cristalería', subcategorias: 4, items: 234, estado: 'Activo' },
]

export function AdminView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<'usuario' | 'almacen' | 'categoria'>('usuario')

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">Administración del Sistema</h1>
        <p className="text-gray-500">Configuración de usuarios, roles y parámetros del sistema</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Usuarios Activos</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{usuarios.filter(u => u.estado === 'Activo').length}</div>
            <p className="text-xs text-gray-500">Total registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Almacenes</CardTitle>
            <Building2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{almacenes.filter(a => a.tipo === 'Almacén').length}</div>
            <p className="text-xs text-gray-500">Almacenes principales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Subalmacenes</CardTitle>
            <Building2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{almacenes.filter(a => a.tipo === 'Subalmacén').length}</div>
            <p className="text-xs text-gray-500">Laboratorios/Áreas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Categorías</CardTitle>
            <Settings className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{categorias.length}</div>
            <p className="text-xs text-gray-500">Categorías activas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="usuarios" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usuarios">Usuarios y Roles</TabsTrigger>
          <TabsTrigger value="almacenes">Almacenes</TabsTrigger>
          <TabsTrigger value="categorias">Categorías</TabsTrigger>
          <TabsTrigger value="configuracion">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestión de Usuarios</CardTitle>
                  <CardDescription>Administra usuarios y sus roles en el sistema</CardDescription>
                </div>
                <Dialog open={isDialogOpen && dialogType === 'usuario'} onOpenChange={(open) => {
                  setIsDialogOpen(open)
                  if (open) setDialogType('usuario')
                }}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Nuevo Usuario
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Registrar Nuevo Usuario</DialogTitle>
                      <DialogDescription>
                        Complete la información del usuario y asigne el rol correspondiente
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nombre Completo *</Label>
                          <Input placeholder="Juan Pérez González" />
                        </div>
                        <div className="space-y-2">
                          <Label>Email Institucional *</Label>
                          <Input type="email" placeholder="juan.perez@unitepc.edu.bo" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Rol *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar rol" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="docente">Docente</SelectItem>
                              <SelectItem value="enc_lab">Encargado de Laboratorio</SelectItem>
                              <SelectItem value="enc_alm">Encargado de Almacén</SelectItem>
                              <SelectItem value="enc_adq">Encargado de Adquisición</SelectItem>
                              <SelectItem value="admin">Administrador</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Área/Departamento *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar área" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ing">Facultad de Ingeniería</SelectItem>
                              <SelectItem value="lab_quim">Lab. Química</SelectItem>
                              <SelectItem value="lab_fis">Lab. Física</SelectItem>
                              <SelectItem value="almacen">Almacén Central</SelectItem>
                              <SelectItem value="adq">Dept. Adquisiciones</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Sede/Campus</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar sede" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lapaz">La Paz - Campus Central</SelectItem>
                            <SelectItem value="cbba">Cochabamba</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                      <Button onClick={() => setIsDialogOpen(false)}>Registrar Usuario</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Buscar usuario..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 max-w-sm"
                  />
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Área/Departamento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuarios.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">{usuario.nombre}</TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {usuario.rol}
                        </Badge>
                      </TableCell>
                      <TableCell>{usuario.area}</TableCell>
                      <TableCell>
                        <Badge variant="default">{usuario.estado}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
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
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Roles y Permisos
              </CardTitle>
              <CardDescription>Configuración de permisos por rol</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rol: 'Docente', permisos: 'Solicitar materiales, ver préstamos', usuarios: 45 },
                  { rol: 'Encargado Laboratorio', permisos: 'Aprobar solicitudes, gestionar préstamos, solicitar reposición', usuarios: 8 },
                  { rol: 'Encargado Almacén', permisos: 'Gestionar inventario, aprobar reposiciones, generar traspasos', usuarios: 3 },
                  { rol: 'Encargado Adquisición', permisos: 'Crear órdenes de compra, gestionar proveedores, ver reportes', usuarios: 2 },
                  { rol: 'Super Administrador', permisos: 'Acceso completo al sistema', usuarios: 1 },
                ].map((rol, idx) => (
                  <div key={idx} className="flex items-start justify-between border-b pb-3 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium">{rol.rol}</p>
                      <p className="text-sm text-gray-500">{rol.permisos}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{rol.usuarios} usuarios</p>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="almacenes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestión de Almacenes y Subalmacenes</CardTitle>
                  <CardDescription>Configuración de ubicaciones de inventario</CardDescription>
                </div>
                <Dialog open={isDialogOpen && dialogType === 'almacen'} onOpenChange={(open) => {
                  setIsDialogOpen(open)
                  if (open) setDialogType('almacen')
                }}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Nueva Ubicación
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Registrar Nueva Ubicación</DialogTitle>
                      <DialogDescription>
                        Configure un nuevo almacén o subalmacén
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nombre *</Label>
                          <Input placeholder="Ej: Lab. Química" />
                        </div>
                        <div className="space-y-2">
                          <Label>Tipo *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="almacen">Almacén</SelectItem>
                              <SelectItem value="subalmacen">Subalmacén/Laboratorio</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Sede *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lapaz">La Paz</SelectItem>
                              <SelectItem value="cbba">Cochabamba</SelectItem>
                              <SelectItem value="scz">Santa Cruz</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Campus *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="central">Campus Central</SelectItem>
                              <SelectItem value="norte">Campus Norte</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Responsable *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Asignar responsable" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user1">Carlos Mendoza</SelectItem>
                            <SelectItem value="user2">María García</SelectItem>
                            <SelectItem value="user3">Pedro Rojas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Descripción</Label>
                        <Input placeholder="Información adicional sobre la ubicación" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                      <Button onClick={() => setIsDialogOpen(false)}>Registrar Ubicación</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Sede/Campus</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {almacenes.map((almacen) => (
                    <TableRow key={almacen.id}>
                      <TableCell className="font-medium">{almacen.nombre}</TableCell>
                      <TableCell>
                        <Badge variant={almacen.tipo === 'Almacén' ? 'default' : 'secondary'}>
                          {almacen.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{almacen.sede}</p>
                          <p className="text-sm text-gray-500">{almacen.campus}</p>
                        </div>
                      </TableCell>
                      <TableCell>{almacen.responsable}</TableCell>
                      <TableCell>
                        <Badge variant="default">{almacen.estado}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
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

        <TabsContent value="categorias" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestión de Categorías</CardTitle>
                  <CardDescription>Organización de ítems por categorías y subcategorías</CardDescription>
                </div>
                <Dialog open={isDialogOpen && dialogType === 'categoria'} onOpenChange={(open) => {
                  setIsDialogOpen(open)
                  if (open) setDialogType('categoria')
                }}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Nueva Categoría
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crear Nueva Categoría</DialogTitle>
                      <DialogDescription>
                        Defina una nueva categoría para clasificar ítems
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label>Nombre de la Categoría *</Label>
                        <Input placeholder="Ej: Reactivos Químicos" />
                      </div>
                      <div className="space-y-2">
                        <Label>Descripción</Label>
                        <Input placeholder="Descripción de la categoría" />
                      </div>
                      <div className="space-y-2">
                        <Label>Subcategorías</Label>
                        <div className="space-y-2">
                          <Input placeholder="Subcategoría 1" />
                          <Input placeholder="Subcategoría 2" />
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Agregar Subcategoría
                          </Button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                      <Button onClick={() => setIsDialogOpen(false)}>Crear Categoría</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Subcategorías</TableHead>
                    <TableHead>Ítems</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categorias.map((categoria) => (
                    <TableRow key={categoria.id}>
                      <TableCell className="font-medium">{categoria.nombre}</TableCell>
                      <TableCell>{categoria.subcategorias} subcategorías</TableCell>
                      <TableCell>{categoria.items} ítems</TableCell>
                      <TableCell>
                        <Badge variant="default">{categoria.estado}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
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

        <TabsContent value="configuracion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General del Sistema</CardTitle>
              <CardDescription>Parámetros y ajustes del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Parámetros de Inventario</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Días de alerta para stock bajo</Label>
                    <Input type="number" defaultValue="7" />
                  </div>
                  <div className="space-y-2">
                    <Label>Porcentaje de alerta de stock mínimo</Label>
                    <Input type="number" defaultValue="20" />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <h3 className="font-medium">Notificaciones</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Alertas de stock bajo</p>
                      <p className="text-sm text-gray-500">Notificar cuando el stock esté por debajo del mínimo</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Préstamos vencidos</p>
                      <p className="text-sm text-gray-500">Enviar recordatorios de devolución</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Solicitudes pendientes</p>
                      <p className="text-sm text-gray-500">Alertar sobre solicitudes sin atender</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <h3 className="font-medium">Sistema</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre de la Institución</Label>
                    <Input defaultValue="UNITEPC" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email de Contacto</Label>
                    <Input type="email" defaultValue="inventario@unitepc.edu.bo" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Restablecer</Button>
                <Button>Guardar Cambios</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Auditoría del Sistema</CardTitle>
              <CardDescription>Registro de acciones importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { fecha: '2025-11-04 10:30', usuario: 'Ana Martínez', accion: 'Creó orden de compra OC-0156' },
                  { fecha: '2025-11-04 09:15', usuario: 'Carlos Mendoza', accion: 'Aprobó solicitud SOL-0234' },
                  { fecha: '2025-11-03 16:45', usuario: 'María García', accion: 'Registró préstamo PRE-0089' },
                  { fecha: '2025-11-03 14:20', usuario: 'Admin Sistema', accion: 'Creó nuevo usuario: Pedro Rojas' },
                ].map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{log.accion}</p>
                      <p className="text-sm text-gray-500">{log.usuario}</p>
                    </div>
                    <p className="text-sm text-gray-500">{log.fecha}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">Ver Registro Completo</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
