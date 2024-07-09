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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formAddUserSchema, IUser } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { memo, SetStateAction, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "../ui/use-toast";

interface IAddUser {
	selectedUser: IUser;
	setSelectedUser: React.Dispatch<SetStateAction<IUser>>;
	fetchUsers: () => void;
}
const UserFormHandler = ({
	selectedUser,
	setSelectedUser,
	fetchUsers,
}: IAddUser) => {
	const form = useForm<z.infer<typeof formAddUserSchema>>({
		resolver: zodResolver(formAddUserSchema),
		defaultValues: {
			name: "",
			age: undefined,
		},
	});
	const isLoading = form.formState.isLoading;

	const addUser = async (name: string, age: number) => {
		await supabase.from("users").insert([{ name, age }]).select();
	};

	const { reset } = form;

	useEffect(() => {
		reset({
			name: selectedUser?.name ?? "",
			age: selectedUser?.age ?? undefined,
		});
	}, [selectedUser, reset]);

	const handleClear = () => {
		setSelectedUser({
			id: "",
			name: "",
			age: 0,
		});
	};

	async function onSubmit(values: z.infer<typeof formAddUserSchema>) {
		if (selectedUser?.id) {
			//Edit user
			await supabase
				.from("users")
				.update({ name: values.name, age: values.age })
				.eq("id", selectedUser?.id)
				.select();
			toast({
				title: "Updated user",
				description: "User has been updated successfully",
			});
			fetchUsers();
		} else {
			// add new user
			addUser(values.name, values.age);
			toast({
				title: "Add user",
				description: "User has been added successfully",
			});
			fetchUsers();
		}
	}

	return (
		<div className='w-[500px] mb-5'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input {...field} placeholder='user name' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='age'
						render={({ field }) => (
							<FormItem>
								<FormLabel>User age</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder='age'
										type='number'
										onChange={e =>
											field.onChange(
												Number(e.target.value)
											)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex justify-between'>
						<Button type='submit'>
							{isLoading ? (
								<span className='flex gap-2 items-center'>
									<LoaderCircle className='animate-spin' />
									Save changes
								</span>
							) : (
								"Submit"
							)}
						</Button>
						<Button
							variant={"ghost"}
							className='border-[2px] border-black-900'
							onClick={handleClear}>
							Clear
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default memo(UserFormHandler);
