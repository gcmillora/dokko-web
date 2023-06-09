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
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import { addDays, format } from "date-fns";
import { updateOnePatient } from "@/query/updateOnePatient";
import { useToast } from "../ui/use-toast";

export function BasicHealthRecord() {
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
    console.log(data);
    const patientid = localStorage.getItem("id") || "";
    console.log(patientid);
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
                id="fullName"
                placeholder="Juan Dela Cruz"
                {...register("fullName", { required: true })}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              placeholder="09123456789"
              {...register("contact", { required: true })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Address</Label>
            <Textarea
              id="address"
              placeholder="Please include your appropriate address."
              {...register("address", { required: true })}
            />
          </div>
        </CardContent>

        <CardFooter className="justify-between space-x-2">
          <Button variant="ghost">Cancel</Button>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
