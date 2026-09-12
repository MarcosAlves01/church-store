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
import { Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Sale } from "./types";
import ModalDeleteSales from "./ModalDeleteSales";
import { deleteSalesServices, getSalesServices } from "./Sales.services";
import { responseApiRouteType } from "@/lib/types";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

type TableSalesProps = {
    refreshTable: boolean;
    setRefreshTable: (value: boolean) => void;
}

function formatPrice(price: number) {
    return (price / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}

export default function TableSales({ refreshTable, setRefreshTable }: TableSalesProps) {
    const [sales, setSales] = useState<Sale[]>([])
    const [search, setSearch] = useState("")
    const [openModalDelete, setOpenModalDelete] = useState<{ id: string; name: string }>({
        id: "",
        name: ""
    })
    const [openModal, setOpenModal] = useState(false)
    const [loadingGetSales, setLoadingGetSales] = useState(false)


    async function getSales() {
        setLoadingGetSales(true)
        const response: responseApiRouteType = await getSalesServices()
        if (response.request_ok) {
            setSales(response.response as Sale[])
        }
        setLoadingGetSales(false)
    }

    function openModalf(sale: Sale) {
        setOpenModalDelete({ id: sale.id, name: `${sale.pessoa.nome} - ${sale.produto.nome}` })
        setOpenModal(true)
    }

    async function deleteSale() {
        const response: responseApiRouteType = await deleteSalesServices(openModalDelete.id.toString())
        if (response.request_ok) {
            toast.success("Venda deletada com sucesso")
            setOpenModal(false)
            getSales()
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getSales()
    }, [])

    useEffect(() => {
        if (refreshTable) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            getSales()
            setRefreshTable(false)
        }
    }, [refreshTable])

    const filteredSales = sales.filter((sale) =>
        sale.pessoa.nome.toLowerCase().includes(search.toLowerCase()) ||
        sale.produto.nome.toLowerCase().includes(search.toLowerCase())
    )

    if (loadingGetSales) {
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
                    placeholder="Procure por pessoa ou produto..."
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
                            <TableHead>Pessoa</TableHead>
                            <TableHead>Produto</TableHead>
                            <TableHead>Qtd</TableHead>
                            <TableHead>Preço unit.</TableHead>
                            <TableHead>Subtotal</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSales.map((sale) => (
                            <TableRow key={sale.id}>
                                <TableCell>{sale.pessoa.nome}</TableCell>
                                <TableCell>{sale.produto.nome}</TableCell>
                                <TableCell>{sale.quantidade}</TableCell>
                                <TableCell>{formatPrice(sale.precoNaHora)}</TableCell>
                                <TableCell>{formatPrice(sale.precoNaHora * sale.quantidade)}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2 items-center">
                                        <Button
                                            variant={'destructive'}
                                            size={'lg'}
                                            onClick={() => openModalf(sale)}
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
            <ModalDeleteSales
                onOpenChange={() => setOpenModal(false)}
                open={openModal}
                saleName={openModalDelete.name}
                onChange={deleteSale}
            />
        </div>
    )
}
