import { AppSidebar } from "@/components/SideBar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Separator } from "@base-ui/react/separator";


export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <main className="p-2">
          <Separator />
          {children}
        </main>
        <Toaster richColors theme="light" position="top-center" />
      </SidebarInset>
    </SidebarProvider>
  );
}


