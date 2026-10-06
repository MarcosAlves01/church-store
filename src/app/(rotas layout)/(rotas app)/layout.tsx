import { AppSidebar } from "@/components/SideBar";
import { ModeToggle } from "@/components/theme/ToggleMode";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/app/modules/Auth/AuthContext";


export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex items-center justify-between gap-2 border-b px-4">
            <SidebarTrigger />
            <ModeToggle />
          </header>
          <main className="p-2">
            {children}
          </main>
          <Toaster richColors theme="light" position="top-center" />
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}


