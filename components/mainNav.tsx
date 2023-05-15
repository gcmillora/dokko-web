"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { ModeToggle } from "./mode-toggle";

interface IMyComponentProps extends React.HTMLAttributes<HTMLElement> {
  patientid: string;
}

export function MainNav({ className, ...props }: IMyComponentProps) {
  console.log("props", props);
  useEffect(() => {
    console.log("props", props);
  }, []);

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href={`/patient/${props?.patientid}/`}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href={`/patient/${props?.patientid}/appointments`}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Appointments
      </Link>
      <Link
        href={`/patient/${props?.patientid}/prescriptions`}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Prescriptions
      </Link>
      <Link
        href={`/patient/${props?.patientid}/prescriptions`}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Medical Record
      </Link>
      <Link
        href={`/patient/${props?.patientid}/settings`}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
      <ModeToggle />
    </nav>
  );
}
