"use client"

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getMeServices, logoutServices } from "./Auth.services"
import type { Usuario } from "./types"

type AuthContextType = {
    usuario: Usuario | null
    loading: boolean
    logout: () => Promise<void>
    refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [usuario, setUsuario] = useState<Usuario | null>(null)
    const [loading, setLoading] = useState(true)

    const logout = useCallback(async () => {
        await logoutServices()
        setUsuario(null)
        router.replace("/login")
    }, [router])

    const refresh = useCallback(async () => {
        const response = await getMeServices()

        if (response?.request_ok && response.response) {
            setUsuario(response.response as Usuario)
            setLoading(false)
            return
        }

        // Não autenticado (token ausente, inválido ou expirado):
        // limpa o cookie e manda de volta para o login.
        setUsuario(null)
        setLoading(false)
        await logoutServices()
        router.replace("/login")
    }, [router])

    useEffect(() => {
        // Busca o usuário no mount; setState acontece de forma assíncrona
        // após a resposta, não sincronamente no render.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void refresh()
    }, [refresh])

    return (
        <AuthContext.Provider value={{ usuario, loading, logout, refresh }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider")
    }
    return context
}
