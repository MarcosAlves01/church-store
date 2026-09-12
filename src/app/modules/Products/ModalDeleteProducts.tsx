import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

type ModalDeleteProductsProps = {
    open: boolean;
    onOpenChange: () => void;
    productName: string;
    onChange: () => void;
}

export default function ModalDeleteProducts({ open, onOpenChange, productName, onChange }: ModalDeleteProductsProps) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir Produto</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir este produto?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex justify-between items-center w-full">
                        <span>
                            {productName}
                        </span>
                        <Button
                            variant="destructive"
                            onClick={onChange}
                        >
                            Excluir
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
