"use client";

import { Row } from "@tanstack/react-table";
import {
  BookOpen,
  CalendarIcon,
  Check,
  Copy,
  MoreHorizontal,
  Pen,
  Plus,
  Star,
  Tags,
  Trash,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { patientAppointmentsQueryByID } from "@/query/patient/findAllAppointmentsByPatients";
import { X } from "lucide-react";
import { updateOneAppointment } from "@/query/updateOneAppointment";
import { useToast } from "../ui/use-toast";
import { updateOneAppointmentById } from "@/query/updateOneAppointment copy";
import { createPatientMeetingToken } from "@/query/video-chat/createPatientMeetingToken";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { insertOneAppointment } from "@/query/insertOneAppointment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  data: any;
}

export function DataTableRowActions<TData>({
  row,
  data,
}: DataTableRowActionsProps<TData>) {
  const [type, setType] = useState("");
  const date: [any] = row.getValue("date");
  const patient: [any] = row.getValue("patient");

  const appId: [any] = row.getValue("id");
  const virtual = row.getValue("type") === "Virtual" ? true : false;
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

  const onSubmit = async (formData: any) => {
    console.log("Form Data: ", formData);

    const jwtToken = localStorage.getItem("jwtToken");
    const id = localStorage.getItem("id") || "";

    const hours = formData.time.split(":")[0];
    const minutes = formData.time.split(":")[1];

    const appDate = new Date(formData.date ? formData.date : selectedDate);
    appDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const appType = virtual ? "Virtual" : "In-Person";
    console.log(appType);
    console.log(formData.condition);
    console.log(formData.generalPurpose);

    const response = await insertOneAppointment(
      jwtToken as string,
      patient.at(2),
      id,
      appDate,
      appType,
      formData.condition,
      formData.notes,
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
  ];

  const processAppointment = async (
    id: string,
    status: boolean,
    virtual: boolean
  ) => {
    const jwtToken = localStorage.getItem("jwtToken") || "";
    const response = await updateOneAppointmentById(id, jwtToken, status);
    if (response.error) {
      toast({
        variant: "destructive",
        title: "Appointment approval failed.",
        description: "Please try again later",
      });
    } else {
      toast({
        variant: "default",
        title: "Approintment has been approved!",
        description: `Your appointment has been created with the following details:\n
          Date: ${new Date(date[0]).toLocaleString()}\n
        `,
      });
    }
    if (virtual === true) {
      console.log("doctor", patient.at(3));
      console.log("appointment", appId[0]);
      console.log("date", date[0]);

      createPatientMeetingToken(patient.at(3), appId[0], date[0]);
    }
    return response;
  };

  function goToVirtualRoom() {
    window.open(`https://dokko.daily.co/${patient.at(3)}?t=${patient.at(4)}`);
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setType("open")}>
              <BookOpen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Open
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setType("edit")}>
              <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setType("follow-up")}>
              <Plus className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Follow-up
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            onClick={() => processAppointment(appId[0], true, virtual)}
          >
            <Check className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Approve
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => processAppointment(appId[0], false, virtual)}
          >
            <X className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Decline
          </DropdownMenuItem>
          {virtual && (
            <DropdownMenuItem
              onClick={() => {
                goToVirtualRoom();
              }}
            >
              <Video className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Virtual Room
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {type === "open" && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`Appointment ${appId[0]}`}</DialogTitle>

            <DialogDescription>
              View your appointment here. Click proceed when you are done.
            </DialogDescription>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Patient Name
                </Label>
                <Input
                  id="patient"
                  value={patient[0]}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  value={new Date(date[0]).toLocaleString()}
                  disabled
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Input
                  id="type"
                  value={row.getValue("type")}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Condition
                </Label>
                <Input
                  id="condition"
                  value={row.getValue("condition")}
                  className="col-span-3"
                  disabled
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button>Proceed</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      )}

      {type === "edit" && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>
              Make changes to your appoitment here. Click save when you are
              done.
            </DialogDescription>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Condition
                </Label>
                <Input
                  id="condition"
                  value={row.getValue("condition")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Input
                  id="notes"
                  value={row.getValue("notes")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="generalpurpose" className="text-right">
                  General Purpose
                </Label>
                <Input
                  id="generalpurpose"
                  value={row.getValue("generalPurpose")}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}

      {type === "follow-up" && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Follow-up</DialogTitle>
            <DialogDescription>
              Make changes to your appoitment here. Click save when you are
              done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
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
                <Label htmlFor="name" className="text-right">
                  Condition
                </Label>
                <Input
                  id="condition"
                  placeholder={row.getValue("condition") || "Condition"}
                  className="col-span-3"
                  {...register("condition", { required: true })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Input
                  id="notes"
                  placeholder="Notes"
                  className="col-span-3"
                  {...register("notes", { required: true })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="generalpurpose" className="text-right">
                  General Purpose
                </Label>
                <Input
                  id="generalpurpose"
                  placeholder={
                    row.getValue("generalPurpose") || "i.e. Follow-up"
                  }
                  className="col-span-3"
                  {...register("generalPurpose", { required: true })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
