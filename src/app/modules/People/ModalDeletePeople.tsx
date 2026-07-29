import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

type ModalDeletePeopleProps = {
    open: boolean;
    onOpenChange: () => void;
    personName: string;
    onChange: () => void;
}

export default function ModalDeletePeople({ open, onOpenChange, personName, onChange }: ModalDeletePeopleProps) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir Pessoa</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir esta pessoa?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex justify-between items-center w-full">
                        <span>
                            {personName}
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