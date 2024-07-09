import { useCallback, useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

import UserFormHandler from "./components/add-user";
import UserTable from "./components/user-table";
import { useToast } from "./components/ui/use-toast";

function App() {
	const { toast } = useToast();

	const [selectedUser, setSelectedUser] = useState({
		id: "",
		name: "",
		age: 0,
	});
	const [users, setUsers] = useState([
		{
			id: "",
			name: "",
			age: 0,
		},
	]);

	const fetchUsers = useCallback(async () => {
		const { data, error } = await supabase.from("users").select("*");
		if (data) setUsers(data);
		else console.log(error);
	}, [setUsers]);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const handleSelectUser = (id: string) => {
		const selectUser = users.find(user => user.id === id);
		if (selectUser) {
			setSelectedUser(prev => ({
				...prev,
				...selectUser,
				// age: Number(selectUser.age),
			}));
		}
	};

	const handleDelete = async (id: string) => {
		await supabase.from("users").delete().eq("id", id);
		toast({
			variant: "destructive",
			title: "Deleted user",
			description: "User has been deleted successfully",
		});
		fetchUsers();
	};

	return (
		<div className='flex flex-col h-screen'>
			<h1 className='text-4xl text-center mt-4'>Supabase CRUD</h1>
			{users ? (
				<>
					<section className='h-screen flex flex-col items-center justify-center'>
						<UserFormHandler
							selectedUser={selectedUser}
							setSelectedUser={setSelectedUser}
							fetchUsers={fetchUsers}
						/>
						<UserTable
							users={users}
							handleSelectUser={handleSelectUser}
							handleDelete={handleDelete}
						/>
					</section>
				</>
			) : (
				<div>no users</div>
			)}
		</div>
	);
}
export default App;
