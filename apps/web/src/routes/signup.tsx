import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import z from "zod/v4";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
export const Route = createFileRoute("/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate({
		from: "/",
	});
	const { data, isPending } = authClient.useSession();

	useEffect(() => {
		if (data?.session) {
			navigate({
				to: "/",
			});
		}
	});

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
		onSubmit: async ({ value }) => {
			await authClient.signUp.email(
				{
					email: value.email,
					password: value.password,
					name: value.name,
				},
				{
					onSuccess: () => {
						navigate({
							from: "/login",
							to: "/",
						});
						toast.success("Sign up successful");
					},
					onError: (error) => {
						toast.error(error.error.message || error.error.statusText);
					},
				},
			);
		},
		validators: {
			onSubmit: z.object({
				name: z.string().min(2, "Name must be at least 2 characters"),
				email: z.email("Invalid email address"),
				password: z.string().min(8, "Password must be at least 8 characters"),
			}),
		},
	});

	if (isPending) {
		return <Loader />;
	}

	return (
		<div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-teal-900/20 px-6 text-white">
			{/* Glowing Background */}
			<div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-pink-500/10 blur-3xl" />
			<div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-teal-500/10 blur-3xl delay-1000" />

			{/* Signup Card */}
			<div className="relative z-10 w-full max-w-md rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl">
				<h1 className="mb-6 bg-gradient-to-r from-pink-400 to-teal-400 bg-clip-text text-center font-bold text-4xl text-transparent">
					Create an Account
				</h1>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-6"
				>
					{/* Username */}
					<div>
						<form.Field name="name">
							{(field) => (
								<div className="space-y-2">
									<Label
										className="mb-2 block font-medium text-gray-300 text-sm"
										htmlFor={field.name}
									>
										Name
									</Label>
									<Input
										className="w-full rounded-lg border border-gray-600 bg-gray-900/70 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400"
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									{field.state.meta.errors.map((error) => (
										<p key={error?.message} className="text-red-500">
											{error?.message}
										</p>
									))}
								</div>
							)}
						</form.Field>
					</div>

					{/* Email */}
					<div>
						<form.Field name="email">
							{(field) => (
								<div className="space-y-2">
									<Label
										className="mb-2 block font-medium text-gray-300 text-sm"
										htmlFor={field.name}
									>
										Email
									</Label>
									<Input
										className="w-full rounded-lg border border-gray-600 bg-gray-900/70 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400"
										id={field.name}
										name={field.name}
										type="email"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									{field.state.meta.errors.map((error) => (
										<p key={error?.message} className="text-red-500">
											{error?.message}
										</p>
									))}
								</div>
							)}
						</form.Field>
					</div>

					{/* Password */}
					<div>
						<form.Field name="password">
							{(field) => (
								<div className="space-y-2">
									<Label
										className="mb-2 block font-medium text-gray-300 text-sm"
										htmlFor={field.name}
									>
										Password
									</Label>
									<Input
										className="w-full rounded-lg border border-gray-600 bg-gray-900/70 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400"
										id={field.name}
										name={field.name}
										type="password"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									{field.state.meta.errors.map((error) => (
										<p key={error?.message} className="text-red-500">
											{error?.message}
										</p>
									))}
								</div>
							)}
						</form.Field>
					</div>

					{/* Submit */}
					<form.Subscribe>
						{(state) => (
							<Button
								type="submit"
								disabled={!state.canSubmit || state.isSubmitting}
								className="w-full rounded-full bg-gradient-to-r from-pink-500 to-teal-400 py-3 font-semibold text-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25"
							>
								{state.isSubmitting ? "Submitting..." : "Sign Up"}
							</Button>
						)}
					</form.Subscribe>
				</form>

				{/* Link to Login */}
				<p className="mt-6 text-center text-gray-400 text-sm">
					Already have an account?{" "}
					<Link to="/login">
						<Button className="bg-gradient-to-r from-pink-400 to-teal-400 bg-clip-text font-semibold text-transparent hover:underline">
							Log in
						</Button>
					</Link>
				</p>
			</div>
		</div>
	);
}
