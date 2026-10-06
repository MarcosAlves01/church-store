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
import { Minus, Plus } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
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
    const [price, setPrice] = useState("")
    const [loadingForms, setLoadingForms] = useState(false)


    async function loadOptions() {
        const peopleResponse: responseApiRouteType = await getPeopleServices()
        if (peopleResponse.request_ok) {
            const peopleData = peopleResponse.response as SalePerson[]
            setPeople(Array.isArray(peopleData) ? peopleData : [])
        }

        const productsResponse: responseApiRouteType = await getProductsServices()
        if (productsResponse.request_ok) {
            const productsData = productsResponse.response as SaleProduct[]
            const activeProducts = Array.isArray(productsData)
                ? productsData.filter((product) => product.ativo)
                : []
            setProducts(activeProducts)
        }
    }

    function handleSelectProduct(value: string | null) {
        setProductId(value)
        const selectedProduct = products.find((product) => String(product.id) === value)
        if (selectedProduct) {
            setPrice((selectedProduct.preco / 100).toFixed(2))
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

        const priceInCents = Math.round(Number(price.replace(",", ".")) * 100)
        if (!Number.isFinite(priceInCents) || priceInCents <= 0) {
            toast.error("Informe um preço válido")
            return
        }

        setLoadingForms(true)
        const response: responseApiRouteType = await createSalesServices(
            Number(personId),
            Number(productId),
            quantityNumber,
            priceInCents
        )
        if (response.request_ok) {
            toast.success("Venda registrada com sucesso")
            setRefreshTable(true)
            onOpenChange()
        }
        setLoadingForms(false)
    }

    useEffect(() => {
        if (!open) return

        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadOptions()
        setPersonId(null)
        setProductId(null)
        setQuantity("1")
        setPrice("")
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
                                {(value) =>
                                    people.find((person) => String(person.id) === value)?.nome ??
                                    "Selecione uma pessoa..."
                                }
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {people.map((person) => (
                                <SelectItem key={person.id} value={String(person.id)}>
                                    {person.nome}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Label>Produto</Label>
                    <Select value={productId} onValueChange={handleSelectProduct}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um produto...">
                                {(value) =>
                                    products.find((product) => String(product.id) === value)?.nome ??
                                    "Selecione um produto..."
                                }
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {products.map((product) => (
                                <SelectItem key={product.id} value={String(product.id)}>
                                    {product.nome}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Label>Preço</Label>
                    <Input
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="0,00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <Label>Quantidade</Label>
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant={'outline'}
                            size={'icon'}
                            onClick={() => setQuantity((prev) => String(Math.max(1, Number(prev) - 1)))}
                        >
                            <Minus />
                        </Button>
                        <Input
                            type="number"
                            min={1}
                            placeholder="1"
                            className="text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <Button
                            type="button"
                            variant={'outline'}
                            size={'icon'}
                            onClick={() => setQuantity((prev) => String(Number(prev) + 1))}
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant={'outline'}
                        onClick={onOpenChange}
                        disabled={loadingForms}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleFormsSales}
                        disabled={loadingForms}
                    >
                        {loadingForms ? <Spinner /> : "Registrar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
