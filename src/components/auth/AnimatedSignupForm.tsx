import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

export default function AnimatedSignupForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();

  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Submit animation
    const tl = gsap.timeline();
    tl.to(formRef.current, {
      scale: 0.98,
      duration: 0.2,
      ease: "power2.inOut",
    });

    try {
      // Loading animation
      tl.to(buttonRef.current, {
        width: 50,
        duration: 0.3,
        ease: "power2.inOut",
      });

      await signup(email, password, name);

      // Success animation
      tl.to(formRef.current, {
        boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)",
        duration: 0.5,
      });

      toast.success("Account created successfully!");
    } catch (error) {
      // Error animation
      tl.to(formRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.5,
        ease: "power2.inOut",
      });

      tl.to(formRef.current, {
        boxShadow: "0 0 15px rgba(255, 0, 0, 0.3)",
        duration: 0.3,
      });

      toast.error("Failed to create account. Please try again.");
      console.error(error);
    } finally {
      // Reset form animations
      tl.to(buttonRef.current, {
        width: "100%",
        duration: 0.3,
        ease: "power2.inOut",
      });

      tl.to(formRef.current, {
        scale: 1,
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        duration: 0.3,
        ease: "power2.inOut",
      });

      setIsSubmitting(false);
    }
  };

  useGSAP(() => {
    if (!formRef.current) return;

    const tl = gsap.timeline();

    // Initial state
    tl.set(
      [
        titleRef.current,
        descriptionRef.current,
        nameRef.current,
        emailRef.current,
        passwordRef.current,
        buttonRef.current,
      ],
      {
        opacity: 0,
        y: 20,
      }
    );

    // Animate in sequence
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    tl.to(
      descriptionRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    );

    tl.to(
      nameRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    );

    tl.to(
      emailRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    );

    tl.to(
      passwordRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    );

    tl.to(
      buttonRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle ref={titleRef} className="text-2xl font-bold">
          Create an account
        </CardTitle>
        <CardDescription ref={descriptionRef}>
          Start tracking your habits and building streaks
        </CardDescription>
      </CardHeader>
      <form ref={formRef} onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div ref={nameRef} className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div ref={emailRef} className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div ref={passwordRef} className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            ref={buttonRef}
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Sign up"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
