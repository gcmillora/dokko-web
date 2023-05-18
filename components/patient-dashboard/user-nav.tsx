"use client";
import { CreditCard, LogOut, PlusCircle, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { updateOneDoctor } from "@/query/updateOneDoctor";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ModeToggle } from "../mode-toggle";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

interface UserNavProps {
  id: string;
  type: string;
  patient: any;
}

export function UserNavPatient({ id, type, patient }: UserNavProps) {
  const router = useRouter();
  console.log(patient);
  const [file, setFile] = useState<File>();
  const { toast } = useToast();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("file changed");
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const uploadProfile = async () => {
    if (file) {
      console.log(id);
      var formData = new FormData();
      if (type === "doctor") formData.append("ref", "api::doctor.doctor");
      else if (type === "patient")
        formData.append("ref", "api::patient.patient");

      formData.append("refId", id);
      formData.append("field", "profilepicture");
      formData.append("files", file, file?.name);

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_STRAPI_RAW}/api/upload`, {
        method: "POST",
        body: formData,
        redirect: "follow",
      })
        .then((response) => console.log(response.text()))
        .then((result) => {
          toast({
            title: "Profile Picture Updated",
            description: "Your profile picture has been updated",
            variant: "constructive",
          });
        })
        .catch((error) =>
          toast({
            title: "Profile Picture Update Failed",
            description: "Your profile picture has not been updated",
            variant: "destructive",
          })
        );
    }
  };
  const saveDoctorProfileChanges = async () => {
    let up = false;
    if (file) {
      uploadProfile();
      up = true;
    }
  };
  return (
    <Dialog>
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {patient[0].attributes.fullName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {patient[0].attributes.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Change Avatar</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span
              onClick={() => {
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("uid");
                localStorage.removeItem("id");
                router.push("/auth/login");
              }}
            >
              Log out
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile Menu</DialogTitle>
          <DialogDescription>
            This is a profile menu. You can put anything you want in here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profilePicture" className="text-right">
              Profile Picture
            </Label>
            <Input
              id="profilePicture"
              className="col-span-3"
              type="file"
              onChange={(e) => handleFileChange(e)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" className="h-8 px-2 lg:px-3">
            Cancel
          </Button>
          <Button
            variant="default"
            className="h-8 px-2 lg:px-3"
            onClick={() => saveDoctorProfileChanges()}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
