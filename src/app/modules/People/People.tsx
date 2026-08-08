'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import TablePeople from "./TablePeople";
import ModalFormsPeople from "./ModalFormsPeople";
import { useState } from "react";


export default function People() {
    const [openRegisterPeople, setOpenRegisterPeople] = useState(false)
    const [refreshTable, setRefreshTable] = useState(false)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Pessoas
                    <div>
                        <Button 
                            size={'sm'}
                            onClick={() => setOpenRegisterPeople(true)}
                        >
                            <Plus /> Cadastrar
                        </Button>
                    </div>
                </CardTitle>
                <CardDescription>
                    Lista de pessoas que estão no retiro
                </CardDescription>

            </CardHeader>
            <CardContent>
                <TablePeople refreshTable={refreshTable} setRefreshTable={setRefreshTable} />
            </CardContent>
            <ModalFormsPeople 
                mode="create"
                open={openRegisterPeople}
                onOpenChange={() => setOpenRegisterPeople(false)}
                setRefreshTable={setRefreshTable}
            />
        </Card>
    )
}