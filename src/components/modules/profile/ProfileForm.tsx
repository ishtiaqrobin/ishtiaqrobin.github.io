"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { userService } from "@/services/user.service";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, User, Phone, Mail, Save } from "lucide-react";
import { User as UserType } from "@/types/user.type";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: UserType;
  token: string;
  onSuccess?: () => void;
}

export function ProfileForm({ user, token, onSuccess }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      phone: user.phone || "",
    },
  });

  async function onSubmit(values: ProfileFormValues) {
    setIsLoading(true);
    // Only send name and phone to the info update
    const { error } = await userService.updateProfile(token, values);

    if (error) {
      toast.error("Error", { description: error.message });
    } else {
      toast.success("Profile information updated successfully!");
      if (onSuccess) onSuccess();
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" /> Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    className="h-11 rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" /> Email
              <span className="text-xs text-muted-foreground">
                (Not editable)
              </span>
            </FormLabel>
            <FormControl>
              <Input
                value={user.email}
                disabled
                className="h-11 rounded-xl bg-muted/50"
              />
            </FormControl>
          </FormItem>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" /> Phone
                  Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your phone number"
                    {...field}
                    className="h-11 rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel className="flex items-center gap-2">
              Role
              <span className="text-xs text-muted-foreground">
                (Not editable)
              </span>
            </FormLabel>
            <FormControl>
              <Input
                value={user.role}
                disabled
                className="h-11 rounded-xl bg-muted/50 uppercase"
              />
            </FormControl>
          </FormItem>
        </div>

        <Button
          type="submit"
          // size={"md"}
          className="w-full cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
