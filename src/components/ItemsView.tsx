import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Plus, Search, Eye, Edit, Package, AlertTriangle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const items = [
  { 
    id: 1,
    codigo: 'QUI-001',
    nombre: 'Ácido Sulfúrico H2SO4', 
    categoria: 'Reactivos Químicos',
    subcategoria: 'Ácidos',
    tipo: 'Consumible',
    unidad: 'Litros',
    laboratorio: 'Lab. Química',
    ubicacionActual: 'Almacén Central',
    stockTotal: 45,
    stockMinimo: 20,
    estado: 'Activo'
  },
  { 
    id: 2,
    codigo: 'EQU-023',
    nombre: 'Microscopio Binocular', 
    categoria: 'Equipamiento Laboratorio',
    subcategoria: 'Óptica',
    tipo: 'Retornable',
    unidad: 'Unidades',
    laboratorio: 'Lab. Biología',
    ubicacionActual: 'Lab. Biología',
    stockTotal: 8,
    stockMinimo: 5,
    estado: 'Activo'
  },
  { 
    id: 3,
    codigo: 'BIO-045',
    nombre: 'Guantes de Látex', 
    categoria: 'Bioseguridad',
    subcategoria: 'EPP',
    tipo: 'Consumible',
    unidad: 'Pares',
    laboratorio: 'Lab. Simulación Clínica',
    ubicacionActual: 'Lab. Simulación Clínica',
    stockTotal: 12,
    stockMinimo: 50,
    estado: 'Activo'
  },
  { 
    id: 4,
    codigo: 'QUI-087',
    nombre: 'Etanol 96%', 
    categoria: 'Reactivos Químicos',
    subcategoria: 'Alcoholes',
    tipo: 'Consumible',
    unidad: 'Litros',
    laboratorio: 'Lab. Química',
    ubicacionActual: 'Almacén Central',
    stockTotal: 0,
    stockMinimo: 15,
    estado: 'Inactivo'
  },
  { 
    id: 5,
    codigo: 'MUE-012',
    nombre: 'Escritorio Ejecutivo', 
    categoria: 'Muebles y Enseres',
    subcategoria: 'Muebles de Oficina',
    tipo: 'Retornable',
    unidad: 'Unidades',
    laboratorio: 'Administración',
    ubicacionActual: 'Dept. Adquisiciones',
    stockTotal: 5,
    stockMinimo: 2,
    estado: 'Activo',
    enTransito: true,
    destinoFinal: 'Lab. Simulación Clínica - Campus Colonial'
  },
  { 
    id: 6,
    codigo: 'COM-045',
    nombre: 'Laptop Dell Latitude 5420', 
    categoria: 'Equipamiento Computación',
    subcategoria: 'Computadoras',
    tipo: 'Retornable',
    unidad: 'Unidades',
    laboratorio: 'Lab. Informática',
    ubicacionActual: 'Dept. Adquisiciones',
    stockTotal: 10,
    stockMinimo: 5,
    estado: 'Activo',
    enTransito: true,
    destinoFinal: 'Lab. Informática - Campus Central'
  },
  { 
    id: 7,
    codigo: 'LAB-089',
    nombre: 'Probetas Graduadas 100ml', 
    categoria: 'Cristalería',
    subcategoria: 'Material Volumétrico',
    tipo: 'Retornable',
    unidad: 'Unidades',
    laboratorio: 'Lab. Simulación Clínica',
    ubicacionActual: 'Dept. Adquisiciones',
    stockTotal: 100,
    stockMinimo: 50,
    estado: 'Activo',
    enTransito: true,
    destinoFinal: 'Lab. Simulación Clínica - Campus Colonial'
  },
]

const categorias = [
  'Reactivos Químicos', 
  'Equipamiento Laboratorio', 
  'Equipamiento Computación',
  'Muebles y Enseres',
  'Bioseguridad', 
  'Cristalería', 
  'Material de Escritorio',
  'Consumibles Generales'
]

const subcategoriasPorCategoria: Record<string, string[]> = {
  'Reactivos Químicos': ['Ácidos', 'Bases', 'Alcoholes', 'Sales', 'Solventes'],
  'Equipamiento Laboratorio': ['Óptica', 'Medición', 'Calefacción', 'Mezclado'],
  'Equipamiento Computación': ['Computadoras', 'Periféricos', 'Redes', 'Accesorios'],
  'Muebles y Enseres': ['Muebles de Oficina', 'Sillas', 'Archivadores', 'Estanterías'],
  'Bioseguridad': ['EPP', 'Vestimenta', 'Protección Respiratoria'],
  'Cristalería': ['Material Volumétrico', 'Contenedores', 'Tubos y Placas'],
  'Material de Escritorio': ['Papelería', 'Útiles', 'Archivado'],
  'Consumibles Generales': ['Limpieza', 'Mantenimiento', 'Varios']
}

export function ItemsView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategoria, setFilterCategoria] = useState('todas')
  const [filterEstado, setFilterEstado] = useState('todos')
  const [filterLaboratorio, setFilterLaboratorio] = useState('todos')
  const [filterUbicacion, setFilterUbicacion] = useState('todas')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCategoria, setSelectedCategoria] = useState('')

  const filteredItems = items.filter(item => {
    const matchSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       item.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategoria = filterCategoria === 'todas' || item.categoria === filterCategoria
    const matchEstado = filterEstado === 'todos' || item.estado === filterEstado
    const matchLaboratorio = filterLaboratorio === 'todos' || item.laboratorio === filterLaboratorio
    const matchUbicacion = filterUbicacion === 'todas' || item.ubicacionActual === filterUbicacion
    return matchSearch && matchCategoria && matchEstado && matchLaboratorio && matchUbicacion
  })
  
  const subcategoriasDisponibles = selectedCategoria ? subcategoriasPorCategoria[selectedCategoria] || [] : []

  const itemsBajoStock = items.filter(item => item.stockTotal < item.stockMinimo && item.estado === 'Activo')

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2">Catálogo de Ítems</h1>
          <p className="text-gray-500">Gestiona todos los ítems del inventario</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Ítem
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Ítem</DialogTitle>
              <DialogDescription>
                Complete la información del ítem con su codificación única
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Código Único *</Label>
                  <Input placeholder="Ej: QUI-001" />
                </div>
                <div className="space-y-2">
                  <Label>Nombre del Ítem *</Label>
                  <Input placeholder="Ej: Ácido Sulfúrico H2SO4" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Categoría *</Label>
                  <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Subcategoría *</Label>
                  <Select disabled={!selectedCategoria}>
                    <SelectTrigger>
                      <SelectValue placeholder={selectedCategoria ? "Seleccionar" : "Primero seleccione categoría"} />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategoriasDisponibles.map(sub => (
                        <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consumible">Consumible</SelectItem>
                      <SelectItem value="retornable">Retornable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Laboratorio de Destino *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar laboratorio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lab_quim">Lab. Química</SelectItem>
                      <SelectItem value="lab_fis">Lab. Física</SelectItem>
                      <SelectItem value="lab_bio">Lab. Biología</SelectItem>
                      <SelectItem value="lab_sim">Lab. Simulación Clínica</SelectItem>
                      <SelectItem value="lab_inf">Lab. Informática</SelectItem>
                      <SelectItem value="admin">Administración</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Ubicación Inicial</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="almacen">Almacén Central</SelectItem>
                      <SelectItem value="adquisiciones">Dept. Adquisiciones</SelectItem>
                      <SelectItem value="lab">Mismo Laboratorio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Unidad de Medida *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="litros">Litros</SelectItem>
                      <SelectItem value="mililitros">Mililitros</SelectItem>
                      <SelectItem value="kilogramos">Kilogramos</SelectItem>
                      <SelectItem value="gramos">Gramos</SelectItem>
                      <SelectItem value="unidades">Unidades</SelectItem>
                      <SelectItem value="pares">Pares</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Stock Inicial</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Stock Mínimo *</Label>
                  <Input type="number" placeholder="10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Especificaciones Técnicas</Label>
                <Input placeholder="Ej: Pureza 98%, CAS 7664-93-9" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => setIsDialogOpen(false)}>Registrar Ítem</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Ítems</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{items.length}</div>
            <p className="text-xs text-gray-500">{items.filter(i => i.estado === 'Activo').length} activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Consumibles</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{items.filter(i => i.tipo === 'Consumible').length}</div>
            <p className="text-xs text-gray-500">Ítems de uso único</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Retornables</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{items.filter(i => i.tipo === 'Retornable').length}</div>
            <p className="text-xs text-gray-500">Equipamiento prestable</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Stock Bajo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-600">{itemsBajoStock.length}</div>
            <p className="text-xs text-gray-500">Requieren reposición</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todos">Todos los Ítems</TabsTrigger>
          <TabsTrigger value="alertas">
            Alertas de Stock
            {itemsBajoStock.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {itemsBajoStock.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Lista de Ítems</CardTitle>
                  <CardDescription>Total: {filteredItems.length} ítems</CardDescription>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center flex-wrap">
                  <Select value={filterCategoria} onValueChange={setFilterCategoria}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas las categorías</SelectItem>
                      {categorias.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterLaboratorio} onValueChange={setFilterLaboratorio}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Laboratorio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los labs</SelectItem>
                      <SelectItem value="Lab. Química">Lab. Química</SelectItem>
                      <SelectItem value="Lab. Física">Lab. Física</SelectItem>
                      <SelectItem value="Lab. Biología">Lab. Biología</SelectItem>
                      <SelectItem value="Lab. Simulación Clínica">Lab. Simulación Clínica</SelectItem>
                      <SelectItem value="Lab. Informática">Lab. Informática</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterUbicacion} onValueChange={setFilterUbicacion}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="Almacén Central">Almacén Central</SelectItem>
                      <SelectItem value="Dept. Adquisiciones">Adquisiciones</SelectItem>
                      <SelectItem value="Lab. Química">Lab. Química</SelectItem>
                      <SelectItem value="Lab. Biología">Lab. Biología</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterEstado} onValueChange={setFilterEstado}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Activo">Activos</SelectItem>
                      <SelectItem value="Inactivo">Inactivos</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Buscar ítem..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-[200px]"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Laboratorio</TableHead>
                    <TableHead>Ubicación Actual</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono">{item.codigo}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.nombre}</p>
                          <p className="text-sm text-gray-500">{item.subcategoria}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{item.categoria}</p>
                          <Badge variant={item.tipo === 'Consumible' ? 'secondary' : 'outline'} className="mt-1">
                            {item.tipo}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{item.laboratorio}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.ubicacionActual}</p>
                          {item.enTransito && (
                            <p className="text-xs text-blue-600 mt-1">
                              → En tránsito a: {item.destinoFinal}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className={item.stockTotal < item.stockMinimo ? 'font-medium text-red-600' : ''}>
                            {item.stockTotal} {item.unidad}
                          </p>
                          <p className="text-xs text-gray-500">Min: {item.stockMinimo}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.estado === 'Activo' ? 'default' : 'secondary'}>
                          {item.estado}
                        </Badge>
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

        <TabsContent value="alertas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ítems con Stock Bajo</CardTitle>
              <CardDescription>Ítems que están por debajo del stock mínimo</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Stock Actual</TableHead>
                    <TableHead>Stock Mínimo</TableHead>
                    <TableHead>Déficit</TableHead>
                    <TableHead>Prioridad</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itemsBajoStock.map((item) => {
                    const deficit = item.stockMinimo - item.stockTotal
                    const prioridad = item.stockTotal === 0 ? 'Crítica' : deficit > 20 ? 'Alta' : 'Media'
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono">{item.codigo}</TableCell>
                        <TableCell className="font-medium">{item.nombre}</TableCell>
                        <TableCell>{item.categoria}</TableCell>
                        <TableCell className="font-medium text-red-600">
                          {item.stockTotal} {item.unidad}
                        </TableCell>
                        <TableCell>{item.stockMinimo} {item.unidad}</TableCell>
                        <TableCell className="font-medium">-{deficit} {item.unidad}</TableCell>
                        <TableCell>
                          <Badge variant={
                            prioridad === 'Crítica' ? 'destructive' : 
                            prioridad === 'Alta' ? 'destructive' : 
                            'outline'
                          }>
                            {prioridad}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
