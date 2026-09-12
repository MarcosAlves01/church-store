'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TableProducts from "./TableProducts";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ModalFormsProducts from "./ModalFormsProducts";
import { useState } from "react";


export default function Product() {
    const [openRegisterProduct, setOpenRegisterProduct] = useState(false)
    const [refreshTable, setRefreshTable] = useState(false)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Produtos
                    <div>
                        <Button
                            size={'sm'}
                            onClick={() => setOpenRegisterProduct(true)}
                        >
                            <Plus /> Cadastrar
                        </Button>
                    </div>
                </CardTitle>
                <CardDescription>
                    Lista de produtos à venda
                </CardDescription>
            </CardHeader>
            <CardContent>
                <TableProducts refreshTable={refreshTable} setRefreshTable={setRefreshTable} />
            </CardContent>
            <ModalFormsProducts
                mode="create"
                open={openRegisterProduct}
                onOpenChange={() => setOpenRegisterProduct(false)}
                setRefreshTable={setRefreshTable}
            />
        </Card>
    )
}