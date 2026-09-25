import { colorPallette } from "@/constants";
import { useCategoryDialogStore } from "@/stores/category.store";
import { transactionTypes } from "@/data/transactions";

import {
  Button,
  CloseButton,
  Dialog,
  Field,
  HStack,
  Input,
  Portal,
  RadioCard,
  Stack,
} from "@chakra-ui/react";

import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useCreateCategory, useUpdateCategory } from "@/queries/category.queries";
import { toaster } from "../ui/toaster";

// const transactionType = createListCollection({
//   items: transactionTypes,
// });

type CategoryFormValues = {
        id: number
        name: string;
        type: string;
        icon: string;
    };

const defaultValues: CategoryFormValues = {
    id: 0,
    name: "",
    type: "expense",
    icon: "🏷️",
};

const CategoryDialog = () => {
    const [showPicker, setShowPicker] = useState(false);

    const open = useCategoryDialogStore((state) => state.open);
    const setOpen = useCategoryDialogStore((state) => state.setOpen);
    const selected = useCategoryDialogStore((state) => state.selected);

    const pickerRef = useRef<HTMLDivElement | null>(null);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<CategoryFormValues>({
        defaultValues,
    });

    const { mutate: create, isPending: isCreating } = useCreateCategory();
    const { mutate: update, isPending: isUpdating } = useUpdateCategory();

    const isWorking = isCreating || isUpdating;
    const isEdit = Boolean(selected?.id);

    const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {

        const mutate = isEdit ? update : create;

        mutate(
            data,
            {
                onSuccess(response) {
                    reset(defaultValues);
                    setOpen(false);
                    toaster.create({
                        description: response.message || 'Action completed'
                    })
                },
                onError(err) {
                    console.error(err)
                    toaster.error({
                        description: 'Something went wrong'
                    })
                }
            }
        )

    };

    const handleOpenChange = (details: { open: boolean }) => {
            setOpen(details.open);

            if (!details.open) {
                reset(defaultValues);
                setShowPicker(false);
            }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target as Node)
            ) {
                setShowPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (selected) {
            reset({
                id: selected.id,
                icon: selected.icon,
                type: selected.type,
                name: selected.name
            })
        } else {
            reset(defaultValues)
        }
    }, [selected, reset])

    return (
        <Dialog.Root
            open={open}
            onOpenChange={handleOpenChange}
            placement="center"
            size={{ mdDown: "xs", md: "md" }}
        >
        <Dialog.Trigger asChild />

        <Portal>
            <Dialog.Backdrop />

            <Dialog.Positioner>
                <Dialog.Content as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Dialog.Header>
                        <Dialog.Title>New Category</Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body>
                    <Stack gap="8">
                        {/* Icon */}
                        <div className="relative" ref={pickerRef}>
                            <div className="grid place-items-center gap-8">
                                <Controller
                                    name="icon"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <h1 className="text-6xl!">
                                                {field.value}
                                            </h1>

                                            <Button
                                                type="button"
                                                variant="plain"
                                                onClick={() =>
                                                setShowPicker((prev) => !prev)
                                                }
                                            >
                                                Change Icon
                                            </Button>

                                            {showPicker && (
                                                <div
                                                style={{
                                                    position: "absolute",
                                                    right: 0,
                                                    top: 70,
                                                    zIndex: 100,
                                                }}
                                                >
                                                <EmojiPicker
                                                    onEmojiClick={(emojiData) => {
                                                    field.onChange(emojiData.emoji);
                                                    setShowPicker(false);
                                                    }}
                                                    theme={Theme.DARK}
                                                />
                                                </div>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Type */}
                        <Field.Root gap={3} invalid={!!errors.type} required>
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

                        {/* Name */}
                        <Field.Root
                            required
                            gap={3}
                            invalid={!!errors.name}
                        >
                        <Field.Label
                            textTransform="uppercase"
                            color="fg.muted"
                        >
                            Name
                            <Field.RequiredIndicator />
                        </Field.Label>

                        <Input
                            {...register("name", {
                                required: "Category name is required",
                                minLength: {
                                    value: 2,
                                    message:
                                    "Category name must be at least 2 characters",
                                },
                                maxLength: {
                                    value: 50,
                                    message:
                                    "Category name must not exceed 50 characters",
                                },
                            })}
                            placeholder="Name"
                            variant="subtle"
                            borderRadius="xl"
                            colorPalette={colorPallette}
                            autoComplete="off"
                        />

                        {errors.name && (
                            <Field.ErrorText>
                                {errors.name.message}
                            </Field.ErrorText>
                        )}
                        </Field.Root>
                    </Stack>
                    </Dialog.Body>

                    <Dialog.Footer className="flex flex-col md:flex-row">
                        <Dialog.ActionTrigger asChild>
                            <Button
                                variant="subtle"
                                type="button"
                                className="w-full md:w-auto"
                                onClick={() => {
                                    reset(defaultValues);
                                    setShowPicker(false);
                                }}
                            >
                                Cancel
                            </Button>
                        </Dialog.ActionTrigger>

                        <Button
                            colorPalette={colorPallette}
                            type="submit"
                            loading={isSubmitting || isWorking}
                            disabled={!isDirty}
                            className="w-full md:w-auto"
                        >
                            Create
                        </Button>
                    </Dialog.Footer>

                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
        </Dialog.Root>
    );
};

export default CategoryDialog;
