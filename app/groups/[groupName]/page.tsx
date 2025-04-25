'use client';

import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BiArrowBack } from 'react-icons/bi';

export default function GroupPage({ params }: { params: { groupName: string } }) {
  const router = useRouter();
  const { groupName } = params;
  const [error, setError] = useState<string | null>(null);
  const [groupsUsers, setGroupsUsers] = useState<any[]>([]);

  useEffect(() => {
    const loadGroups = async () => {
      const res = await fetch(`/api/groups/${groupName}`);
      const raw = await res.json();
      console.log(raw.results);
      setGroupsUsers(raw.results);
    };

    loadGroups();
  }, []);

  return (
    <div className='flex w-full px-16 gap-4'>
      {/* {error && <p className="text-red-500 mb-2">{error}</p>} */}
      <Button variant='outline' onClick={() => router.push('/groups')}>
        <BiArrowBack />
      </Button>
      <ScrollArea className="h-[90vh] w-full">
        <div className="">
          {groupsUsers.length > 0 && (
            <DataTable columns={columns} data={groupsUsers} />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
