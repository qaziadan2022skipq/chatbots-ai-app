"use client";

import { User2Icon } from "lucide-react";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import Heading from "@/components/heading";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().optional(),
  phoneNumber: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const ManageAccount = () => {
  const { user } = useUser();
  const [full_name, set_full_name] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const { toast } = useToast();

  const emailAddress = user?.primaryEmailAddress?.emailAddress;
  const fullName = user?.publicMetadata.fullName as string;
  const phoneNumber = user?.publicMetadata.phoneNumber as string;

  useEffect(() => {
    set_full_name(fullName);
    set_phone_number(phoneNumber);
    console.log(full_name, phone_number);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: full_name,
      phoneNumber: phone_number,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await axios.post("/api/user_metadata", {
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
    });
    toast({
      variant: "default",
      title: "Success",
      description: "Profile updated successfully",
    });
    console.log(response.data);
  }
  return (
    <div className="h-[calc(100vh-5.3rem)] border m-3 rounded-lg p-3 shadow-md bg-white">
      <Heading
        title="Manage Account"
        description="Manage your account here"
        icon={User2Icon}
        iconColor="text-sky-500"
        bgColor="bg-sky-500/10"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-lg 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input placeholder={fullName} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input placeholder={emailAddress} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder={phoneNumber} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="mt-6 col-span-12 lg:col-span-12 bg-sky-500 hover:bg-white hover:text-sky-500 hover:ring-1"
            type="submit"
          >
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ManageAccount;
