"use client"

import {
    Settings,
    LogOut,
    UsersIcon,
    LucideStore,
    PiggyBankIcon,
    ClipboardListIcon,
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
    useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/app/modules/Auth/AuthContext"
import { Skeleton } from "@/components/ui/skeleton"

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
    },
    {
        title: "Resumo",
        icon: ClipboardListIcon,
        href: "/summary"
    }
]

export function AppSidebar() {
    const pathname = usePathname()
    const { state } = useSidebar()
    const isCollapsed = state === "collapsed"
    const { usuario, loading, logout } = useAuth()


    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarContent>
                <SidebarHeader className="p-4">
                    <div className={`flex items-center gap-3 ${isCollapsed && "justify-center"}`}>
                        {isCollapsed ? (
                            <span className="flex size-8 p-6 items-center justify-center rounded-lg bg-primary text-md font-bold text-primary-foreground">
                                EGA
                            </span>
                        ) : (
                            <span className="text-lg font-bold">LOJINHA - EGA</span>
                        )}
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

            {!isCollapsed && (
                <>
                    <Separator />
                    <SidebarFooter className="p-4">
                        <div className="flex items-center gap-3">
                            {loading ? (
                                <div className="flex flex-1 flex-col gap-1">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            ) : (
                                <div className="flex flex-1 flex-col text-sm overflow-hidden">
                                    <span className="font-medium truncate">{usuario?.nome ?? "—"}</span>
                                    <span className="text-xs text-muted-foreground truncate">{usuario?.email ?? ""}</span>
                                </div>
                            )}
                            <button
                                onClick={logout}
                                className="text-muted-foreground hover:text-foreground cursor-pointer"
                                aria-label="Sair"
                            >
                                <LogOut className="size-4" />
                            </button>
                        </div>
                    </SidebarFooter>
                </>
            )}
        </Sidebar>
    )
}
