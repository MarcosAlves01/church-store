'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, Users, UserCheck, Package, PackageCheck, ShoppingCart, Receipt, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SummaryData } from "./types";
import { getSummaryServices } from "./Summary.services";
import { responseApiRouteType } from "@/lib/types";

function formatPrice(total: number) {
    return (total / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}

type SummaryCard = {
    label: string;
    value: string;
    icon: React.ElementType;
    iconClassName: string;
}

type StatusFilter = "todos" | "pagos" | "pendentes"

export default function Summary() {
    const [summary, setSummary] = useState<SummaryData | null>(null)
    const [loadingSummary, setLoadingSummary] = useState(true)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos")


    async function getSummary() {
        setLoadingSummary(true)
        const response: responseApiRouteType = await getSummaryServices()
        if (response.request_ok) {
            setSummary(response.response as SummaryData)
        }
        setLoadingSummary(false)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getSummary()
    }, [])

    const cards: SummaryCard[] = summary ? [
        {
            label: "Faturamento total",
            value: formatPrice(summary.faturamentoTotal),
            icon: Wallet,
            iconClassName: "bg-primary/10 text-primary"
        },
        {
            label: "Valor médio por venda",
            value: formatPrice(summary.valorMedioPorVenda),
            icon: Receipt,
            iconClassName: "bg-blue-500/10 text-blue-500"
        },
        {
            label: "Total de vendas",
            value: String(summary.totalVendas),
            icon: ShoppingCart,
            iconClassName: "bg-violet-500/10 text-violet-500"
        },
        {
            label: "Total de pessoas",
            value: String(summary.totalPessoas),
            icon: Users,
            iconClassName: "bg-amber-500/10 text-amber-500"
        },
        {
            label: "Pessoas pagas",
            value: String(summary.pessoasPagas),
            icon: UserCheck,
            iconClassName: "bg-green-500/10 text-green-500"
        },
        {
            label: "Total de produtos",
            value: String(summary.totalProdutos),
            icon: Package,
            iconClassName: "bg-cyan-500/10 text-cyan-500"
        },
        {
            label: "Produtos ativos",
            value: String(summary.produtosAtivos),
            icon: PackageCheck,
            iconClassName: "bg-emerald-500/10 text-emerald-500"
        }
    ] : []

    const filteredPessoas = summary?.pessoasComVendas
        .filter((pessoa) => pessoa.nome.toLowerCase().includes(search.toLowerCase()))
        .filter((pessoa) => {
            if (statusFilter === "pagos") return pessoa.pago
            if (statusFilter === "pendentes") return !pessoa.pago
            return true
        }) || []

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Resumo</CardTitle>
                    <CardDescription>
                        Visão geral de vendas, pessoas e produtos
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loadingSummary ? (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="flex items-center gap-3 rounded-lg border p-4">
                                    <Skeleton className="size-10 rounded-full" />
                                    <div className="flex flex-col gap-2">
                                        <Skeleton className="h-3 w-24" />
                                        <Skeleton className="h-6 w-20" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : summary ? (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {cards.map((card) => (
                                <div key={card.label} className="flex items-center gap-3 rounded-lg border p-4">
                                    <div className={`flex size-10 items-center justify-center rounded-full ${card.iconClassName}`}>
                                        <card.icon className="size-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground">{card.label}</span>
                                        <span className="text-xl font-semibold">{card.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center rounded-lg border border-dashed p-8 text-sm text-muted-foreground">
                            Não há dados para exibir
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Resumo - Pessoas</CardTitle>
                    <CardDescription>
                        Total gasto por pessoa e status de pagamento
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <Input
                            className="sm:max-w-[40%]"
                            placeholder="Procure uma pessoa..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant={statusFilter === "todos" ? "default" : "outline"}
                                onClick={() => setStatusFilter("todos")}
                            >
                                Todos
                            </Button>
                            <Button
                                size="sm"
                                variant={statusFilter === "pagos" ? "default" : "outline"}
                                onClick={() => setStatusFilter("pagos")}
                            >
                                Pagos
                            </Button>
                            <Button
                                size="sm"
                                variant={statusFilter === "pendentes" ? "default" : "outline"}
                                onClick={() => setStatusFilter("pendentes")}
                            >
                                Pendentes
                            </Button>
                        </div>
                    </div>

                    {loadingSummary ? (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="flex flex-col gap-3 rounded-lg border p-4">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="size-10 rounded-full" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                    <Skeleton className="h-7 w-28" />
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                </div>
                            ))}
                        </div>
                    ) : summary && filteredPessoas.length > 0 ? (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredPessoas.map((pessoa) => (
                                <div
                                    key={pessoa.id}
                                    className={`flex flex-col gap-3 rounded-lg border border-l-4 p-4 ${pessoa.pago ? "border-l-green-500" : "border-l-red-500"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-semibold uppercase">
                                            {pessoa.nome.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{pessoa.nome}</span>
                                            <span className="text-xs text-muted-foreground">{pessoa.telefone}</span>
                                        </div>
                                    </div>
                                    <span className="text-2xl font-bold">{formatPrice(pessoa.totalGasto)}</span>
                                    {pessoa.pago ? (
                                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-500">
                                            <Check className="size-3.5" />
                                            Pago
                                        </span>
                                    ) : (
                                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-500">
                                            <X className="size-3.5" />
                                            Pendente
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center rounded-lg border border-dashed p-8 text-sm text-muted-foreground">
                            Nenhuma pessoa com vendas encontrada
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
