'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet, Users, UserCheck, Package, PackageCheck, ShoppingCart, Receipt } from "lucide-react";
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

export default function Summary() {
    const [summary, setSummary] = useState<SummaryData | null>(null)
    const [loadingSummary, setLoadingSummary] = useState(true)


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

    return (
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
    )
}
