'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, X, Wallet, Users, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { StatusFilter, SummaryItem } from "./types";
import { getSummaryServices } from "./Summary.services";
import { responseApiRouteType } from "@/lib/types";

function formatPrice(total: number) {
    return (total / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}

export default function Summary() {
    const [summary, setSummary] = useState<SummaryItem[]>([])
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos")
    const [loadingSummary, setLoadingSummary] = useState(false)


    async function getSummary() {
        setLoadingSummary(true)
        const response: responseApiRouteType = await getSummaryServices()
        if (response.request_ok) {
            setSummary(response.response as SummaryItem[])
        }
        setLoadingSummary(false)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getSummary()
    }, [])

    const totalGeral = summary.reduce((acc, item) => acc + item.total, 0)
    const totalPagos = summary.filter((item) => item.pago).length
    const totalPendentes = summary.filter((item) => !item.pago).length

    const filteredSummary = summary
        .filter((item) => item.nome.toLowerCase().includes(search.toLowerCase()))
        .filter((item) => {
            if (statusFilter === "pagos") return item.pago
            if (statusFilter === "pendentes") return !item.pago
            return true
        })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Resumo</CardTitle>
                <CardDescription>
                    Total gasto por pessoa e status de pagamento
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="flex items-center gap-3 rounded-lg border p-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Wallet className="size-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Total geral</span>
                            <span className="text-lg font-semibold">{formatPrice(totalGeral)}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border p-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                            <Users className="size-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Pagos</span>
                            <span className="text-lg font-semibold">{totalPagos}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border p-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                            <Clock className="size-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Pendentes</span>
                            <span className="text-lg font-semibold">{totalPendentes}</span>
                        </div>
                    </div>
                </div>

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
                ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredSummary.map((item) => (
                            <div
                                key={item.pessoaId}
                                className={`flex flex-col gap-3 rounded-lg border border-l-4 p-4 ${item.pago ? "border-l-green-500" : "border-l-red-500"}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-semibold uppercase">
                                        {item.nome.charAt(0)}
                                    </div>
                                    <span className="font-medium">{item.nome}</span>
                                </div>
                                <span className="text-2xl font-bold">{formatPrice(item.total)}</span>
                                {item.pago ? (
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
                )}

                {!loadingSummary && filteredSummary.length === 0 && (
                    <div className="flex items-center justify-center rounded-lg border border-dashed p-8 text-sm text-muted-foreground">
                        Nenhuma pessoa encontrada
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
