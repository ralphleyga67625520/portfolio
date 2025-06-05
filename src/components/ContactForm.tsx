"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { TextArea } from "./ui/textarea";
import { motion } from 'motion/react'
interface FormDataType {
    name: string,
    email: string,
    msg: string
}

export function ContactForm() {

    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        email: '',
        msg: ''
    })
    const [successMessage, setSuccessMessage] = useState('');

    const [isSendingMail, setIsSendingMail] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.email || !formData.name || !formData.msg) {
            alert("Please fill all fields")
            return;
        }

        setIsSendingMail(true)


        try {
            const res = await fetch('/api/send-mail', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                console.log("Email sent", res);

                setFormData({ name: '', email: '', msg: '' });
                setSuccessMessage('✅ Your message has been sent successfully!');
            } else {
                console.error("Email not sent");
                setSuccessMessage('❌ Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error("Error sending email:", error);
            setSuccessMessage('❌ Something went wrong. Try again later.');
        }

        setIsSendingMail(false)
    };
    return (
        <motion.div

            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            id="contact" className="mx-auto md:w-1/2 w-full  rounded-none  p-4 md:rounded-2xl md:p-8 ">
            <h2 className="text-4xl sm:text-5xl font-sans text-center font-bold text-black dark:text-neutral-200">
                Contact Me
            </h2>
            <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <Label className="text-lg" htmlFor="text">Name</Label>
                    <Input id="name" placeholder="Your Kind Name" type="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label className="text-lg" htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="Your work email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </LabelInputContainer>
                <LabelInputContainer className="mb-8">
                    <Label className="text-lg" htmlFor="msg">Message</Label>
                    <TextArea
                        value={formData.msg}
                        id="msg"
                        placeholder="Your message here.."
                        onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                    />
                </LabelInputContainer>

                <button
                    className="group/btn relative cursor-pointer block h-10 w-1/4 mx-auto rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                    type="submit"
                >
                    {isSendingMail ? "Sending..." : "Send"}
                    <BottomGradient />
                </button>



            </form>
            {successMessage && (
                <p className="text-center mt-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {successMessage}
                </p>
            )}

        </motion.div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
