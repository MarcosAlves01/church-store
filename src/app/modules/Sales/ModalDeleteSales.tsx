import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

type ModalDeleteSalesProps = {
    open: boolean;
    onOpenChange: () => void;
    saleName: string;
    onChange: () => void;
    loading?: boolean;
}

export default function ModalDeleteSales({ open, onOpenChange, saleName, onChange, loading }: ModalDeleteSalesProps) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir Venda</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir esta venda?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex justify-between items-center w-full">
                        <span>
                            {saleName}
                        </span>
                        <Button
                            variant="destructive"
                            onClick={onChange}
                            disabled={loading}
                        >
                            {loading ? <Spinner /> : "Excluir"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
