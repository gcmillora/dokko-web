"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
  CardHeader,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";
import { QueryOneMedicalRecord } from "@/query/findOneMedicalRecord";
import { updateMedicalRecord } from "@/query/updateOneMedicalRecord";

async function getMedicalRecord(uid: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    next: {
      revalidate: 5,
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      query: QueryOneMedicalRecord,
      variables: {
        uid: uid,
      },
    }),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log("error");
  }
  return res.json();
}

interface pageProps {
  record: any;
}

export function MedicalRecordCard(record: any) {
  const rec = record.record;

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
    console.log(formData);
    for (const [key, value] of Object.entries(formData)) {
      if (value === "") {
        formData[key] = null;
      }
    }
    const uid = localStorage.getItem("uid") || "";
    const fetchedMedicalRecord = await getMedicalRecord(uid);
    const medicalRecord = fetchedMedicalRecord.data.medicalRedicords.data[0];
    console.log(formData);
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
                placeholder={rec?.attributes?.height?.toString() || "in cm"}
                type="number"
                {...register("height")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                placeholder={rec?.attributes?.weight?.toString() || "in kg"}
                type="number"
                {...register("weight")}
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
                    rules={{}}
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
                rules={{}}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder={
                          rec?.attributes?.bloodtype || "Select Type"
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
              rules={{}}
              render={({ field }) => (
                <Select onValueChange={field.onChange} {...field}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={rec?.attributes?.sex || "Select Bio"}
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
              placeholder={rec?.attributes?.allergies || "Allergies"}
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
