import { ZodDate, ZodObject } from "zod";
import { READ_FIELDS_EXCLUDE } from "@/lib/constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // Import the relativeTime plugin
import { ColumnDef } from "@tanstack/react-table";
import { snakeToHumanReadable, unwrapZodSchema } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/vi";

export function dynamicColumns<T>(schema: ZodObject<any>) {
  dayjs.extend(relativeTime);
  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localeData);
  dayjs.locale("vi");

  return Object.entries(schema.shape)
    .map(([key, value]) => {
      if (READ_FIELDS_EXCLUDE.includes(key)) return null;

      let tableCol: ColumnDef<T> = {
        id: key,
        accessorKey: key,
        header: ({ column }) => <DataTableColumnHeader column={column} title={snakeToHumanReadable(key)} />,
      };

      const schemaInstance = unwrapZodSchema(value);

      if (schemaInstance instanceof ZodDate) {
        tableCol = {
          ...tableCol,
          accessorFn: (d) => d[key] && dayjs(d[key]).tz("Asia/Ho_Chi_Minh").fromNow(),
        };
      }

      return tableCol;
    })
    .filter((column) => column !== null) as ColumnDef<T>[];
}
