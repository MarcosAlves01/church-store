import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Products } from "./types";
import { useEffect, useState } from "react";
import { createProductsServices, updateProductsServices } from "./Products.services";
import { responseApiRouteType } from "@/lib/types";
import { toast } from "sonner";


type FormsProducts = {
    mode: "edit" | "create";
    open: boolean;
    onOpenChange: () => void
    product?: Products
    setRefreshTable: (refresh: boolean) => void
}

export default function ModalFormsProducts({ mode, open, onOpenChange, product, setRefreshTable }: FormsProducts) {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [active, setActive] = useState(true)


    async function handleFormsProducts() {
        let response: responseApiRouteType
        if (!name || !price) {
            toast.error("Preencha todos os campos")
            return
        }

        const priceInCents = Math.round(Number(price.replace(",", ".")) * 100)
        if (!Number.isInteger(priceInCents) || priceInCents < 1) {
            toast.error("Informe um preço válido")
            return
        }

        if (mode === 'create') {
            response = await createProductsServices(name, priceInCents)
            if (response.request_ok) {
                toast.success("Produto cadastrado com sucesso")
                setRefreshTable(true)
                onOpenChange()
            }
        }
        if (mode === 'edit') {
            response = await updateProductsServices(product?.id || "", name, priceInCents, active)
            if (response.request_ok) {
                toast.success("Produto atualizado com sucesso")
                setRefreshTable(true)
                onOpenChange()
            }
        }
    }

    useEffect(() => {
        if (!open) return

        if (mode === "edit" && product) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setName(product.nome)
            setPrice((product.preco / 100).toFixed(2).replace(".", ","))
            setActive(product.ativo)
        }

        if (mode === "create") {
            setName("")
            setPrice("")
            setActive(true)
        }
    }, [open, mode, product])


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{mode === "create" ? "Cadastrar novo produto" : "Editar dados"}</DialogTitle>
                    <DialogDescription>
                        {mode === "create" ? "Informe os dados" : "Edite os dados"}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex flex-col gap-2 w-full">
                        <Label>Nome</Label>
                        <Input
                            placeholder="Digite o nome..."
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <Label>Preço (R$)</Label>
                        <Input
                            placeholder="0,00"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        {mode === "edit" && (
                            <div className="flex items-center gap-2 mt-1">
                                <Switch
                                    checked={active}
                                    onCheckedChange={setActive}
                                />
                                <Label>Ativo</Label>
                            </div>
                        )}

                        <Button
                            onClick={handleFormsProducts}
                        >
                            {mode === 'create' ? "Cadastrar" : "Editar"}
                        </Button>
                        <Button
                            variant={'outline'}
                            onClick={onOpenChange}
                        >
                            Cancelar
                        </Button>

                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
