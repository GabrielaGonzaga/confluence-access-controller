'use client';
import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const loadUsers = async () => {
            const res = await fetch('/api/users');
            const users = await res.json(); 
            setUsers(users);
        };
    
        loadUsers();
    }, []);
    

    return (
        <div >
            <ScrollArea className='h-[90vh]'>
                <div className="container mx-auto">
                    <h3 className="text-lg font-semibold py-4">Users from Confluence</h3>
                    {users && (
                        <DataTable columns={columns} data={users} />
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
