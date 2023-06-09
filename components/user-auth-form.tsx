"use client";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { useState } from "react";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const findOneUser = async (email: string) => {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
      cache: new InMemoryCache(),
    });
    const { data } = await client.query({
      variables: {
        email: email,
      },
      query: gql`
        query ($email: String!) {
          usersPermissionsUsers(filters: { email: { eq: $email } }) {
            data {
              id
              attributes {
                uid
                email
              }
            }
          }
        }
      `,
    });
    return data;
  };

  const findOneDoctor = async (email: string) => {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
      cache: new InMemoryCache(),
    });
    const { data } = await client.query({
      variables: {
        email: email,
      },
      query: gql`
        query ($email: String!) {
          doctors(filters: { email: { eq: $email } }) {
            data {
              id
              attributes {
                uid
                fullName
                email
              }
            }
          }
        }
      `,
    });
    return data;
  };

  const findOnePatient = async (email: string) => {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
      cache: new InMemoryCache(),
    });
    const { data } = await client.query({
      variables: {
        email: email,
      },
      query: gql`
        query ($email: String!) {
          patients(filters: { email: { eq: $email } }) {
            data {
              id
              attributes {
                uid
                fullName
                email
              }
            }
          }
        }
      `,
    });

    return data;
  };

  const onSubmit = (data: any) => {
    console.log(data);

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_STRAPI_RAW}/api/auth/local`, {
        identifier: data.email,
        password: data.password,
      })
      .then(async (response) => {
        localStorage.setItem("jwtToken", response.data.jwt);
        if (response.data.user.level === "patient") {
          const patient = await findOnePatient(data.email);
          localStorage.setItem("id", patient.patients.data[0].id);
          localStorage.setItem("uid", patient.patients.data[0].attributes.uid);
          router.push(`/patient/${patient.patients.data[0].attributes.uid}`);
        } else if (response.data.user.level === "doctor") {
          const doctor = await findOneDoctor(data.email);
          localStorage.setItem("id", doctor.doctors.data[0].id);
          localStorage.setItem("uid", doctor.doctors.data[0].attributes.uid);
          router.push(`/doctor/${doctor.doctors.data[0].attributes.uid}`);
        } else if (response.data.user.level === "admin") {
          console.log("admin");
          const admin = await findOneUser(data.email);
          localStorage.setItem("id", admin.usersPermissionsUsers.data[0].id);
          localStorage.setItem(
            "uid",
            admin.usersPermissionsUsers.data[0].attributes.uid
          );
          router.push(
            `/admin/${admin.usersPermissionsUsers.data[0].attributes.uid}`
          );
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast({
          variant: "destructive",
          title: "Sign-in failed",
          description: "Invalid email or password. Please try again.",
        });
      });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">Required*</p>
            )}
          </div>
        </div>
        <div className="grid gap-2 mt-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password", {
                required: true,
                minLength: 8,
              })}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">Required*</p>
            )}
          </div>
          <button
            type="submit"
            className={cn(buttonVariants({}))}
            onClick={() => {
              setIsLoading(true);
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.login className="mr-2 h-4 w-4" />
            )}{" "}
            Sign-in
          </button>
        </div>
      </form>
    </div>
  );
}
