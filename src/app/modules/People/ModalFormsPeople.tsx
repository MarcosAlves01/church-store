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
import { Switch } from "@/components/ui/switch";
import { People } from "./types";
import { useEffect, useState } from "react";
import { createPeopleServices, updatePeopleServices } from "./People.services";
import { responseApiRouteType } from "@/lib/types";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";


type FormsPeople = {
    mode: "edit" | "create";
    open: boolean;
    onOpenChange: () => void
    people?: People
    setRefreshTable: (refresh: boolean) => void
}

export default function ModalFormsPeople({ mode, open, onOpenChange, people, setRefreshTable }: FormsPeople) {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [paid, setPaid] = useState(false)
    const [loadingForms, setLoadingForms] = useState(false)


    async function handleFormsPeople() {
        let response: responseApiRouteType
        if (!name || !phone) {
            toast.error("Preencha todos os campos")
            return
        }
        setLoadingForms(true)
        if (mode === 'create') {
            response = await createPeopleServices(name, phone)
            if (response.request_ok) {
                toast.success("Pessoa cadastrada com sucesso")
                setRefreshTable(true)
                onOpenChange()
            }
        }
        if (mode === 'edit') {
            response = await updatePeopleServices(people?.id || "", name, phone, paid)
            if (response.request_ok) {
                toast.success("Pessoa atualizada com sucesso")
                setRefreshTable(true)
                onOpenChange()
            }
        }
        setLoadingForms(false)
    }

    useEffect(() => {
        if (!open) return

        if (mode === "edit" && people) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setName(people.nome)
            setPhone(people.telefone || "")
            setPaid(people.pago)
        }

        if (mode === "create") {
            setName("")
            setPhone("")
            setPaid(false)
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
                        />
                        <Label>Número</Label>
                        <Input
                            placeholder="(14) 99999-9999"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        {mode === "edit" && (
                            <div className="flex items-center gap-2 mt-1 border p-3 rounded-lg justify-between">
                                <Label>
                                    <CreditCard opacity={80} /> Pago
                                </Label>

                                <Switch
                                    checked={paid}
                                    onCheckedChange={setPaid}
                                />
                            </div>
                        )}

                        <Button
                            onClick={handleFormsPeople}
                            disabled={loadingForms}
                        >
                            {loadingForms ? <Spinner /> : mode === 'create' ? "Cadastrar" : "Editar"}
                        </Button>
                        <Button
                            variant={'outline'}
                            onClick={onOpenChange}
                            disabled={loadingForms}
                        >
                            Cancelar
                        </Button>

                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}