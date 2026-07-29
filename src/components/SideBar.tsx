"use client"

import {
    Settings,
    LogOut,
    UsersIcon,
    LucideStore,
    PiggyBankIcon,
} from "lucide-react"
import { usePathname } from "next/navigation"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Separator } from "./ui/separator"

const menuItems = [
    {
        title: "Pessoas",
        icon: UsersIcon,
        href: "/peoples"
    },
    {
        title: "Produtos",
        icon: LucideStore,
        href: "/products"
    },
    {
        title: "Vender",
        icon: PiggyBankIcon,
        href: "/sell"
    }
]

export function AppSidebar() {
    const pathname = usePathname()


    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarContent>
                <SidebarHeader className="p-4">
                    <div className="flex items-center gap-3">
                        <span className="text-lg font-bold">LOJINHA</span>
                    </div>
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarMenu>
                        {menuItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton isActive={pathname === item.href}>
                                    <Link href={item.href}>
                                        <span className="flex items-center gap-2">
                                            <item.icon />
                                            {item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Configurações</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive={pathname === "/configuracoes"}>
                                    <Link href="/configuracoes">
                                        <span className="flex items-center gap-2">
                                            <Settings />
                                            Configurações
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* <Separator />

            <SidebarFooter className="p-4">
                <div className="flex items-center gap-3">
                    <div className="flex flex-1 flex-col text-sm">
                        <span className="font-medium">Marcos Alves</span>
                        <span className="text-xs text-muted-foreground">marcos@email.com</span>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground">
                        <LogOut className="size-4" />
                    </button>
                </div>
            </SidebarFooter> */}
        </Sidebar>
    )
}
