"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Shadcn UI Components Imports
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import ShimmerText from "../../shared/ShimmerText";
import HoverButton from "../../shared/HoverButton";
import { contactSchema, ContactFormValues } from "@/lib/validation";
import { contactService } from "@/services/contact.service";
import { toast } from "sonner";
import { PERSONAL_INFO } from "@/utils/constants";
import SocialIcons from "../../shared/SocialIcons";
import SplitTextReveal from "../../shared/SplitTextReveal";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);

  const { ref } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      // ✅ was: defaultValue (typo)
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsLoading(true);

    try {
      const { error } = await contactService.createContact({
        name: values.name, // ✅ schema uses name, service expects name
        email: values.email,
        subject: "Portfolio Contact Form", // subject is required by service but not in this form's design
        message: values.message,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Message sent successfully!");
        form.reset();
      }
    } catch (error) {
      console.error("Message sending error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={ref} className="container-custom py-24 sm:py-28 select-none">
      <div className="mb-8">
        <ShimmerText className="mb-3.5">Connect With Me</ShimmerText>
        <h2 className="text-4xl sm:text-5xl font-clash font-medium tracking-tight text-secondary leading-12 max-w-2xl">
          Let&apos;s start a project <br /> together
        </h2>

        {/* <SplitTextReveal className="leading-12">
          Let&apos;s start a project <br /> together
        </SplitTextReveal> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
        {/* ─── Left Column (Form) ─── */}
        <div className="lg:col-span-6 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="text-sm leading-4 font-medium text-secondary">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        // placeholder="John Doe"
                        {...field}
                        className="w-full bg-white dark:bg-[#111116] border-zinc-200/80 dark:border-zinc-800/80 h-10 rounded-xl text-base tracking-wide px-3 py-2 transition-all focus-visible:ring-2"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 font-medium" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm leading-4 font-medium text-secondary">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        // placeholder="hello@example.com"
                        {...field}
                        className="w-full bg-white dark:bg-[#111116] border-zinc-200/80 dark:border-zinc-800/80 h-10 rounded-xl text-base tracking-wide px-3 py-2 transition-all focus-visible:ring-2"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 font-medium" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm leading-4 font-medium text-secondary">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        // placeholder="Tell me about your amazing project details..."
                        // rows={15}
                        // cols={30}
                        {...field}
                        className="w-full bg-white dark:bg-[#111116] border-zinc-200/80 dark:border-zinc-800/80 h-24 rounded-xl text-base tracking-wide px-3 py-2 transition-all focus-visible:ring-2"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 font-medium" />
                  </FormItem>
                )}
              />

              <div className="">
                <HoverButton type="submit" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Submit"}
                </HoverButton>
              </div>
            </form>
          </Form>
        </div>

        {/* ─── Right Column (Profile Info Card) ─── */}
        <div className="lg:col-span-6 w-full">
          <div className="w-full bg-white dark:bg-[#111116] border border-zinc-100 dark:border-zinc-800/40 rounded-3xl p-6 flex flex-col items-start shadow-xs">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-[7.5px] bg-[#F7FFF0] dark:bg-[#21291F] border border-emerald-100/50 dark:border-emerald-900/20 rounded-full mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>

              {/* Badge Text */}
              <span className="text-xs leading-4 font-normal text-text-primary tracking-wide">
                Available for work
              </span>
            </div>

            <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden p-2 border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
              <Image
                src={PERSONAL_INFO?.profileImage}
                alt="Ishtiaq Robin"
                width={100}
                height={100}
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            <p className="text-base leading-snug text-text-primary font-normal mt-4 mb-6">
              My inbox is always open. Whether you have a project or just want
              to say Hi. I would love to hear from you. Feel free to contact me
              and I&#39;ll get back to you.
            </p>

            <div>
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
