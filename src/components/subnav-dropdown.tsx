"use client";
import NavItem, { MenuItem } from "@/components/nav-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SubnavDropdown({ item }: { item: MenuItem }) {
  return item.subItems && item.subItems.length > 0 ? (
    <Accordion type="single" collapsible className="w-full !border-b-0">
      <AccordionItem value="item-1">
        <AccordionTrigger className="py-2">
          <NavItem item={item} />
        </AccordionTrigger>
        <AccordionContent className="ml-2">
          {item.subItems?.map((subitem: MenuItem) => <NavItem key={subitem.href} item={subitem} />)}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ) : (
    <NavItem item={item} />
  );
}
