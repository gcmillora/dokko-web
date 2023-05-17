"use client";

import { Row } from "@tanstack/react-table";
import {
  BookOpen,
  Check,
  Copy,
  MoreHorizontal,
  Pen,
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

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  data: any;
}

export function DataTableRowActions<TData>({
  row,
  data,
}: DataTableRowActionsProps<TData>) {
  const { toast } = useToast();

  const [type, setType] = useState("");
  const date: [any] = row.getValue("date");
  const patient: [any] = row.getValue("patient");

  const appId: [any] = row.getValue("id");
  const virtual = row.getValue("type") === "Virtual" ? true : false;

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
    </Dialog>
  );
}
