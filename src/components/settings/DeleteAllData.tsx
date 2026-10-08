import { useDeleteAllData } from "@/queries/setting.queries";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { toaster } from "../ui/toaster";
import { useState } from "react";
// import { logout } from "@/api/auth";
// import { useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";


const DeleteAllDataAlert = () => {

    const [open, setOpen] = useState(false)

    const { mutate: deleteAllData, isPending } = useDeleteAllData();

    // const navigate = useNavigate();

    // const queryClient = useQueryClient();

    const handleDeleteTransaction = () => {

        deleteAllData(
            undefined,
            {
                onSuccess: (response) => {
                //    try {
                //         await logout();
                //         queryClient.clear();
                //         navigate("/login");
                //     } catch (error) {
                //         console.error(error);
                //         toaster.create({
                //             description: 'Your data was deleted, but we could not log you out. Please try logging out again.'
                //         })
                //     }
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
                    Delete everything
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
                            This action cannot be undone. This will permanently delete all your data.
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
                            Delete everything
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

export default DeleteAllDataAlert