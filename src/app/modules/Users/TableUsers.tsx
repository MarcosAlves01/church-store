'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PenBoxIcon, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { User } from "./types";
import ModalDeleteUsers from "./ModalDeleteUsers";
import ModalFormsUsers from "./ModalFormsUsers";
import { deleteUsersServices, getUsersServices } from "./Users.services";
import { responseApiRouteType } from "@/lib/types";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

type TableUsersProps = {
    refreshTable: boolean;
    setRefreshTable: (value: boolean) => void;
}

export default function TableUsers({ refreshTable, setRefreshTable }: TableUsersProps) {
    const [users, setUsers] = useState<User[]>([])
    const [search, setSearch] = useState("")
    const [openModalDelete, setOpenModalDelete] = useState<{ id: string; name: string }>({
        id: "",
        name: ""
    })
    const [openModal, setOpenModal] = useState(false)
    const [openModalEditUser, setOpenModalEditUser] = useState(false)
    const [dataEditUser, setDataEditUser] = useState<User>()
    const [loadingGetUsers, setLoadingGetUsers] = useState(true)
    const [loadingDelete, setLoadingDelete] = useState(false)


    async function getUsers() {
        setLoadingGetUsers(true)
        const response: responseApiRouteType = await getUsersServices()
        if (response.request_ok) {
            const data = response.response as User[]
            setUsers(Array.isArray(data) ? data : [])
        }
        setLoadingGetUsers(false)
    }

    function openModalf(user: User) {
        setOpenModalDelete({ id: String(user.id), name: user.nome })
        setOpenModal(true)
    }

    function openModalEditUserf(user: User) {
        setDataEditUser(user)
        setOpenModalEditUser(true)
    }

    async function deleteUser() {
        setLoadingDelete(true)
        const response: responseApiRouteType = await deleteUsersServices(openModalDelete.id.toString())
        if (response.request_ok) {
            toast.success("Usuário deletado com sucesso")
            setOpenModal(false)
            getUsers()
        }
        setLoadingDelete(false)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getUsers()
    }, [])

    useEffect(() => {
        if (refreshTable) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            getUsers()
            setRefreshTable(false)
        }
    }, [refreshTable])

    const filteredUsers = users.filter((user) =>
        user.nome.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    )

    if (loadingGetUsers) {
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
                    placeholder="Procure por nome ou email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button>
                    <Search /> Buscar
                </Button>
            </div>
            <div className="border rounded-lg p-2 ">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                                    Não há usuários para exibir
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.nome}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2 items-center">
                                            <Button
                                                size={'lg'}
                                                onClick={() => openModalEditUserf(user)}
                                            >
                                                <PenBoxIcon />
                                            </Button>
                                            <Button
                                                variant={'destructive'}
                                                size={'lg'}
                                                onClick={() => openModalf(user)}
                                            >
                                                <Trash2 />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <ModalDeleteUsers
                onOpenChange={() => setOpenModal(false)}
                open={openModal}
                userName={openModalDelete.name}
                onChange={deleteUser}
                loading={loadingDelete}
            />
            <ModalFormsUsers
                mode="edit"
                open={openModalEditUser}
                onOpenChange={() => setOpenModalEditUser(false)}
                user={dataEditUser}
                setRefreshTable={setRefreshTable}
            />
        </div>
    )
}
