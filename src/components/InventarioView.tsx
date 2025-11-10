import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Search, Warehouse, Package, AlertTriangle, TrendingDown, Building2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const ubicaciones = [
  { id: 1, nombre: 'Almacén Central', tipo: 'Almacén', sede: 'La Paz', items: 456 },
  { id: 2, nombre: 'Lab. Química', tipo: 'Subalmacén', sede: 'La Paz', items: 124 },
  { id: 3, nombre: 'Lab. Física', tipo: 'Subalmacén', sede: 'La Paz', items: 89 },
  { id: 4, nombre: 'Lab. Biología', tipo: 'Subalmacén', sede: 'La Paz', items: 156 },
  { id: 5, nombre: 'Almacén Cochabamba', tipo: 'Almacén', sede: 'Cochabamba', items: 312 },
]

const stockPorUbicacion = [
  {
    codigo: 'QUI-001',
    nombre: 'Ácido Sulfúrico H2SO4',
    unidad: 'Litros',
    almacenCentral: 25,
    labQuimica: 12,
    labFisica: 3,
    labBiologia: 5,
    total: 45
  },
  {
    codigo: 'EQU-023',
    nombre: 'Microscopio Binocular',
    unidad: 'Unidades',
    almacenCentral: 3,
    labQuimica: 2,
    labFisica: 2,
    labBiologia: 1,
    total: 8
  },
  {
    codigo: 'BIO-045',
    nombre: 'Guantes de Látex',
    unidad: 'Pares',
    almacenCentral: 5,
    labQuimica: 3,
    labFisica: 2,
    labBiologia: 2,
    total: 12
  },
]

const movimientos = [
  {
    fecha: '2025-11-04 10:30',
    tipo: 'Salida',
    item: 'Ácido Sulfúrico H2SO4',
    cantidad: 2,
    origen: 'Lab. Química',
    destino: 'Dr. Juan Pérez',
    responsable: 'Enc. Lab. Química'
  },
  {
    fecha: '2025-11-04 09:15',
    tipo: 'Traspaso',
    item: 'Guantes de Látex',
    cantidad: 20,
    origen: 'Almacén Central',
    destino: 'Lab. Física',
    responsable: 'Responsable Almacén'
  },
  {
    fecha: '2025-11-03 16:45',
    tipo: 'Entrada',
    item: 'Pipetas 10ml',
    cantidad: 50,
    origen: 'OC-0156',
    destino: 'Almacén Central',
    responsable: 'Responsable Almacén'
  },
]

export function InventarioView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterUbicacion, setFilterUbicacion] = useState('todas')
  const [filterSede, setFilterSede] = useState('todas')

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">Gestión de Inventario</h1>
        <p className="text-gray-500">Control de stock por almacenes y subalmacenes</p>
      </div>

      <div className="grid gap-4 md:grid-cols-5 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Ítems</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">1,247</div>
            <p className="text-xs text-gray-500">En todas las ubicaciones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Almacenes</CardTitle>
            <Warehouse className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">2</div>
            <p className="text-xs text-gray-500">Almacenes principales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Subalmacenes</CardTitle>
            <Building2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">3</div>
            <p className="text-xs text-gray-500">Laboratorios activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Stock Bajo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-600">15</div>
            <p className="text-xs text-gray-500">Requieren atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Valor Total</CardTitle>
            <TrendingDown className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">Bs. 284K</div>
            <p className="text-xs text-gray-500">Inventario valorizado</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ubicaciones" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ubicaciones">Por Ubicación</TabsTrigger>
          <TabsTrigger value="stock">Stock Detallado</TabsTrigger>
          <TabsTrigger value="movimientos">Movimientos</TabsTrigger>
        </TabsList>

        <TabsContent value="ubicaciones" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Almacenes y Subalmacenes</CardTitle>
                  <CardDescription>Vista general por ubicación</CardDescription>
                </div>
                <Select value={filterSede} onValueChange={setFilterSede}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las sedes</SelectItem>
                    <SelectItem value="La Paz">La Paz</SelectItem>
                    <SelectItem value="Cochabamba">Cochabamba</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {ubicaciones
                  .filter(ub => filterSede === 'todas' || ub.sede === filterSede)
                  .map((ubicacion) => (
                  <Card key={ubicacion.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {ubicacion.tipo === 'Almacén' ? (
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                              <Warehouse className="h-6 w-6 text-blue-600" />
                            </div>
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                              <Building2 className="h-6 w-6 text-purple-600" />
                            </div>
                          )}
                          <div>
                            <CardTitle className="text-lg">{ubicacion.nombre}</CardTitle>
                            <CardDescription>{ubicacion.sede}</CardDescription>
                          </div>
                        </div>
                        <Badge variant={ubicacion.tipo === 'Almacén' ? 'default' : 'secondary'}>
                          {ubicacion.tipo}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Ítems almacenados:</span>
                          <span className="font-semibold">{ubicacion.items}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Ver Stock
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Movimientos
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stock" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Stock Detallado por Ubicación</CardTitle>
                  <CardDescription>Visualización del stock en cada almacén/subalmacén</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={filterUbicacion} onValueChange={setFilterUbicacion}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas las ubicaciones</SelectItem>
                      <SelectItem value="almacen">Solo Almacenes</SelectItem>
                      <SelectItem value="subalmacen">Solo Subalmacenes</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Buscar ítem..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-[250px]"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Ítem</TableHead>
                      <TableHead>Unidad</TableHead>
                      <TableHead>Almacén Central</TableHead>
                      <TableHead>Lab. Química</TableHead>
                      <TableHead>Lab. Física</TableHead>
                      <TableHead>Lab. Biología</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockPorUbicacion.map((item) => (
                      <TableRow key={item.codigo}>
                        <TableCell className="font-mono">{item.codigo}</TableCell>
                        <TableCell className="font-medium">{item.nombre}</TableCell>
                        <TableCell>{item.unidad}</TableCell>
                        <TableCell>{item.almacenCentral}</TableCell>
                        <TableCell>{item.labQuimica}</TableCell>
                        <TableCell>{item.labFisica}</TableCell>
                        <TableCell>{item.labBiologia}</TableCell>
                        <TableCell className="font-semibold">{item.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumen de Stock por Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { categoria: 'Reactivos Químicos', items: 245, valor: 'Bs. 84,500' },
                  { categoria: 'Equipamiento', items: 78, valor: 'Bs. 156,800' },
                  { categoria: 'Bioseguridad', items: 156, valor: 'Bs. 12,400' },
                  { categoria: 'Cristalería', items: 234, valor: 'Bs. 18,600' },
                  { categoria: 'Consumibles', items: 534, valor: 'Bs. 11,700' },
                ].map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium">{cat.categoria}</p>
                      <p className="text-sm text-gray-500">{cat.items} ítems</p>
                    </div>
                    <p className="font-semibold">{cat.valor}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movimientos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Historial de Movimientos</CardTitle>
                  <CardDescription>Registro de todos los movimientos de inventario</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo de movimiento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="entrada">Entradas</SelectItem>
                      <SelectItem value="salida">Salidas</SelectItem>
                      <SelectItem value="traspaso">Traspasos</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input type="date" className="w-[150px]" />
                  <Input placeholder="Buscar..." className="w-[200px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha/Hora</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Ítem</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Origen</TableHead>
                    <TableHead>Destino</TableHead>
                    <TableHead>Responsable</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movimientos.map((mov, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-mono text-sm">{mov.fecha}</TableCell>
                      <TableCell>
                        <Badge variant={
                          mov.tipo === 'Entrada' ? 'default' : 
                          mov.tipo === 'Salida' ? 'destructive' : 
                          'secondary'
                        }>
                          {mov.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{mov.item}</TableCell>
                      <TableCell>{mov.cantidad}</TableCell>
                      <TableCell>{mov.origen}</TableCell>
                      <TableCell>{mov.destino}</TableCell>
                      <TableCell>{mov.responsable}</TableCell>
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
