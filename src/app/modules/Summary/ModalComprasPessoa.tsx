import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Check, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { PessoaComVendas, Sale } from "./types";
import { updatePersonStatusServices } from "./Summary.services";
import { responseApiRouteType } from "@/lib/types";
import { toast } from "sonner";

function formatPrice(total: number) {
    return (total / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}

type ModalComprasPessoaProps = {
    open: boolean;
    onOpenChange: () => void;
    pessoa: PessoaComVendas | null;
    sales: Sale[];
    onStatusChanged: () => void;
}

export default function ModalComprasPessoa({ open, onOpenChange, pessoa, sales, onStatusChanged }: ModalComprasPessoaProps) {
    const [loadingStatus, setLoadingStatus] = useState(false)

    if (!pessoa) return null

    const comprasDaPessoa = sales.filter((sale) => sale.pessoaId === pessoa.id)

    async function handleToggleStatus() {
        if (!pessoa) return
        setLoadingStatus(true)
        const response: responseApiRouteType = await updatePersonStatusServices(
            String(pessoa.id),
            pessoa.nome,
            pessoa.telefone || "",
            !pessoa.pago
        )
        if (response.request_ok) {
            toast.success(
                !pessoa.pago
                    ? "Pessoa marcada como paga"
                    : "Pessoa marcada como pendente"
            )
            onStatusChanged()
            onOpenChange()
        } else {
            toast.error("Não foi possível atualizar o status")
        }
        setLoadingStatus(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{pessoa.nome}</DialogTitle>
                    <DialogDescription>
                        {pessoa.telefone || "Sem telefone"}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                        <span className="text-sm text-muted-foreground">Total gasto</span>
                        <span className="text-lg font-semibold">{formatPrice(pessoa.totalGasto)}</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium">Compras</span>
                        {comprasDaPessoa.length > 0 ? (
                            <div className="flex max-h-64 flex-col gap-2 overflow-y-auto">
                                {comprasDaPessoa.map((sale) => (
                                    <div
                                        key={sale.id}
                                        className="flex items-center justify-between rounded-lg border p-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                <ShoppingCart className="size-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{sale.produto.nome}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {sale.quantidade}x {formatPrice(sale.precoNaHora)}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold">
                                            {formatPrice(sale.precoNaHora * sale.quantidade)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                                Nenhuma compra registrada
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3">
                        <span className="text-sm text-muted-foreground">Status</span>
                        {pessoa.pago ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-500">
                                <Check className="size-3.5" />
                                Pago
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-500">
                                <X className="size-3.5" />
                                Pendente
                            </span>
                        )}
                    </div>

                    <Button
                        onClick={handleToggleStatus}
                        disabled={loadingStatus}
                        variant={pessoa.pago ? "outline" : "default"}
                    >
                        {loadingStatus ? (
                            <Spinner />
                        ) : pessoa.pago ? (
                            "Marcar como pendente"
                        ) : (
                            "Marcar como pago"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
