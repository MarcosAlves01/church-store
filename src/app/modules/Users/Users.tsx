'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import TableUsers from "./TableUsers";
import ModalFormsUsers from "./ModalFormsUsers";
import { useState } from "react";


export default function Users() {
    const [openRegisterUser, setOpenRegisterUser] = useState(false)
    const [refreshTable, setRefreshTable] = useState(false)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Usuários
                    <div>
                        <Button
                            size={'sm'}
                            onClick={() => setOpenRegisterUser(true)}
                        >
                            <Plus /> Cadastrar
                        </Button>
                    </div>
                </CardTitle>
                <CardDescription>
                    Gerencie os usuários com acesso ao sistema
                </CardDescription>

            </CardHeader>
            <CardContent>
                <TableUsers refreshTable={refreshTable} setRefreshTable={setRefreshTable} />
            </CardContent>
            <ModalFormsUsers
                mode="create"
                open={openRegisterUser}
                onOpenChange={() => setOpenRegisterUser(false)}
                setRefreshTable={setRefreshTable}
            />
        </Card>
    )
}
