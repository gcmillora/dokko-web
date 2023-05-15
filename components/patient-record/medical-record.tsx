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

export function MedicalRecordCard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Electronic Health Record</CardTitle>
        <CardDescription>
          Please fill-in your basic information.{" "}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="height">Height (centimeters)</Label>
            <Input id="height" placeholder="in centimeters" type="number" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="height">Weight (kg)</Label>
            <Input id="height" placeholder="in kilograms" type="number" />
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
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Blood Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="AB">AB</SelectItem>
                <SelectItem value="O">O</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="allergies">Allergies</Label>
          <Textarea
            id="allergies"
            placeholder="Shrimp, Chicken, Eggs, Peanuts"
          />
        </div>
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}
