"use client"

import { useCallback, useState } from "react"
import Link from "next/link"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/_ui/form"
import { Loader2 } from "lucide-react"

import { AuthLayout } from "@/components/layout/auth-layout"
import { Button } from "@/components/_ui/button"
import { Input } from "@/components/_ui/input"
import { signup } from "../_actions"
import { z } from "zod"
import { PasswordInput } from "@/components/_ui/input-password"
import { toast } from "sonner"

const signUpSchema = z
  .object({
    firstName: z
      .string({ message: "First name is required" })
      .min(1, "First name is required"),
    lastName: z
      .string({ message: "Last name is required" })
      .min(1, "Last name is required"),
    email: z
      .string({ message: "Invalid email address" })
      .email("Invalid email address"),
    password: z
      .string({ message: "Password is required" })
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters")
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"]
      })
    }
  })

type SignUpSchema = z.infer<typeof signUpSchema>

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [confirmationStep, setConfirmationStep] = useState(false)

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })
  const { handleSubmit, getValues } = form

  const onSubmit = useCallback(async (formData: SignUpSchema) => {
    const data = signUpSchema.parse(formData)

    setLoading(true)

    await signup(data)
      .then((response) => {
        if (response?.confirmation_sent) {
          setConfirmationStep(response.confirmation_sent)
        }
        if (response?.error) {
          toast.error(response.error)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <AuthLayout>
      {confirmationStep ? (
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-semibold mb-4">📩 Verify your email</h1>
          <p className="text-zinc-600 dark:text-zinc-300 mb-6">
            We have sent an email to{" "}
            <span className="font-medium">{getValues("email")}</span>.
            <br />
            Please, check your inbox and click on the link to activate your
            account.
          </p>

          <div className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
            Not received anything? Check also your spam box.
          </div>
        </div>
      ) : (
        <>
          <h1 className="font-bold text-2xl mb-8">Register</h1>

          <Form {...form}>
            <form
              className="space-y-4 w-[320px] max-w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} autoComplete="new-password" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} autoComplete="new-password" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {loading ? <Loader2 className="animate-spin" /> : "Register"}
              </Button>
            </form>
          </Form>

          <div className="pt-6 text-neutral-400 flex justify-center gap-1">
            Already have an account?
            <Link href={"/sign-in"} className="font-semibold">
              Sign in
            </Link>
          </div>
        </>
      )}
    </AuthLayout>
  )
}
