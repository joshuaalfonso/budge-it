import { CURRENCIES } from "@/data/currency";
import { useCurrencyStore } from "@/stores/currency.store";
import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { useColorMode, type ColorMode } from "../ui/color-mode";


const currencies = createListCollection({
    items: Object.values(CURRENCIES).map((currency) => ({
        value: currency.code,
        label: currency.name,
        locale: currency.locale,
    })),
})

const themes = createListCollection({
    items: [
        {
            label: 'Light',
            value: 'light'
        },
        {
            label: 'Dark',
            value: 'dark'
        }
       
    ],
})

const Preferences = () => {

    const currency = useCurrencyStore((state) => state.currency);
    const setCurrency = useCurrencyStore((state) => state.setCurrency);

    const { colorMode, setColorMode } = useColorMode();

    return (
        <section className="space-y-3!">
            <div>
                <h2 className="text-sm! font-semibold! text-(--chakra-colors-fg-muted)">
                    Preferences
                </h2>
                {/* <p className="text-sm! text-(--chakra-colors-fg-subtle)">
                    Customize how your budget tracker works.
                </p> */}
            </div>

            <div className="divide-y! rounded-xl bg-(--chakra-colors-bg-subtle)">
                {/* Currency */}
                <div className="flex items-center justify-between gap-4! px-6! py-3!">
                    <div>
                        <p className="text-sm! font-medium! text-(--chakra-colors-fg-muted)">
                            Currency
                        </p>
                    </div>

                    <Select.Root 
                        collection={currencies} 
                        size="md"
                        variant="ghost"
                        value={[currency]}
                        onValueChange={(details) => {
                            setCurrency(details.value[0] as keyof typeof CURRENCIES)
                        }}
                        width="220px"
                        // colorPalette={'blue'}
                    >
                        <Select.HiddenSelect />
                        <Select.Control>
                            <Select.Trigger borderRadius="xl">
                            <Select.ValueText placeholder="Select" >
                                { CURRENCIES[currency].code } - {CURRENCIES[currency].name}
                            </Select.ValueText>
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                            <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                            <Select.Positioner>
                            <Select.Content>
                                {currencies.items.map((item) => (
                                    <Select.Item item={item} key={item.value} >
                                        {item.value} — {item.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>
                </div>

                {/* Theme */}
                <div className="flex items-center justify-between gap-4! px-6! py-3!">
                    <div>
                        <p className="text-sm! font-medium! text-(--chakra-colors-fg-muted)">
                            Theme
                        </p>
                        {/* <p className="mt-0.5 text-sm text-(--chakra-colors-fg-muted)">
                            Choose your preferred appearance.
                        </p> */}
                    </div>

                     <Select.Root 
                        collection={themes} 
                        size="md"
                        variant="ghost"
                        value={[colorMode]}
                        onValueChange={(details) => {
                            setColorMode(details.value[0] as ColorMode)
                            // console.log(details.value[0])
                        }}
                        width="220px"
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
                                {themes.items.map((item) => (
                                    <Select.Item item={item} key={item.value}>
                                        {item.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>
                </div>

                {/* Notifications */}
                {/* <div className="flex items-center justify-between gap-4 p-4!">
                    <div>
                        <p className="text-sm! font-medium! text-(--chakra-colors-fg-muted)">
                            Budget reminders
                        </p>
                        <p className="mt-0.5 text-sm text-gray-500">
                            Get reminded about your monthly budget.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="relative h-6 w-11 rounded-full bg-gray-900 transition"
                    >
                        <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-(--chakra-colors-bg-muted) shadow-sm" />
                    </button>
                </div> */}
            </div>
        </section>
    )
}

export default Preferences