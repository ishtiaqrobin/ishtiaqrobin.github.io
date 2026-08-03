"use client";

import React, { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
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
import { toast } from "sonner";
import { PERSONAL_INFO } from "@/utils/constants";
import SocialIcons from "../../shared/SocialIcons";
import { useInView } from "react-intersection-observer";
import {
  initialContactFormState,
  submitContactAction,
} from "@/actions/contact.action";

function ContactSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <HoverButton type="submit" disabled={pending} loading={pending}>
      {pending ? "Sending..." : "Submit"}
    </HoverButton>
  );
}

export function ContactSection() {
  const [state, formAction] = useActionState(
    submitContactAction,
    initialContactFormState,
  );

  const { ref } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      // ✅ was: defaultValue (typo)
      name: "",
      email: "",
      message: "",
    },
  });
  const { reset } = form;

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      reset();
      return;
    }

    toast.error(state.message);
  }, [reset, state.message, state.success]);

  const validateBeforeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (form.formState.isValid) return;

    event.preventDefault();
    void form.trigger();
  };

  return (
    <section ref={ref} className="container-custom py-24 sm:py-28 ">
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
            <form
              action={formAction}
              onSubmit={validateBeforeSubmit}
              className="space-y-4"
            >
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
                <ContactSubmitButton />
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
                priority
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
