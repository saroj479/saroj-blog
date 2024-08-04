"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";
import { toast } from "react-toastify";
import { Container } from "../ui";

export const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        e.target,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          toast.success("Subscription successful!");
          setLoading(false);
        },
        () => {
          toast.error("Subscription failed. Please try again.");
          setLoading(false);
        }
      );
    setEmail("");
  };

  return (
    <Container className="mb-14 max-w-lg">
      <div className="size-full rounded-lg bg-accent1 px-4 py-5 md:px-10 md:py-8">
        <p className="text-xl font-bold text-tertiary">Subscribe</p>
        <p className="text-sm text-tertiary-70">
          Provide your email to stay updated with my blogs
        </p>
        <form
          onSubmit={handleSubmit}
          className="relative mt-4 overflow-hidden rounded-lg"
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Write your email"
            className="animation w-full rounded-lg border-none px-4 py-2 outline-none bg-background-90 md:py-2.5"
          />
          <div className="absolute inset-y-0 right-0 p-0.5">
            <button
              type="submit"
              className="animation h-full rounded-md px-4 py-1 text-sm text-tertiary bg-accent1-90 hover:bg-accent1 md:text-base"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};
