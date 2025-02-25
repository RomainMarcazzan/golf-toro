"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  htmlFile: z
    .custom<File>((v) => v instanceof File, {
      message: "Please select a file",
    })
    .refine((file) => file.name.endsWith(".html"), {
      message: "File must be an HTML document",
    }),
});

export default function UploadPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("htmlFile", data.htmlFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Upload successful! ✅ Data saved.");
        form.reset();
      } else {
        setMessage("Error: " + result.error);
      }
    } catch (error) {
      setMessage(`Error uploading file: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Upload Weather Report</h1>
        <p className="text-gray-500 text-sm">
          Upload your HTML weather report file to analyze the data.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="htmlFile"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Weather Report File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".html"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
                    }}
                    name={field.name}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  Select an HTML file containing weather data to upload.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Uploading..." : "Upload File"}
          </Button>
        </form>
      </Form>

      {message && (
        <p
          className={`text-center ${
            message.includes("Error") ? "text-red-500" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
