'use client'

import { TableCell, TableRow } from '@/components/ui/table'
import { byteConverter } from '@/lib/utils'
import { IFolderAndFile } from '@/types'
import { useUser } from '@clerk/nextjs'
import { format } from 'date-fns'
import { File, Folder, Minus } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import ListAction from './list-action'

interface ListItemProps {
	item: IFolderAndFile
}

const ListItem = ({ item }: ListItemProps) => {
	console.log(item.timestamp.seconds)

	const { user } = useUser()
	return (
		<TableRow className='group cursor-pointer'>
			<TableCell className='font-medium'>
				<div className='flex items-center space-x-1' role='button'>
					{item.size ? (
						<File className='w-4 h-4 text-blue-500' />
					) : (
						<Folder className='w-4 h-4 text-gray-500 fill-gray-500' />
					)}
					<span>{item.name}</span>
				</div>
			</TableCell>
			<TableCell className='flex items-center space-x-2'>
				<Avatar className='w-6 h-6'>
					<AvatarImage src={user?.imageUrl} />
				</Avatar>
				<span className='opacity-75'>me</span>
			</TableCell>
			<TableCell>
				{format(new Date(item.timestamp.seconds * 1000), 'MMM dd, yyyy')}
			</TableCell>
			<TableCell>{item.size ? byteConverter(item.size) : <Minus />}</TableCell>
			<TableCell className='flex justify-end group items-center space-x-2'>
				<ListAction item={item} />
			</TableCell>
		</TableRow>
	)
}

export default ListItem