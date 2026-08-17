import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TableProducts from "./TableProducts";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


export default function Product() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Produtos
                    <div>
                        <Button
                            size={'sm'}
                        >
                            <Plus /> Cadastrar
                        </Button>
                    </div>
                </CardTitle>
                <CardDescription>
                    Lista de produtos à venda
                </CardDescription>
            </CardHeader>
            <CardContent>
                <TableProducts />
            </CardContent>
        </Card>
    )
}