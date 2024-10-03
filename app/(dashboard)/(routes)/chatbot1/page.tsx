"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "./constants";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import useMessageStore from "@/hooks/message-store";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { PaperclipIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { useEdgeStore } from "@/lib/edgestore";
import { useProModal } from "@/hooks/use-pro-modal";

const Conversation = () => {
  const proModal = useProModal();
  const router = useRouter();
  const messages = useMessageStore();
  const { toast } = useToast();
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    // create new thread
    localStorage.setItem("chatbot1FileId", "");
    createThread();
  }, []);

  const createThread = async () => {
    const response = await axios.post("/api/create-thread");
    localStorage.setItem("chatbot1", response.data);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const handleFileChange = async (event: any) => {
    try {
      const file = event.target.files[0] as File;
      if (file) {
        const data = new FormData();
        if (event.target.files.length < 0) return;
        data.append("file", event.target.files[0]);
        const response = await fetch("/api/upload-file", {
          method: "POST",
          body: data,
        });
        const newData = await response.json();
        localStorage.setItem("chatbot1FileId", newData.fileId);
        const res = await edgestore.publicFiles.upload({ file });
        // save data to your database
        await axios.post("/api/save-user-file", {
          url: res.url,
          filename: file.name,
        });
        toast({
          variant: "default",
          title: "Success",
          description: "File uploaded Successfully",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload file again",
      });
    }
  };

  const handleUploadClick = () => {
    // Trigger the file input click
    const input = document.getElementById("fileInput");
    if (input) {
      input.click();
    }
  };

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      messages.addMessage({ role: "user", message_content: values.prompt });
      const response = await axios.post("/api/chatbot-one", {
        userMessage: values.prompt,
        threadId: localStorage.getItem("chatbot1"),
        fileId: localStorage.getItem("chatbot1FileId") || "",
      });

      messages.addMessage({
        role: "bot",
        message_content: response.data.text.value,
      });
      form.reset();
    } catch (error: any) {
      if (error.response.status === 403) proModal.open();
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5.3rem)] border m-3 rounded-xl pb-3 shadow-md bg-white">
      <Button onClick={() =>  window.location.reload()} className="w-fit m-2">New Chat</Button>
      <div className="flex-1 px-4 lg:px-8 overflow-auto">
        <div className="space-y-4 mt-4">
          <div className="flex flex-col gap-y-4">
            {messages.messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <pre className="text-sm whitespace-pre-wrap">
                  {String(message.message_content)}
                </pre>
              </div>
            ))}
          </div>
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.messages.length === 0 && !isLoading && (
            <Empty label="Start Chatting here" />
          )}
        </div>
      </div>
      <div id="Message" className="px-4 lg:px-8 flex items-center">
      <Button
          onClick={handleUploadClick}
          className="bg-transparent col-span-1 lg:col-span-1 hover:bg-sky-200"
        >
          <PaperclipIcon className="text-sky-500" />
        </Button>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
              rounded-lg 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
            "
          >
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }} // Hide the default file input
            />
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10 border px-1 rounded-lg">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="What do you want to talk about?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full bg-sky-500"
              type="submit"
              disabled={isLoading}
              size="icon"
            >
              Send
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Conversation;
