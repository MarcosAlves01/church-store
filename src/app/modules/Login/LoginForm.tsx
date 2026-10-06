'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { LoginServices } from "./Login.services";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { Eye, EyeOff } from "lucide-react";
import { responseApiRouteType } from "@/lib/types";


export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const [form, setForm] = useState({
        email: '',
        senha: ''
    })
    const [loadingLogin, setLoadingLogin] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!form.email || !form.senha) {
            toast.error('Preencha todos os campos')
            return
        }

        setLoadingLogin(true)
        const response: responseApiRouteType = await LoginServices(form.email, form.senha)
        if (response.request_ok) {
            toast.success("Login efetuado com sucesso")
            router.push('/peoples')
        } else {
            toast.error("Houve uma falha ao efetuar login. Tente novamente!")
        }
        setLoadingLogin(false)
    }

    function visiblePassword() {
        setShowPassword(!showPassword)
    }

    return (
        <div className="w-full">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
            >
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        placeholder="exemplo@gmail.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        autoComplete="email"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="senha">Senha</Label>
                    <div className="relative flex justify-end items-center">
                        <Input
                            id="senha"
                            value={form.senha}
                            type={showPassword ? "text" : "password"}
                            placeholder="Digite sua senha..."
                            onChange={(e) => setForm({ ...form, senha: e.target.value })}
                        />
                        <button type="button" onClick={visiblePassword} className="absolute mr-4 cursor-pointer text-zinc-300">
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>
                </div>

                <Button
                    disabled={loadingLogin}
                    className="cursor-pointer"
                    type="submit"
                >
                    {loadingLogin ? <Spinner /> : "Login"}
                </Button>
            </form>
        </div>
    )
}
