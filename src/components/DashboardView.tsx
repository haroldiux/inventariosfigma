import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Package, FileText, ShoppingCart, AlertTriangle, TrendingUp, Users } from 'lucide-react'
import type { UserRole } from '../App'

interface DashboardViewProps {
  userRole: UserRole
}

export function DashboardView({ userRole }: DashboardViewProps) {
  const getDashboardContent = () => {
    switch (userRole) {
      case 'superadmin':
        return <SuperAdminDashboard />
      case 'docente':
        return <DocenteDashboard />
      case 'encargado_lab':
        return <EncargadoLabDashboard />
      case 'encargado_almacen':
        return <EncargadoAlmacenDashboard />
      case 'encargado_adquisicion':
        return <EncargadoAdquisicionDashboard />
      default:
        return <SuperAdminDashboard />
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">Dashboard</h1>
        <p className="text-gray-500">Vista general del sistema de control de inventarios</p>
      </div>
      {getDashboardContent()}
    </div>
  )
}

function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Ítems</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">1,247</div>
            <p className="text-xs text-gray-500">+12% respecto al mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Solicitudes Pendientes</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">23</div>
            <p className="text-xs text-gray-500">8 requieren atención urgente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Órdenes de Compra</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">7</div>
            <p className="text-xs text-gray-500">3 en proceso de entrega</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Alertas de Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">15</div>
            <p className="text-xs text-gray-500">Ítems por debajo del mínimo</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Solicitudes Recientes</CardTitle>
            <CardDescription>Últimas solicitudes del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'SOL-0234', solicitante: 'Dr. Juan Pérez', tipo: 'Reactivos', estado: 'Pendiente', area: 'Lab. Química' },
                { id: 'SOL-0233', solicitante: 'Ing. María García', tipo: 'Equipamiento', estado: 'Aprobada', area: 'Lab. Física' },
                { id: 'SOL-0232', solicitante: 'Lic. Carlos López', tipo: 'Consumibles', estado: 'En proceso', area: 'Lab. Biología' },
              ].map((sol) => (
                <div key={sol.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{sol.id}</p>
                    <p className="text-sm text-gray-500">{sol.solicitante} - {sol.area}</p>
                  </div>
                  <Badge variant={sol.estado === 'Pendiente' ? 'outline' : sol.estado === 'Aprobada' ? 'default' : 'secondary'}>
                    {sol.estado}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ítems con Stock Bajo</CardTitle>
            <CardDescription>Requieren reposición inmediata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { nombre: 'Ácido Sulfúrico H2SO4', stock: 5, minimo: 20, unidad: 'L', ubicacion: 'Almacén Central' },
                { nombre: 'Guantes de Látex', stock: 12, minimo: 50, unidad: 'pares', ubicacion: 'Lab. Química' },
                { nombre: 'Pipetas 10ml', stock: 3, minimo: 15, unidad: 'unidades', ubicacion: 'Lab. Biología' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{item.nombre}</p>
                    <p className="text-sm text-gray-500">{item.ubicacion}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">{item.stock} {item.unidad}</p>
                    <p className="text-xs text-gray-500">Min: {item.minimo}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actividad del Sistema</CardTitle>
          <CardDescription>Resumen de operaciones de hoy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Préstamos Realizados</p>
              <p className="text-2xl">8</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Devoluciones</p>
              <p className="text-2xl">12</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Traspasos</p>
              <p className="text-2xl">5</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Nuevas Solicitudes</p>
              <p className="text-2xl">7</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DocenteDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Mis Solicitudes</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">5</div>
            <p className="text-xs text-gray-500">2 pendientes de aprobación</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Préstamos Activos</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">3</div>
            <p className="text-xs text-gray-500">1 próximo a vencer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Devoluciones Pendientes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">1</div>
            <p className="text-xs text-gray-500">Vence en 2 días</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mis Solicitudes Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 'SOL-0234', items: 'Reactivos químicos (5 items)', fecha: '2025-11-03', estado: 'Pendiente' },
              { id: 'SOL-0230', items: 'Equipamiento de laboratorio', fecha: '2025-11-01', estado: 'Aprobada' },
              { id: 'SOL-0228', items: 'Material de bioseguridad', fecha: '2025-10-28', estado: 'Completada' },
            ].map((sol) => (
              <div key={sol.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium">{sol.id}</p>
                  <p className="text-sm text-gray-500">{sol.items} • {sol.fecha}</p>
                </div>
                <Badge variant={sol.estado === 'Pendiente' ? 'outline' : sol.estado === 'Aprobada' ? 'default' : 'secondary'}>
                  {sol.estado}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function EncargadoLabDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Solicitudes por Aprobar</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">8</div>
            <p className="text-xs text-gray-500">De docentes del área</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Stock del Laboratorio</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">324</div>
            <p className="text-xs text-gray-500">Ítems disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Alertas de Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">6</div>
            <p className="text-xs text-gray-500">Requieren reposición</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Préstamos Activos</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">15</div>
            <p className="text-xs text-gray-500">2 vencen hoy</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Solicitudes Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'SOL-0234', docente: 'Dr. Juan Pérez', asignatura: 'Química Orgánica', items: 5 },
                { id: 'SOL-0231', docente: 'Dra. Ana Martínez', asignatura: 'Química Analítica', items: 3 },
                { id: 'SOL-0229', docente: 'Lic. Pedro Rojas', asignatura: 'Bioquímica', items: 8 },
              ].map((sol) => (
                <div key={sol.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{sol.docente}</p>
                    <p className="text-sm text-gray-500">{sol.asignatura} • {sol.items} ítems</p>
                  </div>
                  <Badge variant="outline">Pendiente</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Devoluciones Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { custodio: 'Dr. Juan Pérez', item: 'Microscopio Binocular', vence: '2025-11-04', estado: 'Vence hoy' },
                { custodio: 'Ing. María García', item: 'Balanza Analítica', vence: '2025-11-06', estado: 'Normal' },
              ].map((dev, idx) => (
                <div key={idx} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{dev.custodio}</p>
                    <p className="text-sm text-gray-500">{dev.item} • Vence: {dev.vence}</p>
                  </div>
                  <Badge variant={dev.estado === 'Vence hoy' ? 'destructive' : 'outline'}>
                    {dev.estado}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function EncargadoAlmacenDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Solicitudes de Reposición</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">12</div>
            <p className="text-xs text-gray-500">De laboratorios</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Stock Total</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">1,247</div>
            <p className="text-xs text-gray-500">Ítems en inventario</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Traspasos Pendientes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">5</div>
            <p className="text-xs text-gray-500">Requieren procesamiento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Alertas Críticas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">15</div>
            <p className="text-xs text-gray-500">Stock por debajo del mínimo</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Solicitudes de Reposición Pendientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 'REP-045', laboratorio: 'Lab. Química', items: 8, prioridad: 'Alta' },
              { id: 'REP-044', laboratorio: 'Lab. Física', items: 5, prioridad: 'Media' },
              { id: 'REP-043', laboratorio: 'Lab. Biología', items: 12, prioridad: 'Alta' },
            ].map((rep) => (
              <div key={rep.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium">{rep.id} - {rep.laboratorio}</p>
                  <p className="text-sm text-gray-500">{rep.items} ítems solicitados</p>
                </div>
                <Badge variant={rep.prioridad === 'Alta' ? 'destructive' : 'outline'}>
                  {rep.prioridad}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function EncargadoAdquisicionDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Solicitudes por Aprobar</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">7</div>
            <p className="text-xs text-gray-500">Del almacén central</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Órdenes Activas</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">7</div>
            <p className="text-xs text-gray-500">3 en proceso de entrega</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Proveedores Activos</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">24</div>
            <p className="text-xs text-gray-500">Con órdenes este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Presupuesto del Mes</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">72%</div>
            <p className="text-xs text-gray-500">Bs. 36,000 / Bs. 50,000</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Solicitudes Pendientes de Aprobación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'SOL-0234', origen: 'Almacén Central', items: 8, monto: 'Bs. 4,500' },
                { id: 'SOL-0232', origen: 'Lab. Química', items: 5, monto: 'Bs. 2,300' },
                { id: 'SOL-0230', origen: 'Lab. Física', items: 12, monto: 'Bs. 8,750' },
              ].map((sol) => (
                <div key={sol.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{sol.id}</p>
                    <p className="text-sm text-gray-500">{sol.origen} • {sol.items} ítems</p>
                  </div>
                  <p className="font-medium">{sol.monto}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Órdenes de Compra en Proceso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'OC-0156', proveedor: 'Química del Sur', estado: 'En tránsito', fecha: '2025-11-01' },
                { id: 'OC-0155', proveedor: 'LabEquip SRL', estado: 'Pendiente entrega', fecha: '2025-10-30' },
                { id: 'OC-0154', proveedor: 'BioInsumos', estado: 'En preparación', fecha: '2025-10-28' },
              ].map((oc) => (
                <div key={oc.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{oc.id}</p>
                    <p className="text-sm text-gray-500">{oc.proveedor} • {oc.fecha}</p>
                  </div>
                  <Badge variant="secondary">{oc.estado}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
