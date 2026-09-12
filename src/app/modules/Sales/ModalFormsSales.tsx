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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { createSalesServices } from "./Sales.services";
import { getPeopleServices } from "../People/People.services";
import { getProductsServices } from "../Products/Products.services";
import { SalePerson, SaleProduct } from "./types";
import { responseApiRouteType } from "@/lib/types";
import { toast } from "sonner";


type FormsSales = {
    open: boolean;
    onOpenChange: () => void
    setRefreshTable: (refresh: boolean) => void
}

export default function ModalFormsSales({ open, onOpenChange, setRefreshTable }: FormsSales) {
    const [people, setPeople] = useState<SalePerson[]>([])
    const [products, setProducts] = useState<SaleProduct[]>([])
    const [personId, setPersonId] = useState<string | null>(null)
    const [productId, setProductId] = useState<string | null>(null)
    const [quantity, setQuantity] = useState("1")


    async function loadOptions() {
        const peopleResponse: responseApiRouteType = await getPeopleServices()
        if (peopleResponse.request_ok) {
            setPeople(peopleResponse.response as SalePerson[])
        }

        const productsResponse: responseApiRouteType = await getProductsServices()
        if (productsResponse.request_ok) {
            setProducts(productsResponse.response as SaleProduct[])
        }
    }

    async function handleFormsSales() {
        if (!personId || !productId) {
            toast.error("Selecione a pessoa e o produto")
            return
        }

        const quantityNumber = Number(quantity)
        if (!Number.isInteger(quantityNumber) || quantityNumber < 1) {
            toast.error("Informe uma quantidade válida")
            return
        }

        const response: responseApiRouteType = await createSalesServices(personId, productId, quantityNumber)
        if (response.request_ok) {
            toast.success("Venda registrada com sucesso")
            setRefreshTable(true)
            onOpenChange()
        }
    }

    useEffect(() => {
        if (!open) return

        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadOptions()
        setPersonId(null)
        setProductId(null)
        setQuantity("1")
    }, [open])


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Registrar nova venda</DialogTitle>
                    <DialogDescription>
                        Informe os dados
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2 w-full">
                    <Label>Pessoa</Label>
                    <Select value={personId} onValueChange={setPersonId}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione uma pessoa...">
                                {(value) => people.find((person) => person.id === value)?.nome}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {people.map((person) => (
                                <SelectItem key={person.id} value={person.id}>
                                    {person.nome}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Label>Produto</Label>
                    <Select value={productId} onValueChange={setProductId}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um produto...">
                                {(value) => products.find((product) => product.id === value)?.nome}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {products.map((product) => (
                                <SelectItem key={product.id} value={product.id}>
                                    {product.nome}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Label>Quantidade</Label>
                    <Input
                        type="number"
                        min={1}
                        placeholder="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button
                        variant={'outline'}
                        onClick={onOpenChange}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleFormsSales}
                    >
                        Registrar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
