"use client";

import { useEffect, useState } from "react";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { addDays, format } from "date-fns";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { Controller, useForm } from "react-hook-form";

import {
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  Dialog,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { DropdownMenu } from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { findAllDoctorQuery } from "@/query/findDoctors";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { insertOneAppointment } from "@/query/insertOneAppointment";
import { DialogClose } from "@radix-ui/react-dialog";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: any;
}

export function DataTableToolbar<TData>({
  table,
  data,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  //-------------------------

  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
