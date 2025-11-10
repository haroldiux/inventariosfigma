import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Plus, Search, Eye, Edit, TrendingUp, Phone, MapPin } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const proveedores = [
  { 
    id: 1, 
    nombre: 'Química del Sur SRL', 
    nit: '1234567890', 
    telefono: '+591 78945612', 
    direccion: 'Av. América #123, La Paz',
    email: 'contacto@quimicasur.com',
    itemsSuministrados: 45,
    ultimaCompra: '2025-10-28',
    estado: 'Activo'
  },
  { 
    id: 2, 
    nombre: 'LabEquip Bolivia', 
    nit: '0987654321', 
    telefono: '+591 76543210', 
    direccion: 'Calle Comercio #456, Cochabamba',
    email: 'ventas@labequip.bo',
    itemsSuministrados: 32,
    ultimaCompra: '2025-11-01',
    estado: 'Activo'
  },
  { 
    id: 3, 
    nombre: 'BioInsumos Científicos', 
    nit: '', 
    telefono: '+591 71234567', 
    direccion: 'Zona Sur, Santa Cruz',
    email: 'info@bioinsumos.com',
    itemsSuministrados: 28,
    ultimaCompra: '2025-10-15',
    estado: 'Activo'
  },
]

const historialPrecios = [
  { fecha: '2025-11-01', item: 'Ácido Sulfúrico H2SO4 1L', precio: 85.00, proveedor: 'Química del Sur SRL', itemCodigo: 'QUI-001' },
  { fecha: '2025-10-28', item: 'Ácido Sulfúrico H2SO4 1L', precio: 88.00, proveedor: 'Química del Sur SRL', itemCodigo: 'QUI-001' },
  { fecha: '2025-10-15', item: 'Guantes de Látex (100 unid)', precio: 120.00, proveedor: 'BioInsumos Científicos', itemCodigo: 'BIO-045' },
  { fecha: '2025-10-10', item: 'Pipetas 10ml', precio: 15.00, proveedor: 'LabEquip Bolivia', itemCodigo: 'LAB-089' },
  { fecha: '2025-10-28', item: 'Microscopio Binocular', precio: 2800.00, proveedor: 'LabEquip Bolivia', itemCodigo: 'EQU-023' },
  { fecha: '2025-10-20', item: 'Microscopio Binocular', precio: 3100.00, proveedor: 'BioInsumos Científicos', itemCodigo: 'EQU-023' },
  { fecha: '2025-10-15', item: 'Laptop Dell Latitude 5420', precio: 7500.00, proveedor: 'TechSupply Bolivia', itemCodigo: 'COM-045' },
  { fecha: '2025-10-10', item: 'Laptop Dell Latitude 5420', precio: 7800.00, proveedor: 'CompuMundo', itemCodigo: 'COM-045' },
]

// Datos de proveedores por producto para comparación
const proveedoresPorProducto: Record<string, Array<{proveedor: string, precioActual: number, ultimaCompra: string, stock: string}>> = {
  'QUI-001': [
    { proveedor: 'Química del Sur SRL', precioActual: 85.00, ultimaCompra: '2025-11-01', stock: 'Disponible' },
    { proveedor: 'LabEquip Bolivia', precioActual: 92.00, ultimaCompra: '2025-10-20', stock: 'Disponible' },
    { proveedor: 'BioInsumos Científicos', precioActual: 90.00, ultimaCompra: '2025-10-15', stock: 'Bajo pedido' },
  ],
  'EQU-023': [
    { proveedor: 'LabEquip Bolivia', precioActual: 2800.00, ultimaCompra: '2025-10-28', stock: 'Disponible' },
    { proveedor: 'BioInsumos Científicos', precioActual: 3100.00, ultimaCompra: '2025-10-20', stock: 'Disponible' },
  ],
  'COM-045': [
    { proveedor: 'TechSupply Bolivia', precioActual: 7500.00, ultimaCompra: '2025-10-15', stock: 'Disponible' },
    { proveedor: 'CompuMundo', precioActual: 7800.00, ultimaCompra: '2025-10-10', stock: 'Disponible' },
    { proveedor: 'Infotech SRL', precioActual: 7650.00, ultimaCompra: '2025-09-28', stock: 'Bajo pedido' },
  ],
  'LAB-089': [
    { proveedor: 'LabEquip Bolivia', precioActual: 15.00, ultimaCompra: '2025-10-10', stock: 'Disponible' },
    { proveedor: 'Química del Sur SRL', precioActual: 16.50, ultimaCompra: '2025-09-25', stock: 'Disponible' },
  ]
}

export function ProveedoresView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProducto, setSelectedProducto] = useState('')
  const [comparacionVisible, setComparacionVisible] = useState(false)
  
  const handleBuscarProveedores = () => {
    if (selectedProducto) {
      setComparacionVisible(true)
    }
  }
  
  const proveedoresComparacion = selectedProducto ? proveedoresPorProducto[selectedProducto] || [] : []
  const mejorProveedor = proveedoresComparacion.length > 0 
    ? proveedoresComparacion.reduce((prev, current) => 
        prev.precioActual < current.precioActual ? prev : current
      )
    : null

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2">Gestión de Proveedores</h1>
          <p className="text-gray-500">Administra los proveedores y su historial de precios</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Proveedor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Proveedor</DialogTitle>
              <DialogDescription>
                Complete la información del proveedor. El NIT es opcional.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre del Proveedor *</Label>
                  <Input placeholder="Ej: Química del Sur SRL" />
                </div>
                <div className="space-y-2">
                  <Label>NIT (Opcional)</Label>
                  <Input placeholder="1234567890" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Teléfono/Celular *</Label>
                  <Input placeholder="+591 78945612" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="contacto@proveedor.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Dirección *</Label>
                <Input placeholder="Av. Principal #123, Ciudad" />
              </div>
              <div className="space-y-2">
                <Label>Observaciones</Label>
                <Textarea placeholder="Información adicional sobre el proveedor..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => setIsDialogOpen(false)}>Registrar Proveedor</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="lista" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lista">Lista de Proveedores</TabsTrigger>
          <TabsTrigger value="historial">Historial de Precios</TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Proveedores Registrados</CardTitle>
                  <CardDescription>Total: {proveedores.length} proveedores activos</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Buscar proveedor..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-[300px]"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>NIT</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Ítems Suministrados</TableHead>
                    <TableHead>Última Compra</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {proveedores.map((proveedor) => (
                    <TableRow key={proveedor.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{proveedor.nombre}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {proveedor.direccion}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{proveedor.nit || 'Sin NIT'}</TableCell>
                      <TableCell>
                        <div>
                          <p className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3" />
                            {proveedor.telefono}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">{proveedor.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{proveedor.itemsSuministrados} ítems</TableCell>
                      <TableCell>{proveedor.ultimaCompra}</TableCell>
                      <TableCell>
                        <Badge variant="default">{proveedor.estado}</Badge>
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

        <TabsContent value="historial" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Historial de Precios</CardTitle>
                  <CardDescription>Seguimiento de precios por ítem y proveedor</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Buscar ítem..." className="w-[300px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Ítem</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Tendencia</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historialPrecios.map((registro, idx) => {
                    const preciosAnteriores = historialPrecios.filter(h => 
                      h.item === registro.item && h.fecha < registro.fecha
                    )
                    const precioAnterior = preciosAnteriores.length > 0 
                      ? preciosAnteriores[0].precio 
                      : registro.precio
                    const cambio = precioAnterior !== 0 
                      ? ((registro.precio - precioAnterior) / precioAnterior * 100).toFixed(1)
                      : 0
                    
                    return (
                      <TableRow key={idx}>
                        <TableCell>{registro.fecha}</TableCell>
                        <TableCell className="font-medium">{registro.item}</TableCell>
                        <TableCell>{registro.proveedor}</TableCell>
                        <TableCell className="font-medium">Bs. {registro.precio.toFixed(2)}</TableCell>
                        <TableCell>
                          {Number(cambio) !== 0 && (
                            <div className={`flex items-center gap-1 ${Number(cambio) < 0 ? 'text-green-600' : 'text-red-600'}`}>
                              <TrendingUp className={`h-4 w-4 ${Number(cambio) < 0 ? 'rotate-180' : ''}`} />
                              <span className="text-sm">{cambio}%</span>
                            </div>
                          )}
                          {Number(cambio) === 0 && <span className="text-sm text-gray-400">Sin cambio</span>}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comparativa de Proveedores por Producto</CardTitle>
              <CardDescription>Seleccione un producto para comparar precios entre proveedores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Select value={selectedProducto} onValueChange={setSelectedProducto}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Seleccione un producto para comparar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="QUI-001">QUI-001 - Ácido Sulfúrico H2SO4 1L</SelectItem>
                      <SelectItem value="EQU-023">EQU-023 - Microscopio Binocular</SelectItem>
                      <SelectItem value="COM-045">COM-045 - Laptop Dell Latitude 5420</SelectItem>
                      <SelectItem value="LAB-089">LAB-089 - Probetas Graduadas 100ml</SelectItem>
                      <SelectItem value="BIO-045">BIO-045 - Guantes de Látex (100 unid)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleBuscarProveedores} disabled={!selectedProducto}>
                    Comparar Proveedores
                  </Button>
                </div>
                
                {!comparacionVisible && (
                  <div className="text-sm text-gray-500 text-center py-8">
                    Seleccione un producto para ver la comparación de proveedores
                  </div>
                )}
                
                {comparacionVisible && proveedoresComparacion.length > 0 && (
                  <div className="space-y-4">
                    {mejorProveedor && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                            ★
                          </div>
                          <div>
                            <p className="font-semibold text-green-800">Mejor Opción</p>
                            <p className="text-sm text-green-700">{mejorProveedor.proveedor}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-sm text-green-700">Precio</p>
                            <p className="text-lg font-bold text-green-800">Bs. {mejorProveedor.precioActual.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-green-700">Última Compra</p>
                            <p className="font-medium text-green-800">{mejorProveedor.ultimaCompra}</p>
                          </div>
                          <div>
                            <p className="text-sm text-green-700">Disponibilidad</p>
                            <p className="font-medium text-green-800">{mejorProveedor.stock}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Proveedor</TableHead>
                          <TableHead>Precio Actual</TableHead>
                          <TableHead>Diferencia vs Mejor</TableHead>
                          <TableHead>Última Compra</TableHead>
                          <TableHead>Stock</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {proveedoresComparacion.map((prov, idx) => {
                          const diferencia = mejorProveedor 
                            ? ((prov.precioActual - mejorProveedor.precioActual) / mejorProveedor.precioActual * 100).toFixed(1)
                            : 0
                          const esMejor = prov.proveedor === mejorProveedor?.proveedor
                          
                          return (
                            <TableRow key={idx} className={esMejor ? 'bg-green-50' : ''}>
                              <TableCell className="font-medium">
                                {prov.proveedor}
                                {esMejor && <Badge variant="default" className="ml-2">Recomendado</Badge>}
                              </TableCell>
                              <TableCell className="font-semibold">Bs. {prov.precioActual.toFixed(2)}</TableCell>
                              <TableCell>
                                {esMejor ? (
                                  <Badge variant="default">Mejor precio</Badge>
                                ) : (
                                  <span className="text-red-600">+{diferencia}%</span>
                                )}
                              </TableCell>
                              <TableCell>{prov.ultimaCompra}</TableCell>
                              <TableCell>
                                <Badge variant={prov.stock === 'Disponible' ? 'default' : 'outline'}>
                                  {prov.stock}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                    
                    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 border rounded-lg">
                      <div>
                        <p className="text-sm text-gray-500">Precio Promedio</p>
                        <p className="text-lg font-semibold">
                          Bs. {(proveedoresComparacion.reduce((sum, p) => sum + p.precioActual, 0) / proveedoresComparacion.length).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Ahorro con Mejor Opción</p>
                        <p className="text-lg font-semibold text-green-600">
                          {mejorProveedor && (
                            `Bs. ${((proveedoresComparacion.reduce((sum, p) => sum + p.precioActual, 0) / proveedoresComparacion.length) - mejorProveedor.precioActual).toFixed(2)}`
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Proveedores Disponibles</p>
                        <p className="text-lg font-semibold">{proveedoresComparacion.length}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {comparacionVisible && proveedoresComparacion.length === 0 && (
                  <div className="text-sm text-gray-500 text-center py-8">
                    No se encontraron proveedores para este producto
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
