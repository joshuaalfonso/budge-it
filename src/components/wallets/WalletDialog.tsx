import { colorPallette } from '@/constants';
import { walletType } from '@/data/wallet';
import { useCreateWallet, useUpdateWallet } from '@/queries/wallet.queries';
import { useWalletDialogStore } from '@/stores/wallet.store';
import type { WalletType } from '@/types/wallet.types';
import { Badge, Button, CloseButton, createListCollection, Dialog, Field, Input, InputGroup, NumberInput, Portal, Select, Stack } from '@chakra-ui/react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { toaster } from '../ui/toaster';
import { useEffect } from 'react';
import { LuPhilippinePeso } from 'react-icons/lu';

const frameworks = createListCollection({
    items: walletType,
})

interface WalletFormValues { 
    id: number
    name: string; 
    type: WalletType; 
    initial_balance: string; 
}


const WalletDialog = () => {

    const open = useWalletDialogStore((state) => state.open);
    const setOpen = useWalletDialogStore((state) => state.setOpen);
    const selected = useWalletDialogStore((state) => state.selected);

    const { mutate: createWallet, isPending } = useCreateWallet();
    const { mutate: updateWallet, isPending: isUpdating } = useUpdateWallet();

    const { 
        register, 
        control, 
        handleSubmit, 
        reset, 
        formState: { errors, isSubmitting, isDirty }, 
    } = useForm<WalletFormValues>({ 
        defaultValues: { 
            id: 0,
            name: '', 
            type: 'savings', 
            initial_balance: '0.00', 
        }, 
    });

    const isWorking = isPending || isUpdating || isSubmitting;
    const isEditMode = Boolean(selected?.id);

    const onSubmit: SubmitHandler<WalletFormValues> = async (data) => { 
        const payload = { 
            id: data.id,
            name: data.name, 
            type: data.type, 
            initial_balance: String(data.initial_balance), 
        }; 

        const mutationFn = isEditMode ? updateWallet : createWallet;

        mutationFn(
            payload,
            {
                onSuccess: () => {
                    // console.log(response);
                    toaster.create({
                        description: `Item ${isEditMode ? 'updated' : 'saved'} successfully`,
                        type: "info",
                        closable: true,
                    })
                    setOpen(false);
                    reset()
                },
                onError: (error) => {
                    console.log(error);
                    toaster.create({
                        description: "Something went wrong",
                        type: "info",
                        closable: true,
                    })
                }
            }
        )

    }

    useEffect(() => {
        if (selected) {
            reset({
                id: selected.id,
                type: selected.type,
                name: selected.name,
                initial_balance: String(selected.initialBalance ?? selected.initialBalance ?? '0')
            });
        } else {
            reset({
                id: 0,
                name: '', 
                type: 'savings', 
                initial_balance: '0.00', 
            });
        }
    }, [selected, reset]);

    return (
        <Dialog.Root 
            open={open} 
            onOpenChange={(e) => {
                setOpen(e.open);
                if (!e.open) reset();
            }}
            placement="center"
            size={{ mdDown: "sm", md: "md" }}
        >
            <Dialog.Trigger asChild />
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                <Dialog.Content as="form" onSubmit={handleSubmit(onSubmit)}>

                    <Dialog.Header>
                        <Dialog.Title>New Account</Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body>
                        <Stack gap="8">

                            {/* Account Type */}
                            <Field.Root required gap={3} invalid={!!errors.type}>
                                <Field.Label 
                                    textTransform="uppercase"
                                    color="fg.muted"
                                >
                                    Account Type
                                    <Field.RequiredIndicator />
                                </Field.Label>

                                <Controller 
                                    name="type" 
                                    control={control} 
                                    rules={{ required: 'Account type is required' }} 
                                    render={({ field }) => ( 
                                        <Select.Root 
                                            collection={frameworks} 
                                            variant="subtle" 
                                            size="md" 
                                            width="full" 
                                            value={field.value ? [field.value] : []} 
                                            onValueChange={(details) => { 
                                                field.onChange(details.value[0] ?? ''); 
                                            }} 
                                        > 
                                            <Select.HiddenSelect /> 
                                            <Select.Control> 
                                                <Select.Trigger borderRadius="xl"> 
                                                    <Select.ValueText placeholder="Select" /> 
                                                </Select.Trigger> 
                                                <Select.IndicatorGroup> 
                                                    <Select.Indicator /> 
                                                </Select.IndicatorGroup> 
                                            </Select.Control> 
                                            <Portal> 
                                                <Select.Positioner> 
                                                    <Select.Content maxH="300px" overflowY="auto"> 
                                                        {frameworks.items.map((framework) => ( 
                                                            <Select.Item 
                                                                item={framework} 
                                                                key={framework.value} 
                                                            > 
                                                                {framework.label} 
                                                                <Select.ItemIndicator /> 
                                                            </Select.Item> 
                                                        ))} 
                                                    </Select.Content> 
                                                </Select.Positioner> 
                                            </Portal> 
                                        </Select.Root> 
                                    )} 
                                /> 
                                {errors.type && ( 
                                    <Field.ErrorText>{errors.type.message}</Field.ErrorText> 
                                )}
                            </Field.Root>

                            {/* Account Name */}
                            <Field.Root required gap={3} invalid={!!errors.name}>
                                <Field.Label 
                                    textTransform="uppercase"
                                    color="fg.muted"
                                >
                                    Account Name
                                    <Field.RequiredIndicator />
                                </Field.Label>
                                <Input 
                                    {...register("name", { required: "Account name is required" })}
                                    placeholder="Name" 
                                    variant="subtle" 
                                    borderRadius="xl" 
                                    colorPalette={colorPallette} 
                                    autoComplete='off'
                                />
                                {errors.name ? (
                                    <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                                ) : (
                                    <Field.HelperText>example: Cash, BDO, PNB</Field.HelperText>
                                )}
                            </Field.Root>

                            {/* Starting Balance */}
                            <Field.Root gap={3} invalid={!!errors.initial_balance}>
                                <Field.Label 
                                    textTransform="uppercase"
                                    color="fg.muted"
                                >
                                    Starting Balance
                                    <Field.RequiredIndicator
                                        fallback={
                                            <Badge size="xs" variant="surface">
                                                Optional
                                            </Badge>
                                        }
                                    />
                                </Field.Label>

                                <Controller
                                    name="initial_balance"
                                    control={control}
                                    // rules={{
                                    //     required: "Starting balance is required",
                                    //     pattern: { value: /^\d+(\.\d+)?$/, message: "Must be a valid number" }
                                    // }}
                                    render={({ field }) => (
                                        <NumberInput.Root
                                            disabled={field.disabled}
                                            name={field.name}
                                            value={field.value}
                                            onValueChange={({ value }) => {
                                                field.onChange(value)
                                            }}
                                            variant="subtle"
                                            w="full"
                                        >
                                            <NumberInput.Control />
                                            <InputGroup startElement={<LuPhilippinePeso />}>
                                                <NumberInput.Input onBlur={field.onBlur} placeholder="0.00" />
                                            </InputGroup>
                                        </NumberInput.Root>
                                    )}
                                />
                                <Field.HelperText>The amount that will be on the account at the time of creation.</Field.HelperText>
                                <Field.ErrorText>{errors.initial_balance?.message}</Field.ErrorText>


                                {/* <Input 
                                    {...register("initial_balance", { 
                                        required: "Starting balance is required",
                                        pattern: { value: /^\d+(\.\d+)?$/, message: "Must be a valid number" }
                                    })}
                                    placeholder="0.00" 
                                    type="number"
                                    step="any"
                                    variant="subtle" 
                                    borderRadius="xl"
                                    colorPalette={colorPallette}  
                                    autoComplete='off'
                                />
                                {errors.initial_balance ? (
                                    <Field.ErrorText>{errors.initial_balance.message}</Field.ErrorText>
                                ) : (
                                    <Field.HelperText>The amount that will be on the account at the time of creation.</Field.HelperText>
                                )} */}
                                
                            </Field.Root>

                        </Stack>
                    </Dialog.Body>

                    <Dialog.Footer className='flex flex-col md:flex-row'>
                        <Dialog.ActionTrigger asChild>
                            <Button 
                                variant="outline" 
                                type="button" 
                                className="w-full md:w-auto"
                            >
                                Cancel</Button>
                            
                        </Dialog.ActionTrigger>
                        <Button 
                            colorPalette="orange" 
                            type="submit" 
                            loading={isWorking}
                            disabled={!isDirty}
                            className="w-full md:w-auto"
                        >
                            {isEditMode ? 'Apply changes' : 'Create'}
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

export default WalletDialog;