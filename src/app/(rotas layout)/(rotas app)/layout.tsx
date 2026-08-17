import { AppSidebar } from "@/components/SideBar";
import { ModeToggle } from "@/components/theme/ToggleMode";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Separator } from "@/components/ui/separator";


export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center justify-between gap-2 border-b px-4">
          <SidebarTrigger />
          <ModeToggle />
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


