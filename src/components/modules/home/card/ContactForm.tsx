// "use client";

// import { useState } from "react";
// // import { motion } from "framer-motion";
// import { motion } from "motion/react";

// import { Send, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { contactService } from "@/services/contact.service";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent } from "@/components/ui/card";

// export function ContactForm() {
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     const data = {
//       name: formData.get("name") as string,
//       email: formData.get("email") as string,
//       subject: formData.get("subject") as string,
//       message: formData.get("message") as string,
//     };

//     setLoading(true);
//     try {
//       const result = await contactService.sendMessage(data);
//       if (result.success) {
//         toast.success("Message sent successfully!");
//         (e.target as HTMLFormElement).reset();
//       } else {
//         toast.error(result.message || "Failed to send message.");
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred. Please try again.");
//       console.error("Contact Form Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 30 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.6 }}
//       viewport={{ once: true }}
//       className="lg:col-span-7 h-full"
//     >
//       <Card className="p-0 h-full rounded-3xl border-none shadow-lg hover:shadow-2xl shadow-primary-400/30 hover:shadow-primary-400/50 backdrop-blur-2xl group transition-all duration-500">
//         <CardContent className="p-8 sm:p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="name"
//                   className="text-sm font-bold ml-1 text-muted-foreground tracking-wider"
//                 >
//                   Your Name
//                 </Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   placeholder="John Doe"
//                   required
//                   className="rounded-xl h-12 transition-all duration-300"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="email"
//                   className="text-sm font-bold ml-1 text-muted-foreground tracking-wider"
//                 >
//                   Your Email
//                 </Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="john@example.com"
//                   required
//                   className="rounded-xl h-12 transition-all duration-300"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label
//                 htmlFor="subject"
//                 className="text-sm font-bold ml-1 text-muted-foreground tracking-wider"
//               >
//                 Subject
//               </Label>
//               <Input
//                 id="subject"
//                 name="subject"
//                 placeholder="How can I help you?"
//                 required
//                 className="rounded-xl h-12 transition-all duration-300"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label
//                 htmlFor="message"
//                 className="text-sm font-bold ml-1 text-muted-foreground tracking-wider"
//               >
//                 Message
//               </Label>
//               <Textarea
//                 id="message"
//                 name="message"
//                 placeholder="Write your message here..."
//                 required
//                 className="rounded-2xl min-h-[156px] transition-all duration-300 resize-none p-4"
//               />
//             </div>

//             <Button
//               type="submit"
//               variant="default"
//               size="lg"
//               disabled={loading}
//               className="w-full transition-all duration-500 cursor-pointer"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Sending...
//                 </>
//               ) : (
//                 <>
//                   <Send className="mr-2 h-4 w-4" />
//                   Send Message
//                 </>
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { contactService } from "@/services/contact.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);
    try {
      const { data, error } = await contactService.createContact({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string,
        message: (formData.get("message") as string) || undefined,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Message sent successfully!");
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Contact Form Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="lg:col-span-7 h-full"
    >
      <Card className="p-0 h-full rounded-3xl border-none shadow-lg hover:shadow-2xl shadow-primary-400/30 hover:shadow-primary-400/50 backdrop-blur-2xl group transition-all duration-500">
        <CardContent className="p-8 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-bold ml-1 text-muted-foreground tracking-wider"
                >
                  Your Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="rounded-xl h-12 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-bold ml-1 text-muted-foreground tracking-wider"
                >
                  Your Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="rounded-xl h-12 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="subject"
                className="text-sm font-bold ml-1 text-muted-foreground tracking-wider"
              >
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                placeholder="How can I help you?"
                required
                className="rounded-xl h-12 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-sm font-bold ml-1 text-muted-foreground tracking-wider"
              >
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                required
                className="rounded-2xl min-h-[156px] transition-all duration-300 resize-none p-4"
              />
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={loading}
              className="w-full transition-all duration-500 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
