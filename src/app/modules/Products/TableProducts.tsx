import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { PenBoxIcon, Search, Trash2 } from "lucide-react";


export default function TableProducts() {

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 sm:max-w-[40%]">
                <Input
                    placeholder="Procure um produto..."
                />
                <Button>
                    <Search /> Buscar
                </Button>
            </div>
            <div className="border rounded-lg p-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Trento</TableCell>
                            <TableCell>R$ 50,00</TableCell>
                            <TableCell>
                                <div className="flex gap-2 items-center">
                                    <Button
                                        size={'lg'}
                                    >
                                        <PenBoxIcon />
                                    </Button>
                                    <Button
                                        variant={'destructive'}
                                        size={'lg'}
                                    >
                                        <Trash2 />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}