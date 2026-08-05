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
import { People } from "./types";
import { useEffect, useState } from "react";


type FormsPeople = {
    mode: "edit" | "create";
    open: boolean;
    onOpenChange: () => void
    people?: People
}

export default function ModalFormsPeople({ mode, open, onOpenChange, people }: FormsPeople) {
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")


    async function handleFormsPeople() {
        if (!name || !number) {
            alert("Preencha todos os campos")
        }
        if (mode === 'create') console.log("Criou:", name, number)
        if (mode === 'edit') console.log("Editou:", name, number)
    }

    useEffect(() => {
        if (!open) return

        if (mode === "edit" && people) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setName(people.name)
            setNumber(people.number)
        }

        if (mode === "create") {
            setName("")
            setNumber("")
        }
    }, [open, mode, people])


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{mode === "create" ? "Cadastrar nova pessoa" : "Editar dados"}</DialogTitle>
                    <DialogDescription>
                        {mode === "create" ? "Informe os dados" : "Edite os dados"}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex flex-col gap-2 w-full">
                            <Label>Nome</Label>
                            <Input
                                placeholder="Digite o nome..."
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                required
                            />
                            <Label>Número</Label>
                            <Input
                                placeholder="(14) 99999-9999"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                required
                            />

                            <Button
                                onClick={handleFormsPeople}
                            >
                                {mode === 'create' ? "Cadastrar" : "Editar"}
                            </Button>
                            <Button
                                variant={'outline'}
                                onClick={onOpenChange}
                            >
                                Cancelar
                            </Button>

                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}