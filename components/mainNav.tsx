"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { ModeToggle } from "./mode-toggle";
import { Inbox } from "lucide-react";
import logo from "@/assets/logo/banner-logo.svg";
import Image from "next/image";

interface IMyComponentProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  type: string;
}

export function MainNav({ className, ...props }: IMyComponentProps) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Image src={logo} alt="logo" width={140} height={60} className="" />
      <Link
        href={`/${props?.type}/${props?.id}/`}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href={`/${props?.type}/${props?.id}/appointments`}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Appointments
      </Link>
      <Link
        href={`/${props?.type}/${props?.id}/prescriptions`}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Prescriptions
      </Link>
      {props?.type === "doctor" && (
        <Link
          href={`/${props?.type}/${props?.id}/settings`}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Settings{" "}
        </Link>
      )}
      {props?.type === "patient" && (
        <Link
          href={`/${props?.type}/${props?.id}/record`}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Medical Record
        </Link>
      )}

      <Link
        href={`/${props?.type}/${props?.id}/inbox`}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex flex-row gap-2 items-center"
      >
        <Inbox className="h-4 w-4 text-muted-foreground" />
        Inbox
      </Link>
      <ModeToggle />
    </nav>
  );
}
