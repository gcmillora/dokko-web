"use client";

import { Row } from "@tanstack/react-table";
import {
  Check,
  Copy,
  MoreHorizontal,
  Pen,
  Star,
  Tags,
  Trash,
  Video,
  X,
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

import { useState } from "react";

import { DialogClose } from "@radix-ui/react-dialog";
import { patientAppointmentsQueryByID } from "@/query/patient/findAllAppointmentsByPatients";
import { useForm } from "react-hook-form";
import { updateOneAppointment } from "@/query/updateOneAppointment";

import { DeletePatientAppointment } from "@/query/deletePatientAppointment";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateOneAppointmentById } from "@/query/updateOneAppointment copy";
import { createPatientMeetingToken } from "@/query/video-chat/createPatientMeetingToken";
import Link from "next/link";

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
  const doctor: [any] = row.getValue("doctor");
  const patient: [any] = row.getValue("patient");
  const virtual = row.getValue("type") === "Virtual" ? true : false;
  const id: [any] = row.getValue("id");
  const appId: [any] = row.getValue("id");
  const { toast } = useToast();
  console.log(doctor.at(4));
  const status = row.getValue("status") ? false : true;
  const uid = localStorage.getItem("uid") || "";

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function onEdit(formData: any) {
    const jwtToken = localStorage.getItem("jwtToken") || "";
    const response = await updateOneAppointment(id[0], jwtToken, formData);
    if (response.error) {
      toast({
        title: "Updating appointment failed.",
        description: "Please try again later.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Appointment updated successfully.",
        description: "Your appointment has been updated.",
        variant: "constructive",
      });
    }
  }

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
      createPatientMeetingToken(patient.at(3), appId[0], date.at(3));
    }
    return response;
  };

  async function cancelAppointment() {
    const response = await DeletePatientAppointment(id[0]);
    if (response.error) {
      toast({
        title: "Deleting appointment failed.",
        description: "Please try again later.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Appointment deleted successfully.",
        description: "Your appointment has been deleted.",
        variant: "constructive",
      });
    }
  }

  function goToVirtualRoom() {
    window.open(`https://dokko.daily.co/${doctor.at(1)}?t=${doctor.at(4)}`);
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
              <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Open
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
            <DropdownMenuItem onClick={() => goToVirtualRoom()}>
              <Video className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Virtual Room
            </DropdownMenuItem>
          )}
          {status ? (
            <DropdownMenuItem onClick={() => cancelAppointment()}>
              <X className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Cancel
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => cancelAppointment()} disabled>
              <X className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Cancel
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {type === "open" && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`Appointment ${row.getUniqueValues(
              "id"
            )}`}</DialogTitle>
            <DialogDescription>
              View your appointment here. Click proceed when you are done.
            </DialogDescription>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Doctor Name
                </Label>
                <Input
                  id="doctor"
                  value={doctor[0]}
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
              <Link
                href={`/doctor/${uid}/patients/${patient.at(1)}`}
                className="text-xs text-blue-500 text-right"
              >
                View Patient Data
              </Link>
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
          <form onSubmit={handleSubmit(onEdit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Condition
                </Label>
                <Input
                  id="condition"
                  placeholder={row.getValue("condition")}
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
                  placeholder={row.getValue("notes")}
                  className="col-span-3"
                  {...register("notes", { required: true })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="generalPurpose" className="text-right">
                  General Purpose
                </Label>
                <Input
                  id="generalPurpose"
                  placeholder={row.getValue("generalPurpose")}
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