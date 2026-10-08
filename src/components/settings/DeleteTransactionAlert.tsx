import { useDeleteAllTransaction } from "@/queries/setting.queries";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { toaster } from "../ui/toaster";
import { useState } from "react";




const DeleteTransactionAlert = () => {

    const [open, setOpen] = useState(false)

    const { mutate: deleteTransaction, isPending } = useDeleteAllTransaction();

    const handleDeleteTransaction = () => {

        deleteTransaction(
            undefined,
            {
                onSuccess: (response) => {
                    toaster.create({
                        description: response.message,
                        type: 'info'
                    })
                    setOpen(false)
                },
                onError: (error) => {
                    console.error(error);
                    toaster.create({
                        description: 'Something went wrong',
                        type: 'info'
                    })
                }
            }
        )

    }

    return (
       <Dialog.Root 
            lazyMount 
            open={open} 
            onOpenChange={(e) => setOpen(e.open)}
            placement="center"
            size="xs"
        >

            <Dialog.Trigger asChild>
                <Button size="sm" colorPalette="red" variant="ghost" rounded="md" loading={isPending}>
                    Clear data
                </Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                <Dialog.Content>

                    <Dialog.Header>
                            <Dialog.Title>Are you sure?</Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body>
                        <p>
                            This action cannot be undone. This will permanently delete your transactions.
                        </p>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </Dialog.ActionTrigger>
                        <Button 
                            colorPalette="red" 
                            onClick={() => handleDeleteTransaction()}
                            loading={isPending}
                        >
                            Delete transactions
                        </Button>
                    </Dialog.Footer>

                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                    </Dialog.CloseTrigger>

                </Dialog.Content>

                </Dialog.Positioner>
            </Portal>

        </Dialog.Root>
    )
}

export default DeleteTransactionAlert