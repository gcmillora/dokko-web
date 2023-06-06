"use client";

import { useEffect, useState } from "react";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { addDays, format } from "date-fns";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { Controller, useForm } from "react-hook-form";

import {
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  Dialog,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { DropdownMenu } from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { findAllDoctorQuery } from "@/query/findDoctors";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { insertOneAppointment } from "@/query/insertOneAppointment";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { uuid } from "uuidv4";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Textarea } from "../ui/textarea";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: any;
}

export function DataTableToolbar<TData>({
  table,
  data,
}: DataTableToolbarProps<TData>) {
  const uid = uuid();

  //------------------------
  const createPatient = async (
    userName: string,
    email: string,
    uid: string,
    fullName: string,
    phoneNumber: string
  ) => {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
      cache: new InMemoryCache(),
    });

    const { data } = await client.mutate({
      variables: {
        fullName: fullName,
        email: email,
        address: "Address",
        status: true,
        phoneNumber: phoneNumber,
        uid: uid,
      },
      mutation: gql`
        mutation (
          $fullName: String!
          $email: String!
          $address: String!
          $status: Boolean!
          $phoneNumber: String!
          $uid: String!
        ) {
          createPatient(
            data: {
              fullName: $fullName
              email: $email
              address: $address
              status: $status
              uid: $uid
              phoneNumber: $phoneNumber
            }
          ) {
            data {
              id
              attributes {
                uid
                fullName
                email
                address
                status
                phoneNumber
              }
            }
          }
        }
      `,
    });

    const record = await createMedicalRecord(data);

    return data;
  };

  const createMedicalRecord = async (patientRecord: any) => {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
      cache: new InMemoryCache(),
    });

    const { data } = await client.mutate({
      variables: {
        uid: uid,
        patient: patientRecord.createPatient.data.id,
      },
      mutation: gql`
        mutation ($uid: String!, $patient: ID!) {
          createMedicalRedicord(data: { uid: $uid, patient: $patient }) {
            data {
              attributes {
                uid
                patient {
                  data {
                    id
                    attributes {
                      uid
                      fullName
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });

    return data;
  };

  //---------------------------------------
  async function onSubmit(formData: any) {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_STRAPI_RAW}/api/auth/local/register`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          level: "patient",
          uid: uid,
        }
      )
      .then(async (response) => {
        const res = await createPatient(
          formData.username,
          formData.email,
          uid,
          formData.fullName,
          formData.phoneNumber
        );
        localStorage.setItem("jwtToken", response.data.jwt);
        toast({
          variant: "default",
          title: "Patient created successfully",
          description: "Browser will reload after 5 seconds.",
        });
        setTimeout(() => {
          window.location.reload();
        }, 6000);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error: Couldn't create patient",
          description: "Please try again later or check your information.",
        });
      });
  }
  //-------------------------

  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  //-------------------------

  const { toast } = useToast();
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks... (e.g. John Doe)"
          value={
            (table.getColumn("fullName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("fullName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto h-8 lg:flex">
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Patient</DialogTitle>
              <DialogDescription>
                Create a patient here. Click create when you are done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fullName" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="i.e. Full Name"
                    className="col-span-3"
                    {...register("fullName", {
                      required: true,
                    })}
                  />
                  {errors.fullName && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="i.e. Username"
                    className="col-span-3"
                    {...register("username", {
                      required: true,
                    })}
                  />
                  {errors.username && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    placeholder="juandelacruz@email.com"
                    className="col-span-3"
                    {...register("email", {
                      required: true,
                    })}
                  />
                  {errors.email && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="juandelacruz@email.com"
                    className="col-span-3"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  {errors.password && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phoneNumber" className="text-right">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    placeholder="i.e. 09123456789"
                    className="col-span-3"
                    {...register("phoneNumber", {
                      required: true,
                    })}
                  />
                  {errors.phoneNumber && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address{" "}
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="i.e. 1234 Main St. Brgy. 123"
                    className="col-span-3"
                    {...register("address", {
                      required: true,
                    })}
                  />
                  {errors.address && (
                    <span className="px-1 text-xs text-red-600 col-span-4 -mt-2 text-right ">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
