"use client";

import { useEffect, useState } from "react";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
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
import { insertOnePrescription } from "@/query/insertOnePrescription";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: any;
  appointments: any;
}

export function DataTableToolbar<TData>({
  table,
  data,
  appointments,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  //-------------------------

  const router = useRouter();
  const { toast } = useToast();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: any) => {
    const patientid = appointments.find(
      (appointment: any) => appointment.id[0] === formData.appointment
    ).patient[2];
    const jwtToken = localStorage.getItem("jwtToken") || "";
    const response = await insertOnePrescription(
      jwtToken,
      patientid,
      appointments[0].doctor[2],
      formData.prescription,
      true,
      formData.appointment,
      formData.notes,
      formData.diagnosis
    );

    if (response.error) {
      toast({
        variant: "destructive",
        title: "Prescription Creation Failed",
        description: "Please try again later",
      });
    } else {
      toast({
        variant: "constructive",
        title: "Prescription Created",
        description: `Your appointment has been created with the following details:\n
        Diagnosis: ${formData.diagnosis}\n
        Prescription: ${formData.prescription}\n
        `,
      });
    }
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={
            (table.getColumn("appointment")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("appointment")?.setFilterValue(event.target.value)
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto h-8 lg:flex">
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Prescription</DialogTitle>
              <DialogDescription>
                Create a prescription here. Click create when you are done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="appointment" className="text-right">
                    Appointment
                  </Label>
                  <Controller
                    control={control}
                    name="appointment"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select Appointment" />
                        </SelectTrigger>
                        <SelectContent>
                          {appointments.map((appointment: any) => (
                            <SelectItem
                              key={appointment.id}
                              value={appointment.id[0]}
                            >
                              {`#${appointment.id[0]} | ${appointment.patient[0]}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.appointment && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="diagnosis" className="text-right">
                    Diagnosis
                  </Label>
                  <Input
                    id="diagnosis"
                    placeholder="i.e. Diagnosis"
                    className="col-span-3"
                    {...register("diagnosis", {
                      required: true,
                    })}
                  />

                  {errors.diagnosis && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prescription" className="text-right">
                    Prescription
                  </Label>
                  <Textarea
                    id="prescription"
                    placeholder="i.e. Ibruofen"
                    className="col-span-3"
                    {...register("prescription", {
                      required: true,
                    })}
                  />
                  {errors.prescription && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Input
                    id="notes"
                    placeholder="i.e. Stay hydrated, and eat healthy"
                    className="col-span-3"
                    {...register("notes", {
                      required: true,
                    })}
                  />
                  {errors.notes && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
