'use client';
import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const loadGroups = async () => {
            try {
                const res = await fetch('/api/groups');
                const raw = await res.json();
                const simplified = raw.map((user: any) => {
                    const flat: Record<string, any> = {};
                    for (const key in user) {
                        flat[key] = typeof user[key] === 'object' && user[key] !== null
                            ? JSON.stringify(user[key])
                            : user[key];
                    }
                    return flat;
                });
                setUsers(simplified);
            } catch (err) {
                console.error(err);
                setError('Failed to load users');
            }
        };

        loadGroups();
    }, []);

    return (
        <div >
            {error && <p className="text-red-500 mb-2">{error}</p>}
                <ScrollArea className='h-[90vh]'>
                        <div className="container mx-auto">
                        <h3 className="text-lg font-semibold py-4">Users from Confluence</h3>
                            <DataTable columns={columns} data={users} />
                        </div>
                </ScrollArea>
        </div>
    );
}
