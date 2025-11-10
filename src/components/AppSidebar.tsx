import { 
  LayoutDashboard, 
  Users, 
  Package, 
  FileText, 
  ShoppingCart, 
  Warehouse, 
  HandHeart, 
  ArrowLeftRight, 
  BarChart3, 
  Settings,
  GraduationCap
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from './ui/sidebar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import type { ViewType, UserRole } from '../App'

interface AppSidebarProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
  userRole: UserRole
  onRoleChange: (role: UserRole) => void
}

const menuItems = [
  { id: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboard, roles: ['superadmin', 'docente', 'encargado_lab', 'encargado_almacen', 'encargado_adquisicion'] },
  { id: 'proveedores' as ViewType, label: 'Proveedores', icon: Users, roles: ['superadmin', 'encargado_adquisicion'] },
  { id: 'items' as ViewType, label: 'Catálogo de Ítems', icon: Package, roles: ['superadmin', 'encargado_lab', 'encargado_almacen', 'encargado_adquisicion'] },
  { id: 'solicitudes' as ViewType, label: 'Solicitudes', icon: FileText, roles: ['superadmin', 'docente', 'encargado_lab', 'encargado_almacen', 'encargado_adquisicion'] },
  { id: 'compras' as ViewType, label: 'Órdenes de Compra', icon: ShoppingCart, roles: ['superadmin', 'encargado_adquisicion', 'encargado_almacen'] },
  { id: 'inventario' as ViewType, label: 'Inventario', icon: Warehouse, roles: ['superadmin', 'encargado_lab', 'encargado_almacen'] },
  { id: 'prestamos' as ViewType, label: 'Préstamos', icon: HandHeart, roles: ['superadmin', 'docente', 'encargado_lab'] },
  { id: 'traspasos' as ViewType, label: 'Traspasos', icon: ArrowLeftRight, roles: ['superadmin', 'encargado_lab', 'encargado_almacen'] },
  { id: 'reportes' as ViewType, label: 'Reportes', icon: BarChart3, roles: ['superadmin', 'encargado_lab', 'encargado_almacen', 'encargado_adquisicion'] },
  { id: 'admin' as ViewType, label: 'Administración', icon: Settings, roles: ['superadmin'] },
]

const roleLabels: Record<UserRole, string> = {
  superadmin: 'Super Administrador',
  docente: 'Docente',
  encargado_lab: 'Encargado de Laboratorio',
  encargado_almacen: 'Encargado de Almacén',
  encargado_adquisicion: 'Encargado de Adquisición'
}

export function AppSidebar({ currentView, onViewChange, userRole, onRoleChange }: AppSidebarProps) {
  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole))

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-semibold">UNITEPC</h2>
            <p className="text-xs text-gray-500">Control de Inventarios</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={currentView === item.id}
                    onClick={() => onViewChange(item.id)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="space-y-2">
          <label className="text-xs text-gray-500">Cambiar vista como:</label>
          <Select value={userRole} onValueChange={(value) => onRoleChange(value as UserRole)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(roleLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
