"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { addDays, format } from "date-fns";
import { updateOnePatient } from "@/query/updateOnePatient";
import { useToast } from "@/components/ui/use-toast";
interface BasicHealthRecordProps {
  patient: any;
}
export function BasicHealthRecord({ patient }: BasicHealthRecordProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const { toast } = useToast();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const patientid = localStorage.getItem("id") || "";
    const jwtToken = localStorage.getItem("jwtToken") || "";
    const response = await updateOnePatient(patientid, jwtToken, data);
    if (response.error) {
      toast({
        variant: "destructive",
        title: "Appointment Creation Failed",
        description: "Please try again later",
      });
    } else {
      toast({
        variant: "default",
        title: "Personal Information Updated",
        description: `Your personal information has been updated.
        `,
      });
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal</CardTitle>
        <CardDescription>
          Please fill-in your basic information.{" "}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                disabled
                id="fullName"
                placeholder="Juan Dela Cruz"
                value={patient.fullName}
                {...register("fullName", { required: true })}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact">Contact</Label>
            <Input
              disabled
              id="contact"
              placeholder="09123456789"
              value={patient.phoneNumber}
              {...register("contact", { required: true })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Address</Label>
            <Textarea
              disabled
              id="address"
              value={patient.address}
              placeholder="Please include your appropriate address."
              {...register("address", { required: true })}
            />
          </div>
        </CardContent>

        <CardFooter className="justify-between space-x-2"></CardFooter>
      </form>
    </Card>
  );
}
