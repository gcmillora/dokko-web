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
    accessorKey: "appointment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appointment" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("appointment")}</div>
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
    accessorKey: "diagnosis",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Diagnosis" />
    ),
    cell: ({ row }) => {
      const data: [any] = row.getValue("diagnosis");
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{data[0]}</span>
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
