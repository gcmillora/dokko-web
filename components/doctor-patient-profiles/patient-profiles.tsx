import { useState } from "react";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface IMyComponentProps extends React.HTMLAttributes<HTMLElement> {
  patients: any;
}

export default function PatientProfiles({ patients }: IMyComponentProps) {
  console.log(patients);
  return (
    <div className="p-8 pt-2">
      <DataTable data={patients} columns={columns} />
    </div>
  );
}
