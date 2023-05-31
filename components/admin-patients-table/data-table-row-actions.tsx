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
import { Textarea } from "../ui/textarea";
import { DeletePatient } from "@/query/deletePatient";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  data: any;
}

export function DataTableRowActions<TData>({
  row,
  data,
}: DataTableRowActionsProps<TData>) {
  const { toast } = useToast();
  const fullName: string = row.getValue("fullName") || "";
  const pId: [any] = row.getValue("id");
  const phoneNumber: string = row.getValue("phoneNumber") || "";
  const email: string = row.getValue("email") || "";
  const address: string = row.getValue("address") || "";

  const [type, setType] = useState("");

  async function deleteDoctor() {
    const response = await DeletePatient(pId[0]);
    if (response.error) {
      toast({
        title: "Deleting patient failed.",
        description: "Please try again later.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Patient deleted successfully.",
        description: "Your appointment has been deleted.",
        variant: "constructive",
      });
    }
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
            <DropdownMenuItem onClick={() => setType("edit")} disabled>
              <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Edit
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {type === "open" && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`Patient ${pId[0]}`}</DialogTitle>

            <DialogDescription>
              View patient information here. Click proceed when you are done.
            </DialogDescription>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullName" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  E-mail
                </Label>
                <Input
                  id="date"
                  value={email}
                  disabled
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phoneNumber"
                  value={phoneNumber}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Textarea
                  id="address"
                  value={address}
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
      {/* 
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
      )}  */}
    </Dialog>
  );
}
