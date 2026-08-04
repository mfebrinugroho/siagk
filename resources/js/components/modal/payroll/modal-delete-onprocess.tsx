import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Trash2Icon } from 'lucide-react';

interface Props {
    openDelOnprocess: boolean;
    setOpenDelOnprocess: (open: boolean) => void;
    selectedName?: string;
    handleDeleteOnprocess: () => void;
}

const ModalDeleteOnprocess = ({ openDelOnprocess, setOpenDelOnprocess, selectedName, handleDeleteOnprocess }: Props) => {
    return (
        <AlertDialog open={openDelOnprocess} onOpenChange={setOpenDelOnprocess}>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Hapus Data?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Yakin ingin menghapus <strong>{selectedName}</strong>?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline" className="cursor-pointer">
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction variant="destructive" className="cursor-pointer" onClick={handleDeleteOnprocess}>
                        Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ModalDeleteOnprocess;
