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
import { User } from "./types";
import { useEffect, useState } from "react";
import { createUsersServices, updateUsersServices } from "./Users.services";
import { responseApiRouteType } from "@/lib/types";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";


type FormsUsers = {
    mode: "edit" | "create";
    open: boolean;
    onOpenChange: () => void
    user?: User
    setRefreshTable: (refresh: boolean) => void
}

export default function ModalFormsUsers({ mode, open, onOpenChange, user, setRefreshTable }: FormsUsers) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loadingForms, setLoadingForms] = useState(false)


    async function handleFormsUsers() {
        let response: responseApiRouteType
        if (!name || !email) {
            toast.error("Preencha todos os campos")
            return
        }
        if (mode === 'create' && !password) {
            toast.error("Informe a senha")
            return
        }
        setLoadingForms(true)
        if (mode === 'create') {
            response = await createUsersServices(name, email, password)
            if (response.request_ok) {
                toast.success("Usuário cadastrado com sucesso")
                setRefreshTable(true)
                onOpenChange()
            }
        }
        if (mode === 'edit') {
            response = await updateUsersServices(String(user?.id ?? ""), name, email)
            if (response.request_ok) {
                toast.success("Usuário atualizado com sucesso")
                setRefreshTable(true)
                onOpenChange()
            }
        }
        setLoadingForms(false)
    }

    useEffect(() => {
        if (!open) return

        if (mode === "edit" && user) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setName(user.nome)
            setEmail(user.email)
            setPassword("")
        }

        if (mode === "create") {
            setName("")
            setEmail("")
            setPassword("")
        }
    }, [open, mode, user])


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{mode === "create" ? "Cadastrar novo usuário" : "Editar dados"}</DialogTitle>
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
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="exemplo@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />

                        {mode === "create" && (
                            <>
                                <Label>Senha</Label>
                                <Input
                                    type="password"
                                    placeholder="Digite a senha..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                />
                            </>
                        )}

                        <Button
                            onClick={handleFormsUsers}
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
