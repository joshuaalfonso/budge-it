
import { colorPallette } from '@/constants';
import { walletType } from '@/data/wallet';
import { useWalletDialogStore } from '@/stores/wallet.store';
import { Button, CloseButton, createListCollection, Dialog, Field, Input, Portal, Select, Stack } from '@chakra-ui/react';

const frameworks = createListCollection({
    items: walletType,
})

const WalletDialog = () => {

    const open = useWalletDialogStore((state) => state.open);
    const setOpen = useWalletDialogStore((state) => state.setOpen);

    return (
        <Dialog.Root 
            open={open} 
            onOpenChange={(e) => setOpen(!e)}
            placement="center"
            size={{ mdDown: "sm", md: "md" }}
        >
            <Dialog.Trigger asChild>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                <Dialog.Content>

                    <Dialog.Header>
                        <Dialog.Title>New Account</Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body>
                        <Stack gap="8">

                            <Field.Root gap={3}>
                                <Field.Label 
                                    textTransform="uppercase"
                                    color="fg.muted"
                                >
                                    Account Type
                                </Field.Label>
                                <Select.Root 
                                    collection={frameworks} 
                                    variant="subtle" 
                                    size="md" 
                                    width="full"
                                >
                                    <Select.HiddenSelect />
                                    <Select.Control>
                                        <Select.Trigger borderRadius={'xl'}>
                                        <Select.ValueText placeholder="Select" />
                                        </Select.Trigger>
                                        <Select.IndicatorGroup>
                                        <Select.Indicator />
                                        </Select.IndicatorGroup>
                                    </Select.Control>
                                    <Portal>
                                        <Select.Positioner>
                                        <Select.Content>
                                            {frameworks.items.map((framework) => (
                                            <Select.Item item={framework} key={framework.value}>
                                                {framework.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                            ))}
                                        </Select.Content>
                                        </Select.Positioner>
                                    </Portal>
                                </Select.Root>
                            </Field.Root>

                            <Field.Root gap={3}>
                                <Field.Label 
                                    textTransform="uppercase"
                                    color="fg.muted"
                                >
                                    Account Name
                                </Field.Label>
                                <Input 
                                    placeholder="Name" 
                                    variant="subtle" 
                                    borderRadius="xl" 
                                    colorPalette={colorPallette} 
                                    tabIndex={-1}
                                />
                               <Field.HelperText>example: Cash, BDO, PNB</Field.HelperText>
                            </Field.Root>

                            <Field.Root gap={3}>
                                 <Field.Label 
                                    textTransform="uppercase"
                                    color="fg.muted"
                                >
                                    Starting Balance
                                </Field.Label>
                                <Input 
                                    placeholder="0.00" 
                                    variant="subtle" 
                                    borderRadius="xl"
                                    colorPalette={colorPallette}  
                                    tabIndex={-1}
                                />
                                <Field.HelperText>The amount that will be on the account at the time of creation.</Field.HelperText>
                            </Field.Root>

                        </Stack>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </Dialog.ActionTrigger>
                        <Button colorPalette={'orange'}>Save</Button>
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

export default WalletDialog