"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { QueryOneMedicalRecord } from "@/query/findOneMedicalRecord";
import { updateMedicalRecord } from "@/query/updateOneMedicalRecord";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface MedicalRecordCardProps {
  record: any;
}

export function MedicalRecordCard({ record }: MedicalRecordCardProps) {
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

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const onSubmit = async (formData: any) => {
    const uid = localStorage.getItem("uid") || "";
    const medicalRecord = record;
    const weight = parseInt(formData.weight);
    const height = parseInt(formData.height);
    const bdate = new Date(formData.date);
    const data = {
      id: medicalRecord.id,
      sex: formData.sex,
      weight: weight,
      height: height,
      birthdate: bdate,
      bloodtype: formData.bloodType,
      allergies: formData.allergies,
    };
    const response = await updateMedicalRecord(data);
    if (response.error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Medical Record Updated",
        variant: "constructive",
      });
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Electronic Health Record</CardTitle>
        <CardDescription>
          Please fill-in your basic information.{" "}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="height">Height (centimeters)</Label>
              <Input
                id="height"
                placeholder={record?.attributes?.height?.toString() || "in cm"}
                type="number"
                {...register("height", { required: true })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                placeholder={record?.attributes?.weight?.toString() || "in kg"}
                type="number"
                {...register("weight", { required: true })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Birth Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    size="sm"
                    className="w-[240px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate
                      ? format(selectedDate, "dd MMM yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="date"
                    render={({ field }) => (
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          field.onChange(date);
                        }}
                        {...field}
                      />
                    )}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <Controller
                control={control}
                name="bloodType"
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder={
                          record?.attributes?.bloodtype || "Select Type"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodTypes.map((blood) => (
                        <SelectItem key={blood} value={blood}>
                          {blood}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sex">Sex</Label>
            <Controller
              control={control}
              name="sex"
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} {...field}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={record?.attributes?.sex || "Select Bio"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {["Male", "Female"].map((sex) => (
                      <SelectItem key={sex} value={sex}>
                        {sex}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea
              id="allergies"
              placeholder={record?.attributes?.allergies || "Allergies"}
              {...register("allergies")}
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
