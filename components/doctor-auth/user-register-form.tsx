"use client";
import { cn } from "@/lib/utils";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import axios from "axios";
import { useRouter } from "next/navigation";

import { uuid } from "uuidv4";
import { useToast } from "../ui/use-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { buttonVariants } from "../ui/button";
import { Icons } from "../icons";

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  const uid = uuid();
  const router = useRouter();
  const { toast } = useToast();
  const [token, setToken] = useState("");

  const roomProperties = {
    name: uid,
    privacy: "private",
    properties: {
      start_audio_off: true,
      start_video_off: true,
    },
  };

  const createMeetingToken = async (
    userName: string,
    email: string,
    uid: string,
    fullName: string
  ) => {
    console.log("creating meeting token for doctor");
    const data = fetch("https://api.daily.co/v1/meeting-tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 31b1e44009c810a075699272ddcbc6d9544cadd81244a1f7d6a22a0d1db55950`,
      },
      body: JSON.stringify({
        properties: {
          room_name: uid,
        },
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log("Success:", data);
        console.log(data.token);
        createDoctor(userName, email, uid, fullName, data.token);
        setToken(data.token);
        const res = await createDoctor(
          userName,
          email,
          uid,
          fullName,
          data.token
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const createDoctor = async (
    userName: string,
    email: string,
    uid: string,
    fullName: string,
    token: string
  ) => {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
      cache: new InMemoryCache(),
    });

    const { data } = await client.mutate({
      variables: {
        fullName: fullName,
        email: email,
        address: "N/A",
        status: true,
        uid: uid,
        meeting_token: token,
      },
      mutation: gql`
        mutation (
          $fullName: String!
          $email: String!
          $address: String!
          $status: Boolean!
          $uid: String!
          $meeting_token: String!
        ) {
          createDoctor(
            data: {
              fullName: $fullName
              email: $email
              address: $address
              status: $status
              uid: $uid
              meeting_token: $meeting_token
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
                meeting_token
              }
            }
          }
        }
      `,
    });

    return data;
  };

  const createRoom = async () => {
    //call api curl
    console.log("creating room");
    const data = fetch("https://api.daily.co/v1/rooms/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 31b1e44009c810a075699272ddcbc6d9544cadd81244a1f7d6a22a0d1db55950`,
      },
      body: JSON.stringify(roomProperties),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onSubmit = (data: any) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_STRAPI_RAW}/api/auth/local/register`,
        {
          username: data.userName,
          email: data.email,
          password: data.password,
          level: "doctor",
          uid: uid,
        }
      )
      .then(async (response) => {
        const room = await createRoom();
        const tk = await createMeetingToken(
          data.userName,
          data.email,
          uid,
          data.fullName
        );

        localStorage.setItem("jwtToken", response.data.jwt);

        toast({
          variant: "default",
          title: "Doctor created successfully",
          description: "You will be redirected to login page",
        });
        setIsLoading(false);
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
              setIsLoading(true);
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
