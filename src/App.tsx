import { useState } from "react";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { DashboardView } from "./components/DashboardView";
import { ProveedoresView } from "./components/ProveedoresView";
import { ItemsView } from "./components/ItemsView";
import { SolicitudesView } from "./components/SolicitudesView";
import { ComprasView } from "./components/ComprasView";
import { InventarioView } from "./components/InventarioView";
import { PrestamosView } from "./components/PrestamosView";
import { TraspasosView } from "./components/TraspasosView";
import { ReportesView } from "./components/ReportesView";
import { AdminView } from "./components/AdminView";

export type ViewType =
  | "dashboard"
  | "proveedores"
  | "items"
  | "solicitudes"
  | "compras"
  | "inventario"
  | "prestamos"
  | "traspasos"
  | "reportes"
  | "admin";

export type UserRole =
  | "superadmin"
  | "docente"
  | "encargado_lab"
  | "encargado_almacen"
  | "encargado_adquisicion";

export default function App() {
  const [currentView, setCurrentView] =
    useState<ViewType>("dashboard");
  const [userRole, setUserRole] =
    useState<UserRole>("superadmin");

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView userRole={userRole} />;
      case "proveedores":
        return <ProveedoresView />;
      case "items":
        return <ItemsView />;
      case "solicitudes":
        return <SolicitudesView userRole={userRole} />;
      case "compras":
        return <ComprasView />;
      case "inventario":
        return <InventarioView />;
      case "prestamos":
        return <PrestamosView userRole={userRole} />;
      case "traspasos":
        return <TraspasosView />;
      case "reportes":
        return <ReportesView />;
      case "admin":
        return <AdminView />;
      default:
        return <DashboardView userRole={userRole} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          userRole={userRole}
          onRoleChange={setUserRole}
        />
        <main className="flex-1 overflow-auto bg-gray-50">
          {renderView()}
        </main>
      </div>
    </SidebarProvider>
  );
}