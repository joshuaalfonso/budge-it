import { colorPallette } from '@/constants';
// import { walletType } from '@/data/wallet';
import {  useWallet } from '@/queries/wallet.queries';
// import type { WalletType } from '@/types/wallet.types';
import {  Button, CloseButton, createListCollection, DatePicker, Dialog, Field, HStack, Input, InputGroup, NumberInput, parseDate, Portal, RadioCard, Select, Stack } from '@chakra-ui/react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { toaster } from '../ui/toaster';
import { useEffect } from 'react';
import { LuCalendar } from 'react-icons/lu';
import type { TransactionType } from '@/types/transaction.types';
import { useTransactionDialogStore } from '@/stores/transaction.store';
import { useCreateTransaction, useUpdateTransaction } from '@/queries/transaction.queries';
import { transactionTypes } from '@/data/transactions';
import { useCategory } from '@/queries/category.queries';
import { useCurrencyStore } from '@/stores/currency.store';


interface TransactionFormValues { 
    id: number
    type: TransactionType; 
    amount: string; 
    description: string; 
    category_id: number;
    wallet_id: number;
    transaction_date: string;
}


const WalletDialog = () => {

    const currency = useCurrencyStore(
        (state) => state.currency
    );

    const open = useTransactionDialogStore((state) => state.open);
    const setOpen = useTransactionDialogStore((state) => state.setOpen);
    const selected = useTransactionDialogStore((state) => state.selected);

    const { mutate: createWallet, isPending } = useCreateTransaction();
    const { mutate: updateWallet, isPending: isUpdating } = useUpdateTransaction();

    const { data: walletData } = useWallet();

    const wallets = createListCollection({
        items: walletData ?? [],
        itemToValue: (item) => String(item.id),
        itemToString: (item) => item.name,
    })

    const { data: categoryData } = useCategory();

    const categories = createListCollection({
        items: categoryData ?? [],
        itemToValue: (item) => String(item.id),
        itemToString: (item) => item.name,
    })

    const { 
        register, 
        control, 
        handleSubmit, 
        reset, 
        formState: { errors, isSubmitting, isDirty }, 
    } = useForm<TransactionFormValues>({ 
        defaultValues: { 
            id: 0,
            type: 'expense', 
            amount: '0.00', 
            description: '',
            category_id: 0,
            wallet_id: 0,
            transaction_date: '',
        }, 
    });

    const isWorking = isPending || isUpdating || isSubmitting;
    const isEditMode = Boolean(selected?.id);

    const currencySymbol = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
    })
        .formatToParts(0)
        .find((part) => part.type === "currency")?.value


    const onSubmit: SubmitHandler<TransactionFormValues> = async (data) => { 
        const payload = { 
            id: data.id,
            type: data.type, 
            amount: String(data.amount), 
            description: data.description,
            category_id: data.category_id,
            wallet_id: data.wallet_id,
            transaction_date: data.transaction_date,
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
                amount: selected.amount,
                description: String(selected.description),
                category_id: selected.categoryId,
                wallet_id: selected.walletId,
                transaction_date: selected.transactionDate,
            });
        } else {
            reset({
                id: 0,
                type: 'expense', 
                amount: '0.00', 
                description: '',
                category_id: 0,
                wallet_id: 0,
                transaction_date: new Date().toISOString().split('T')[0],
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
            size={{ mdDown: "full", md: "md" }}
            scrollBehavior="inside"
        >
            <Dialog.Trigger asChild />
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                <Dialog.Content as="form" onSubmit={handleSubmit(onSubmit)}>

                    <Dialog.Header>
                        <Dialog.Title>New Transaction</Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body>
                        <Stack gap="8">

                            <Field.Root gap={3} invalid={!!errors.amount} required>
                                <Field.Label 
                                    textTransform="uppercase"
                                    color="fg.muted"
                                >
                                    Type
                                    <Field.RequiredIndicator />
                                </Field.Label>

                                <Controller
                                    name="type"
                                    control={control}
                                    rules={{ required: "Please select a type" }}
                                    render={({ field }) => (
                                        <RadioCard.Root
                                            value={field.value}
                                            onValueChange={(details) => field.onChange(details.value)}
                                            w="full"
                                            variant="subtle"
                                            colorPalette={colorPallette}
                                            size="sm"
                                        >
                                            {/* <RadioCard.Label>Select type</RadioCard.Label> */}
                                            <HStack align="stretch">
                                                {transactionTypes.map((item) => (
                                                <RadioCard.Item key={item} value={item} borderRadius="xl">
                                                    <RadioCard.ItemHiddenInput />
                                                    <RadioCard.ItemControl>
                                                    <RadioCard.ItemText textTransform="capitalize">{item}</RadioCard.ItemText>
                                                    <RadioCard.ItemIndicator />
                                                    </RadioCard.ItemControl>
                                                </RadioCard.Item>
                                                ))}
                                            </HStack>
                                        </RadioCard.Root>
                                    )}
                                />
                                <Field.ErrorText>{errors.type?.message}</Field.ErrorText>


                            </Field.Root>

                            <Field.Root gap={3} invalid={!!errors.amount} required>
                                <Field.Label 
                                    textTransform="uppercase"
                                    color="fg.muted"
                                >
                                    Amount 
                                    <Field.RequiredIndicator />
                                </Field.Label>

                                <Controller
                                    name="amount"
                                    control={control}
                                    rules={{
                                        required: "Starting balance is required",
                                        pattern: { value: /^\d+(\.\d+)?$/, message: "Must be a valid number" }
                                    }}
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
                                            colorPalette={colorPallette}
                                            // formatOptions={{
                                            //     style: "currency",
                                            //     currency: currency,
                                            //     currencyDisplay: "symbol",
                                            //     currencySign: "standard",
                                            // }}
                                        >
                                            <NumberInput.Control />
                                            {/* <InputGroup startElement={<LuPhilippinePeso />}> */}
                                            <InputGroup startElement={currencySymbol}>
                                                <NumberInput.Input onBlur={field.onBlur} placeholder="0.00" borderRadius="xl" />
                                            </InputGroup>
                                        </NumberInput.Root>
                                    )}
                                />
                                <Field.ErrorText>{errors.amount?.message}</Field.ErrorText>

                            </Field.Root>


                            <div className='grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-2 '>
                                {/* Account Type */}
                                <Field.Root required gap={3} invalid={!!errors.type}>
                                    <Field.Label 
                                        textTransform="uppercase"
                                        color="fg.muted"
                                    >
                                        Wallet
                                        <Field.RequiredIndicator />
                                    </Field.Label>

                                    <Controller 
                                        name="wallet_id" 
                                        control={control} 
                                        rules={{ required: 'Wallet is required' }} 
                                        render={({ field }) => ( 
                                            <Select.Root 
                                                collection={wallets} 
                                                variant="subtle" 
                                                size="md" 
                                                width="full" 
                                                value={field.value ? [String(field.value)] : []} 
                                                onValueChange={(details) => { 
                                                    field.onChange(Number(details.value[0]));
                                                }} 
                                                // colorPalette={colorPallette}
                                            > 
                                                <Select.HiddenSelect /> 
                                                <Select.Control > 
                                                    <Select.Trigger borderRadius="xl"> 
                                                        <Select.ValueText placeholder="Select" /> 
                                                    </Select.Trigger> 
                                                    <Select.IndicatorGroup> 
                                                        <Select.Indicator /> 
                                                    </Select.IndicatorGroup> 
                                                </Select.Control> 
                                                <Portal> 
                                                    <Select.Positioner> 
                                                        <Select.Content> 
                                                            {wallets.items.map((wallet) => ( 
                                                                <Select.Item 
                                                                    item={wallet} 
                                                                    key={wallet.id} 
                                                                > 
                                                                    {wallet.name} 
                                                                    <Select.ItemIndicator color={`${colorPallette}.500`} /> 
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

                                <Field.Root required gap={3} invalid={!!errors.type}>
                                    <Field.Label 
                                        textTransform="uppercase"
                                        color="fg.muted"
                                    >
                                        Category
                                        <Field.RequiredIndicator />
                                    </Field.Label>

                                    <Controller 
                                        name="category_id" 
                                        control={control} 
                                        rules={{ required: 'Category is required' }} 
                                        render={({ field }) => ( 
                                            <Select.Root 
                                                collection={categories} 
                                                variant="subtle" 
                                                size="md" 
                                                width="full" 
                                                value={field.value ? [String(field.value)] : []} 
                                                onValueChange={(details) => { 
                                                    field.onChange(Number(details.value[0]));
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
                                                        <Select.Content> 
                                                            {categories.items.map((category) => ( 
                                                                <Select.Item 
                                                                    item={category} 
                                                                    key={category.id} 
                                                                > 
                                                                    {category.name} 
                                                                    <Select.ItemIndicator color={`${colorPallette}.500`} /> 
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
                            </div>

                            <Field.Root required gap={3} invalid={!!errors.description}>
                                <Field.Label 
                                    textTransform="uppercase"
                                    color="fg.muted"
                                >
                                    Description
                                    <Field.RequiredIndicator />
                                </Field.Label>
                                <Input 
                                    {...register("description", { required: "Description is required" })}
                                    placeholder="" 
                                    variant="subtle" 
                                    borderRadius="xl" 
                                    colorPalette={colorPallette} 
                                    autoComplete='off'
                                />
                                <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
                            </Field.Root>

                            <Field.Root gap={3} invalid={!!errors.amount} required>
                                <Field.Label 
                                    textTransform="uppercase"
                                    color="fg.muted"
                                >
                                    Date
                                    <Field.RequiredIndicator />
                                </Field.Label>

                                <Controller
                                    control={control}
                                    name="transaction_date"
                                    render={({ field }) => (
                                        <Field.Root invalid={!!errors.transaction_date} >
                                        <DatePicker.Root
                                            value={field.value ? [parseDate(field.value)] : []}
                                                onValueChange={(e) =>
                                                field.onChange(e.value[0]?.toString() ?? "")
                                            }
                                            invalid={!!errors.transaction_date}
                                            variant="subtle"
                                            colorPalette={colorPallette}
                                            
                                        >
                                            {/* <DatePicker.Label>Date of birth</DatePicker.Label> */}
                                            <DatePicker.Control>
                                            <DatePicker.Input placeholder="Select date" borderRadius="xl" />
                                            <DatePicker.IndicatorGroup>
                                                <DatePicker.Trigger>
                                                <LuCalendar />
                                                </DatePicker.Trigger>
                                            </DatePicker.IndicatorGroup>
                                            </DatePicker.Control>
                                            <Portal>
                                            <DatePicker.Positioner>
                                                <DatePicker.Content>
                                                <DatePicker.View view="day">
                                                    <DatePicker.Header />
                                                    <DatePicker.DayTable colorPalette={colorPallette} />
                                                </DatePicker.View>
                                                <DatePicker.View view="month">
                                                    <DatePicker.Header />
                                                    <DatePicker.MonthTable colorPalette={colorPallette} />
                                                </DatePicker.View>
                                                <DatePicker.View view="year">
                                                    <DatePicker.Header />
                                                    <DatePicker.YearTable colorPalette={colorPallette} />
                                                </DatePicker.View>
                                                </DatePicker.Content>
                                            </DatePicker.Positioner>
                                            </Portal>
                                        </DatePicker.Root>
                                        <Field.ErrorText>{errors.transaction_date?.message}</Field.ErrorText>
                                        </Field.Root>
                                    )}
                                />
                                <Field.ErrorText>{errors.type?.message}</Field.ErrorText>


                            </Field.Root>

                        </Stack>
                    </Dialog.Body>

                    <Dialog.Footer className='flex flex-col md:flex-row'>
                        <Dialog.ActionTrigger asChild>
                            <Button 
                                type="button" 
                                className="w-full md:w-auto"
                                variant="ghost"
                            >
                                Cancel</Button>
                            
                        </Dialog.ActionTrigger>
                        <Button 
                            colorPalette={colorPallette}
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