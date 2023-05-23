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
  doctors: any;
  patients: any;
}

export function DataTableToolbar<TData>({
  table,
  data,
  doctors,
  patients,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  //-------------------------
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [excludedTimes, setExcludedTimes] = useState<string[]>([]);
  const router = useRouter();
  const { toast } = useToast();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    var times: string[] = [];
    if (selectedDate === undefined) return;
    data.map((appointment: any) => {
      if (appointment.date[1] === selectedDate.toDateString()) {
        console.log(appointment.date[2]);
        times.push(appointment.date[2]);
      }
    });
    setExcludedTimes(times);
    console.log(times);
  }, [selectedDate, data]);

  const onSubmit = async (formData: any) => {
    console.log("Form Data: ", formData);
    const jwtToken = localStorage.getItem("jwtToken");

    const hours = formData.time.split(":")[0];
    const minutes = formData.time.split(":")[1];

    const appDate = new Date(formData.date ? formData.date : selectedDate);
    appDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const response = await insertOneAppointment(
      jwtToken as string,
      formData.patient,
      formData.doctor,
      appDate,
      formData.type,
      formData.condition,
      "Test Notes",
      formData.generalPurpose
    );
    if (response.error) {
      toast({
        variant: "destructive",
        title: "Appointment Creation Failed",
        description: "Please try again later",
      });
    } else {
      toast({
        variant: "default",
        title: "Appointment Created",
        description: `Your appointment has been created with the following details:\n
        Date: ${format(appDate, "MM/dd/yyyy")}\n
        Time: ${format(appDate, "hh:mm a")}\n
        `,
      });
    }
  };

  const allowedTimes = [
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
  ];
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto h-8 lg:flex">
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Appointment</DialogTitle>
              <DialogDescription>
                Create an appointment here. Click create when you are done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Doctor
                  </Label>
                  <Controller
                    control={control}
                    name="doctor"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors.map((doctor: any) => (
                            <SelectItem key={doctor.id} value={doctor.id}>
                              {doctor.fullName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.doctor && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Doctor
                  </Label>
                  <Controller
                    control={control}
                    name="patient"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Patient" />
                        </SelectTrigger>
                        <SelectContent>
                          {patients.map((patient: any) => (
                            <SelectItem key={patient.id} value={patient.id}>
                              {patient.fullName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.doctor && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        size="sm"
                        className="w-[240px] justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate
                          ? format(selectedDate, "dd MMM yyyy")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Controller
                        control={control}
                        rules={{ required: true }}
                        name="date"
                        render={({ field }) => (
                          <Calendar
                            initialFocus
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              setSelectedDate(date);
                              field.onChange(date);
                            }}
                            {...field}
                          />
                        )}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Time
                  </Label>
                  <Controller
                    control={control}
                    name="time"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Time" />
                        </SelectTrigger>
                        <SelectContent>
                          {allowedTimes.map((time) => (
                            <SelectItem
                              key={time}
                              value={time}
                              disabled={excludedTimes.includes(time)}
                            >
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.time && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Type
                  </Label>
                  <Controller
                    control={control}
                    name="type"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Virtual">Virtual</SelectItem>
                          <SelectItem value="Physical">Physical</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.type && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="condition" className="text-right">
                    Condition
                  </Label>
                  <Input
                    id="condition"
                    placeholder="i.e. Condition"
                    className="col-span-3"
                    {...register("condition", {
                      required: true,
                    })}
                  />
                  {errors.condition && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="generalPurpose" className="text-right">
                    General Purpose
                  </Label>
                  <Input
                    id="generalPurpose"
                    placeholder="i.e. General Purpose"
                    className="col-span-3"
                    {...register("generalPurpose", {
                      required: true,
                    })}
                  />
                  {errors.generalPurpose && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
