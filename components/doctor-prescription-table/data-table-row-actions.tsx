"use client";

import { Row } from "@tanstack/react-table";
import {
  Copy,
  MoreHorizontal,
  Pen,
  Star,
  Tags,
  Trash,
  Download,
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

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  data: any;
}

export function DataTableRowActions<TData>({
  row,
  data,
}: DataTableRowActionsProps<TData>) {
  const [type, setType] = useState("");
  const id: [any] = row.getValue("id");
  const diag_pres: [any] = row.getValue("diagnosis");
  const patient: [any] = row.getValue("patient");

  async function onSubmit(formData: any) {
    console.log(formData);
  }
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
          <DropdownMenuItem>
            <Download className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Download
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {type === "open" && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`Prescription ${id[0]}`}</DialogTitle>
            <DialogDescription>
              View your prescription here. Click proceed when you are done.
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
                <Label htmlFor="type" className="text-right">
                  Diagnosis
                </Label>
                <Input
                  id="type"
                  value={diag_pres[0]}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Prescription
                </Label>
                <Input
                  id="type"
                  value={diag_pres.at(1)}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Notes
                </Label>
                <Input
                  id="type"
                  value={diag_pres.at(2)}
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
            <DialogTitle>{`Edit Prescription ${id[0]}`}</DialogTitle>
            <DialogDescription>
              View your prescription here. Click proceed when you are done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Patient Name
                </Label>
                <Input
                  id="patient"
                  placeholder={patient[0] || "Patient Name"}
                  className="col-span-3"
                  disabled
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Diagnosis
                </Label>
                <Input
                  id="type"
                  placeholder={diag_pres[0] || "Diagnosis"}
                  className="col-span-3"
                  {...register("diagnosis", { required: true })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Prescription
                </Label>
                <Input
                  id="type"
                  placeholder={diag_pres.at(1) || "Prescription"}
                  className="col-span-3"
                  {...register("prescription", { required: true })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Notes
                </Label>
                <Input
                  id="type"
                  placeholder={diag_pres.at(2) || "Notes"}
                  className="col-span-3"
                  {...register("notes", { required: true })}
                />
              </div>
            </div>
            <DialogFooter>
              <>
                <Button type="submit">Confirm</Button>
              </>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
