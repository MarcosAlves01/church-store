'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PenBoxIcon, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { People } from "./types";
import ModalDeletePeople from "./ModalDeletePeople";
import ModalFormsPeople from "./ModalFormsPeople";


const data: People[] =
    [
        {
            "id": 1,
            "name": "Marcos Alves",
            "number": "(14) 99745-0952"
        },
        {
            "id": 2,
            "name": "Maria Julia Mattos",
            "number": "(14) 99765-1267"
        },
        {
            "id": 3,
            "name": "Pedro Mancuso",
            "number": "(14) 99778-3356"
        },
        {
            "id": 4,
            "name": "Maikhel Perez",
            "number": "(14) 99744-4040"
        },
        {
            "id": 5,
            "name": "Edy Carlos",
            "number": "(14) 99722-1329"
        },
        {
            "id": 6,
            "name": "Rafael Ribeiro Castro",
            "number": "(14) 99734-0999"
        },
        {
            "id": 7,
            "name": "Eloísa Santos",
            "number": "(14) 99745-0332"
        }
    ]


export default function TablePeople() {
    const [people, setPeople] = useState<People[]>([])
    const [openModalDelete, setOpenModalDelete] = useState({
        id: 0,
        name: ""
    })
    const [openModal, setOpenModal] = useState(false)
    const [openModalEditPeople, setOpenModalEditPeople] = useState(false)
    const [dataEditPeople, setDataEditPeople] = useState<People>()



    async function getPeople() {
        setPeople(data)
    }

    function openModalf(person: People) {
        setOpenModalDelete(person)
        setOpenModal(true)
    }

    function openModalEditPeoplef(person: People) {
        setDataEditPeople(person)
        setOpenModalEditPeople(true)
    }

    async function deletePerson() {
        console.log("deletando pessoa com id: ", openModalDelete.id)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getPeople()
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 sm:max-w-[40%]">
                <Input
                    placeholder="Procure uma pessoa..."
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
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {people.map((person) => (
                            <TableRow key={person.id}>
                                <TableCell>{person.name}</TableCell>
                                <TableCell>{person.number}</TableCell>
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
            />
        </div>
    )
}