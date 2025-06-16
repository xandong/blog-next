"use client"

import { Loader2 } from "lucide-react"
import { Button } from "../_ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../_ui/dialog"

interface ConfirmationDialogProps {
  title?: string
  description?: string
  onConfirm: () => void
  open: boolean
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void
  loading?: boolean
}
export const ConfirmationDialog = ({
  title = "Tem certeza?",
  description = "Esta ação não pode ser desfeita. Isso excluirá permanentemente os dados de nossos servidores.",
  onConfirm,
  open,
  setOpen,
  loading
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancelar
          </Button>

          <Button variant="destructive" onClick={onConfirm}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Confirmar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
