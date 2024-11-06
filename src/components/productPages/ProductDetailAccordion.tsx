import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function ProductDetailAccordion() {
    return (
        <Accordion type="multiple" defaultValue={["item-1"]}>
            <AccordionItem value="item-1" className="border-[#D3D3D3]">
                <AccordionTrigger className="text-base">DETAILS</AccordionTrigger>
                <AccordionContent className="">
                    Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-[#D3D3D3]">
                <AccordionTrigger className="text-base">CARE</AccordionTrigger>
                <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-[#D3D3D3]">
                <AccordionTrigger className="text-base">RETURNS</AccordionTrigger>
                <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you prefer.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-[#D3D3D3]">
                <AccordionTrigger className="text-base">DIMENSIONS</AccordionTrigger>
                <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you prefer.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
