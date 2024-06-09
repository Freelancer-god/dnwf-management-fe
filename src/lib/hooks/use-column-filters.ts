import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

export default function useColumnFilters(initialField = "id", initialValue = "") {
  const [columnFilters, setColumnFilters] = useState([{ id: initialField, value: initialValue }]);

  const debouncedColumnFilters = useDebounce(columnFilters, 300);

  const filterObject = debouncedColumnFilters.reduce((acc, filter) => {
    if (filter.value !== "") {
      acc[filter.id] = filter.value;
    }
    return acc;
  }, {});

  return {
    columnFilters,
    onColumnFiltersChange: setColumnFilters,
    filterObject, // this is format on backend
  };
}
