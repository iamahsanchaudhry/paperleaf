import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "../ui/spinner";

interface DeleteProductDialogProps {
  trigger: React.ReactNode;
  onConfirm: () => void;
  productDeleting: boolean;
}

export function DeleteProductDialog({ trigger, onConfirm, productDeleting }: DeleteProductDialogProps) {
    return (
    <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product?
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={productDeleting}>Cancel</Button>
            </DialogClose>
            <Button onClick={onConfirm} disabled={productDeleting} variant="destructive" >{productDeleting? <>Deleting... <Spinner /></>: "Delete"}</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}


