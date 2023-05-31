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
import { uuid } from "uuidv4";

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  const uid = uuid();
  const router = useRouter();
  const { toast } = useToast();

  const createPatient = async (
    userName: string,
    email: string,
    uid: string,
    fullName: string
  ) => {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
      cache: new InMemoryCache(),
    });

    const { data } = await client.mutate({
      variables: {
        fullName: fullName,
        email: email,
        address: "address",
        status: true,
        uid: uid,
      },
      mutation: gql`
        mutation (
          $fullName: String!
          $email: String!
          $address: String!
          $status: Boolean!
          $uid: String!
        ) {
          createPatient(
            data: {
              fullName: $fullName
              email: $email
              address: $address
              status: $status
              uid: $uid
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

  const onSubmit = (data: any) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_STRAPI_RAW}/api/auth/local/register`,
        {
          username: data.userName,
          email: data.email,
          password: data.password,
          level: "patient",
          uid: uid,
        }
      )
      .then(async (response) => {
        const res = await createPatient(
          data.userName,
          data.email,
          uid,
          data.fullName
        );
        localStorage.setItem("jwtToken", response.data.jwt);
        toast({
          variant: "default",
          title: "Patient created successfully",
          description: "You will be redirected to login page",
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error: Couldn't create patient",
          description: "Please try again later or check your information.",
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
            <Label className="sr-only" htmlFor="fullName">
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="Juan Dela Cruz"
              type="text"
              autoCapitalize="none"
              autoComplete="fullName"
              autoCorrect="off"
              disabled={isLoading}
              {...register("fullName", {
                required: true,
              })}
            />
            {errors?.fullName && (
              <p className="px-1 text-xs text-red-600">sadf</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Username
            </Label>
            <Input
              id="userName"
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              autoComplete="userName"
              autoCorrect="off"
              disabled={isLoading}
              {...register("userName", {
                required: true,
              })}
            />
            {errors?.userName && (
              <p className="px-1 text-xs text-red-600">sadf</p>
            )}
          </div>
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
            {errors?.email && <p className="px-1 text-xs text-red-600">sadf</p>}
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
              <p className="px-1 text-xs text-red-600">sadf</p>
            )}
          </div>
          <button
            type="submit"
            className={cn(buttonVariants({}))}
            onClick={() => {
              setIsGitHubLoading(true);
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.login className="mr-2 h-4 w-4" />
            )}{" "}
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
