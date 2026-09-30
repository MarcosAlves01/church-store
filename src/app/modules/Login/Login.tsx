import { Card } from "@/components/ui/card";
import LoginForm from "./LoginForm";


export default function Login() {
    return (
        <div className="flex min-h-screen items-center justify-center w-full">
            <Card className="w-96 p-8 flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                        EGA
                    </div>
                    <h1 className="text-2xl font-bold">LOJINHA</h1>
                    <p className="text-sm text-muted-foreground">Gerencie sua lojinha com facilidade!</p>
                </div>
                <LoginForm />
                <p className="text-xs text-muted-foreground">© 2026 LOJINHA - EGA</p>
            </Card>
        </div>
    )
}
