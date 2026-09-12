'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TableSales from "./TableSales";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ModalFormsSales from "./ModalFormsSales";
import { useState } from "react";


export default function Sales() {
    const [openRegisterSale, setOpenRegisterSale] = useState(false)
    const [refreshTable, setRefreshTable] = useState(false)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Vendas
                    <div>
                        <Button
                            size={'sm'}
                            onClick={() => setOpenRegisterSale(true)}
                        >
                            <Plus /> Registrar
                        </Button>
                    </div>
                </CardTitle>
                <CardDescription>
                    Lista de vendas registradas
                </CardDescription>
            </CardHeader>
            <CardContent>
                <TableSales refreshTable={refreshTable} setRefreshTable={setRefreshTable} />
            </CardContent>
            <ModalFormsSales
                open={openRegisterSale}
                onOpenChange={() => setOpenRegisterSale(false)}
                setRefreshTable={setRefreshTable}
            />
        </Card>
    )
}
