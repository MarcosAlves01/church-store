import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import TablePeople from "./TablePeople";


export default function People() {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Pessoas
                    <div>
                        <Button size={'sm'}>
                            <Plus /> Cadastrar
                        </Button>
                    </div>
                </CardTitle>
                <CardDescription>
                    Lista de pessoas que estão no retiro
                </CardDescription>

            </CardHeader>
            <CardContent>
                <TablePeople />
            </CardContent>
        </Card>
    )
}