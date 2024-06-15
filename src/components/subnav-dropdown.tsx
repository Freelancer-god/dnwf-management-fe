"use client";
import NavItem from "@/components/nav-item";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MenuItem } from "@/types/menu-item";

export default function SubnavDropdown({ item }: { item: MenuItem }) {
  const hasSubNav = item.subItems && item.subItems.length > 0;

  return hasSubNav ? (
    <Accordion type="single" collapsible className="w-full !border-b-0">
      <AccordionItem value="item-1">
        <AccordionTrigger className="">
          <NavItem item={item} />
        </AccordionTrigger>
        <AccordionContent className="ml-2">
          {item.subItems?.map((subitem: MenuItem) => <SubnavDropdown key={subitem.href} item={subitem} />)}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ) : (
    <NavItem item={item} />
  );
}
