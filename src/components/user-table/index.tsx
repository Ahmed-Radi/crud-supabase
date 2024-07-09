import { IUser } from "@/lib/types";
import {
	Table,
	TableBody,
	// TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

type Props = {
	users: IUser[];
	handleSelectUser: (id: string) => void;
	handleDelete: (id: string) => void;
};

const UserTable = ({ users, handleSelectUser, handleDelete }: Props) => {
	return (
		<div className='lg:w-[900px] border-[1px] border-gray rounded-lg'>
			<Table className=''>
				{/* <TableCaption>A list of users.</TableCaption> */}
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px]'>ID</TableHead>
						<TableHead className='w-[100px]'>Name</TableHead>
						<TableHead className='w-[100px]'>Age</TableHead>
						<TableHead className='w-[100px]'>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map(user => (
						<TableRow key={user.id}>
							<TableCell className='font-medium'>
								{user?.id}
							</TableCell>
							<TableCell className='font-medium'>
								{user?.name}
							</TableCell>
							<TableCell className='font-medium'>
								{user?.age}
							</TableCell>
							<TableCell className='font-medium flex gap-2'>
								<Button
									className='bg-blue-500 text-white'
									onClick={() => handleSelectUser(user.id)}>
									Edit
								</Button>
								<Button
									className='bg-red-500 text-white'
									onClick={() => handleDelete(user.id)}>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default UserTable;
