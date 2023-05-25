"use client";
import { Plus, Reply } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { findAllDoctorQuery } from "@/query/findDoctors";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { insertOneMessage } from "@/query/insertOneMessage";
import { insertConversation } from "@/query/insertConversation";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { Icon } from "@radix-ui/react-select";
import { doctorDefaultPhoto } from "@/utils/exports";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { updateConversationMessages } from "@/query/updateConversationMessages";

interface InboxProps {
  conversations: [any];
  doctors: [any];
}

export function Inbox({ conversations, doctors }: InboxProps) {
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const { toast } = useToast();
  const [type, setType] = useState("");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function onReply(formData: any) {
    const jwtToken = localStorage.getItem("jwtToken") || "";
    const patientid = localStorage.getItem("id") || "";
    const patientuid = localStorage.getItem("uid") || "";
    const responseMessage = await insertOneMessage(
      formData.message,
      selectedConversation.attributes.patient.data.attributes.fullName,
      selectedConversation.attributes.doctor.data.attributes.fullName,
      selectedConversation.attributes.patient.data.attributes.uid,
      selectedConversation.attributes.doctor.data.attributes.uid,
      jwtToken
    );
    const messages = selectedConversation.attributes.messages.data.map(
      (message: any) => message.id
    );
    const updatedIds = [...messages, responseMessage.createMessage.data.id];
    const updateConversation = await updateConversationMessages(
      updatedIds,
      selectedConversation.id
    );
    if (updateConversation.error) {
      toast({
        title: "Something went wrong.",
        description: "Something went wrong",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Reply has been successfully sent.",
        description: "Message sent",
        variant: "constructive",
      });
    }
  }
  async function onSubmit(formData: any) {
    const jwtToken = localStorage.getItem("jwtToken") || "";
    const patientid = localStorage.getItem("id") || "";
    const patientuid = localStorage.getItem("uid") || "";

    const doctorName = doctors.find(
      (doctor: any) => doctor.id === formData.doctor
    ).attributes.fullName;
    const doctorUID = doctors.find(
      (doctor: any) => doctor.id === formData.doctor
    ).attributes.uid;
    const responseMessage = await insertOneMessage(
      formData.message,
      " ",
      doctorName,
      patientuid,
      doctorUID,
      jwtToken
    );
    const responseConversation = await insertConversation(
      formData.subject,
      patientid,
      formData.doctor,
      responseMessage.createMessage.data.id
    );

    if (responseConversation.error) {
      toast({
        title: "Something went wrong.",
        description: "Something went wrong",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Message has been successfully sent.",
        description: "Message sent",
        variant: "constructive",
      });
    }
  }

  function handleSelectedConversation(conversationId: string) {
    const selected = conversations.find(
      (conversation: any) => conversation.id === conversationId
    );
    setSelectedConversation(selected);
  }

  return (
    <>
      <Dialog>
        <Card className="col-span-2 overflow-y-auto grow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Inbox</CardTitle>
            {/* create button for create message */}
            <DialogTrigger asChild>
              <Button
                className="ml-auto h-8 lg:flex"
                onClick={() => setType("create")}
                variant="outline"
              >
                <Plus height={16} width={16} />
                Create
              </Button>
            </DialogTrigger>
          </CardHeader>
          <CardContent className="pl-6 overflow-y-auto grow">
            {/* make the div scrollable */}
            <div className="flex flex-col  space-y-4 ">
              {conversations.map((conversation) => (
                <div
                  className="flex flex-row items-center justify-between space-y-0 pt-6 pb-6 border-b border-t border-muted "
                  key={conversation.id}
                  onClick={() => handleSelectedConversation(conversation.id)}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={
                          conversation?.attributes?.doctor?.data?.attributes
                            ?.profilepicture?.data?.attributes?.url
                        }
                        alt="@dokko"
                      />
                      <AvatarFallback>DC</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="text-sm font-medium">
                        {conversation.attributes.subject.slice(0, 25) + "..."}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {
                          conversation.attributes.doctor.data.attributes
                            .fullName
                        }
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {conversation.attributes.messages.data[0].attributes.payload.slice(
                          0,
                          25
                        ) + "..."}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(
                      conversation.attributes.createdAt
                    ).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>
              {selectedConversation && (
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex flex-row items-center gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          selectedConversation?.attributes?.doctor?.data
                            ?.attributes?.profilepicture?.data?.attributes?.url
                        }
                        alt="@shadcn"
                      />
                      <AvatarFallback>DC</AvatarFallback>
                    </Avatar>
                    {
                      selectedConversation.attributes.doctor.data.attributes
                        .fullName
                    }
                  </div>
                  <div>
                    <p className="text-muted-foreground font-normal xl:text-sm  ">
                      {new Date(
                        selectedConversation?.attributes?.createdAt
                      ).toLocaleDateString() +
                        " " +
                        "at" +
                        " " +
                        new Date(
                          selectedConversation?.attributes?.createdAt
                        ).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              )}
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          {selectedConversation && (
            <CardContent>
              <div className="flex flex-col space-y-4 justify-between">
                <div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex flex-row items-center gap-4">
                      <p className="font-medium xl:text-2xl  ">
                        {selectedConversation?.attributes?.subject}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="overflow-y-auto">
                      {selectedConversation?.attributes?.messages.data.map(
                        (message: any) => (
                          <div className="flex flex-col mb-4" key={message.id}>
                            <p className="text-xs text-muted-foreground mt-6 mb-2">
                              From {message.attributes.sender_name}
                            </p>
                            <div className="flex flex-row items-center gap-4">
                              <p className="font-normal xl:text-base">
                                {message.attributes.payload}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <DialogTrigger asChild>
                  <div className="border-t">
                    <div
                      className="flex flex-row items-center justify-between pt-4"
                      onClick={() => setType("reply")}
                    >
                      <p className="text-sm text-muted-foreground">
                        {" "}
                        Click here to <span className="font-medium">
                          Reply
                        </span>{" "}
                        to{" "}
                        {
                          selectedConversation?.attributes?.doctor?.data
                            ?.attributes?.fullName
                        }
                      </p>
                      <Reply className="h-6 w-6" />
                    </div>
                  </div>
                </DialogTrigger>
              </div>
            </CardContent>
          )}
        </Card>
        {type === "create" && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Message</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Subject"
                    {...register("subject", { required: true })}
                  />
                </div>
                <div className="flex flex-row items-center gap-2 space-y-2">
                  <Label htmlFor="doctor">To</Label>
                  <Controller
                    control={control}
                    name="doctor"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id}>
                              {doctor.attributes.fullName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="subject">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="i.e. Follow up on appointment"
                    {...register("message", { required: true })}
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button type="submit">Send</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        )}
        {type === "reply" && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Reply to{" "}
                {
                  selectedConversation?.attributes?.doctor?.data?.attributes
                    ?.fullName
                }
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onReply)}>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="i.e. Follow up on appointment"
                    value={selectedConversation?.attributes?.subject}
                    disabled
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="i.e. Follow up on appointment"
                    {...register("message", { required: true })}
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button type="submit">Send</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
