"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import Link from "next/link";
import { patientAppointmentsQueryByID } from "@/query/patient/findAllAppointmentsByPatients";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      const ids: [any] = row.getValue("id");
      return <div className="w-[80px]">{ids[0]}</div>;
    },
  },
  {
    accessorKey: "condition",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Condition" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("condition")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "doctor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Doctor" />
    ),
    cell: ({ row }) => {
      const data: [any] = row.getValue("doctor");
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{data[0]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const data: [any] = row.getValue("date");
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {data.at(1)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link href={`${row.getValue("uid")}`}>{row.getValue("type")}</Link>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "generalPurpose",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="General Purpose" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("generalPurpose")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[250px] truncate font-medium">
            {row.getValue("status") ? (
              <span>
                {" "}
                <Badge variant="constructive">Approved</Badge>{" "}
              </span>
            ) : (
              <span>
                {" "}
                <Badge variant="destructive">Pending</Badge>{" "}
              </span>
            )}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} data={row.getValue("id")} />;
    },
  },
];
