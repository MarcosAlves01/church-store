'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, PenBoxIcon, Search, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { People } from "./types";
import ModalDeletePeople from "./ModalDeletePeople";
import ModalFormsPeople from "./ModalFormsPeople";
import { deletePeopleServices, getPeopleServices } from "./People.services";
import { responseApiRouteType } from "@/lib/types";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

type TablePeopleProps = {
    refreshTable: boolean;
    setRefreshTable: (value: boolean) => void;
}

export default function TablePeople({ refreshTable, setRefreshTable }: TablePeopleProps) {
    const [people, setPeople] = useState<People[]>([])
    const [search, setSearch] = useState("")
    const [openModalDelete, setOpenModalDelete] = useState<{ id: string; name: string }>({
        id: "",
        name: ""
    })
    const [openModal, setOpenModal] = useState(false)
    const [openModalEditPeople, setOpenModalEditPeople] = useState(false)
    const [dataEditPeople, setDataEditPeople] = useState<People>()
    const [loadingGetPeoples, setLoadingGetPeoples] = useState(false)


    async function getPeople() {
        setLoadingGetPeoples(true)
        const response: responseApiRouteType = await getPeopleServices()
        if (response.request_ok) {
            setPeople(response.response as People[])
        }
        setLoadingGetPeoples(false)
    }

    function openModalf(person: People) {
        setOpenModalDelete({ id: person.id, name: person.nome })
        setOpenModal(true)
    }

    function openModalEditPeoplef(person: People) {
        setDataEditPeople(person)
        setOpenModalEditPeople(true)
    }

    async function deletePerson() {
        const response: responseApiRouteType = await deletePeopleServices(openModalDelete.id.toString())
        if (response.request_ok) {
            toast.success("Pessoa deletada com sucesso")
            setOpenModal(false)
            getPeople()
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getPeople()
    }, [])

    useEffect(() => {
        if (refreshTable) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            getPeople()
            setRefreshTable(false)
        }
    }, [refreshTable])

    const filteredPeople = people.filter((person) =>
        person.nome.toLowerCase().includes(search.toLowerCase())
    )

    if (loadingGetPeoples) {
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
                    placeholder="Procure uma pessoa..."
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
                            <TableHead>Número</TableHead>
                            <TableHead>Pago</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPeople.map((person) => (
                            <TableRow key={person.id}>
                                <TableCell>{person.nome}</TableCell>
                                <TableCell>{person.telefone}</TableCell>
                                <TableCell>
                                    {person.pago ? (
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-500">
                                            <Check className="size-3.5" />
                                            Pago
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-500">
                                            <X className="size-3.5" />
                                            Pendente
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2 items-center">
                                        <Button
                                            size={'lg'}
                                            onClick={() => openModalEditPeoplef(person)}
                                        >
                                            <PenBoxIcon />
                                        </Button>
                                        <Button
                                            variant={'destructive'}
                                            size={'lg'}
                                            onClick={() => openModalf(person)}
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
            <ModalDeletePeople
                onOpenChange={() => setOpenModal(false)}
                open={openModal}
                personName={openModalDelete.name}
                onChange={deletePerson}
            />
            <ModalFormsPeople
                mode="edit"
                open={openModalEditPeople}
                onOpenChange={() => setOpenModalEditPeople(false)}
                people={dataEditPeople}
                setRefreshTable={setRefreshTable}
            />
        </div>
    )
}
