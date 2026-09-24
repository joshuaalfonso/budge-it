import { colorPallette } from "@/constants";
import { useCategoryDialogStore } from "@/stores/category.store";
import { Button, CloseButton, createListCollection, Dialog, Field, Input, Portal, Select, Stack } from "@chakra-ui/react";
import { useState } from "react";
// import { useState } from "react";
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { transactionTypes } from "@/data/transactions";



const transactionType = createListCollection({
  items: transactionTypes,
//   itemToValue: (i) => i
})

const CategoryDialog = () => {

     const [message, setMessage] = useState("🏷️");
    const [showPicker, setShowPicker] = useState(false);

    const handleEmojiClick = (emojiData) => {
        setMessage(() => emojiData.emoji);
        setShowPicker(false)
    };

    const open = useCategoryDialogStore((state) => state.open);
    const setOpen = useCategoryDialogStore((state) => state.setOpen);

    return (
        
        <>
        
            <Dialog.Root 
            open={open} 
            onOpenChange={(e) => {
                setOpen(e.open);
                // if (!e.open) reset();
            }}
            placement="center"
            size={{ mdDown: "sm", md: "md" }}
        >
            <Dialog.Trigger asChild />
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                <Dialog.Content 
                    as="form" 
                    // onSubmit={handleSubmit(onSubmit)}
                >

                    <Dialog.Header>
                        <Dialog.Title>New Category</Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body>
                        <Stack gap="8">

                            <div className="relative">
                                <div className="grid place-items-center gap-8">
                                    {/* <input
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        style={{ flex: 1, padding: 10 }}
                                    /> */}
                                    <h1 className="text-6xl!">{message}</h1>
                                    <div>
                                        <button type="button" onClick={() => setShowPicker((prev) => !prev)}>
                                            Change Icon
                                        </button>
                                    </div>
                                    
                                </div>

                                {showPicker && (
                                    <div style={{ position: "absolute", right: 0, top: 50, zIndex: 100 }}>
                                        <EmojiPicker onEmojiClick={handleEmojiClick} theme={Theme.DARK} />
                                    </div>
                                )}
                            </div>

                            {/* Account Type */}
                            <Field.Root 
                                required 
                                gap={3} 
                                // invalid={!!errors.type}
                            >
                                <Field.Label 
                                    textTransform="uppercase"
                                    color="fg.muted"
                                >
                                    Type
                                    <Field.RequiredIndicator />
                                </Field.Label>

                                {/* <Controller 
                                    name="type" 
                                    control={control} 
                                    rules={{ required: 'Account type is required' }} 
                                    render={({ field }) => (  */}
                                        <Select.Root 
                                            collection={transactionType} 
                                            variant="subtle" 
                                            size="md" 
                                            width="full" 
                                            // value={field.value ? [field.value] : []} 
                                            // onValueChange={(details) => { 
                                            //     field.onChange(details.value[0] ?? ''); 
                                            // }} 
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
                                                        {transactionType.items.map((item) => ( 
                                                            <Select.Item 
                                                                item={item} 
                                                                key={item} 
                                                            > 
                                                                {item} 
                                                                <Select.ItemIndicator /> 
                                                            </Select.Item> 
                                                        ))} 
                                                    </Select.Content> 
                                                </Select.Positioner> 
                                            </Portal> 
                                        </Select.Root> 
                                    {/* )} 
                                /> 
                                {errors.type && ( 
                                    <Field.ErrorText>{errors.type.message}</Field.ErrorText> 
                                )} */}
                            </Field.Root>

                            <Field.Root 
                                required 
                                gap={3} 
                                // invalid={!!errors.name}
                            >
                                <Field.Label 
                                    textTransform="uppercase"
                                    color="fg.muted"
                                >
                                    Name
                                    <Field.RequiredIndicator />
                                </Field.Label>
                                <Input
                                    // {...register("name", { required: "Account name is required" })}
                                    placeholder="Name" 
                                    variant="subtle" 
                                    borderRadius="xl" 
                                    colorPalette={colorPallette} 
                                    autoComplete='off'
                                />
                                {/* {errors.name ? (
                                    <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                                ) : (
                                    <Field.HelperText>example: Cash, BDO, PNB</Field.HelperText>
                                )} */}
                            </Field.Root>

                            {/* Starting Balance */}

                        </Stack>
                    </Dialog.Body>

                    <Dialog.Footer className='flex flex-col md:flex-row'>
                        <Dialog.ActionTrigger asChild>
                            <Button
                                variant="subtle" 
                                type="button" 
                                className="w-full md:w-auto"
                            >
                                Cancel</Button>
                            
                        </Dialog.ActionTrigger>
                        <Button 
                            colorPalette={colorPallette} 
                            type="submit" 
                            // loading={isWorking}
                            // disabled={!isDirty}
                            className="w-full md:w-auto"
                        >
                            {/* {isEditMode ? 'Apply changes' : 'Create'} */}
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
        
        </>
        
    )
}

export default CategoryDialog