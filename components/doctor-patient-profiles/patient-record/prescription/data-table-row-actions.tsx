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

import { DialogClose } from "@radix-ui/react-dialog";
import { patientAppointmentsQueryByID } from "@/query/patient/findAllAppointmentsByPatients";
import { useState } from "react";
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
  const diag_pres: [any] = row.getValue("diagnosis");
  const doctor: [any] = row.getValue("doctor");
  const uid = localStorage.getItem("uid") || "";
  const patient: [any] = row.getValue("patient");

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
            <DialogTitle>{`Prescription ${row.getUniqueValues(
              "id"
            )}`}</DialogTitle>
            <DialogDescription>
              View your prescription here. Click proceed when you are done.
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
