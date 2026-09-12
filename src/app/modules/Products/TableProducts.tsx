'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { PenBoxIcon, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Products } from "./types";
import ModalDeleteProducts from "./ModalDeleteProducts";
import ModalFormsProducts from "./ModalFormsProducts";
import { deleteProductsServices, getProductsServices } from "./Products.services";
import { responseApiRouteType } from "@/lib/types";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

type TableProductsProps = {
    refreshTable: boolean;
    setRefreshTable: (value: boolean) => void;
}

function formatPrice(preco: number) {
    return (preco / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}

export default function TableProducts({ refreshTable, setRefreshTable }: TableProductsProps) {
    const [products, setProducts] = useState<Products[]>([])
    const [search, setSearch] = useState("")
    const [openModalDelete, setOpenModalDelete] = useState<{ id: string; name: string }>({
        id: "",
        name: ""
    })
    const [openModal, setOpenModal] = useState(false)
    const [openModalEditProduct, setOpenModalEditProduct] = useState(false)
    const [dataEditProduct, setDataEditProduct] = useState<Products>()
    const [loadingGetProducts, setLoadingGetProducts] = useState(false)


    async function getProducts() {
        setLoadingGetProducts(true)
        const response: responseApiRouteType = await getProductsServices()
        if (response.request_ok) {
            setProducts(response.response as Products[])
        }
        setLoadingGetProducts(false)
    }

    function openModalf(product: Products) {
        setOpenModalDelete({ id: product.id, name: product.nome })
        setOpenModal(true)
    }

    function openModalEditProductf(product: Products) {
        setDataEditProduct(product)
        setOpenModalEditProduct(true)
    }

    async function deleteProduct() {
        const response: responseApiRouteType = await deleteProductsServices(openModalDelete.id.toString())
        if (response.request_ok) {
            toast.success("Produto deletado com sucesso")
            setOpenModal(false)
            getProducts()
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getProducts()
    }, [])

    useEffect(() => {
        if (refreshTable) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            getProducts()
            setRefreshTable(false)
        }
    }, [refreshTable])

    const filteredProducts = products.filter((product) =>
        product.nome.toLowerCase().includes(search.toLowerCase())
    )

    if (loadingGetProducts) {
        return (
            <div className="w-full h-60 flex items-center justify-center border rounded-lg p-2">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 sm:max-w-[40%]">
                <Input
                    placeholder="Procure um produto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button>
                    <Search /> Buscar
                </Button>
            </div>
            <div className="border rounded-lg p-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!loadingGetProducts && filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.nome}</TableCell>
                                <TableCell>{formatPrice(product.preco)}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2 items-center">
                                        <Button
                                            size={'lg'}
                                            onClick={() => openModalEditProductf(product)}
                                        >
                                            <PenBoxIcon />
                                        </Button>
                                        <Button
                                            variant={'destructive'}
                                            size={'lg'}
                                            onClick={() => openModalf(product)}
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <ModalDeleteProducts
                onOpenChange={() => setOpenModal(false)}
                open={openModal}
                productName={openModalDelete.name}
                onChange={deleteProduct}
            />
            <ModalFormsProducts
                mode="edit"
                open={openModalEditProduct}
                onOpenChange={() => setOpenModalEditProduct(false)}
                product={dataEditProduct}
                setRefreshTable={setRefreshTable}
            />
        </div>
    )
}
