"use client";

import { Row } from "@tanstack/react-table";
import {
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
import { useForm } from "react-hook-form";
import { updateOneAppointment } from "@/query/updateOneAppointment";
import { useToast } from "../ui/use-toast";

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
  const virtual = row.getValue("type") === "Virtual" ? true : false;
  const id: [any] = row.getValue("id");
  const { toast } = useToast();
  console.log(doctor.at(4));

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
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setType("edit")}>
              <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          {virtual && (
            <DropdownMenuItem onClick={() => goToVirtualRoom()}>
              <Video className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Virtual Room
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
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
