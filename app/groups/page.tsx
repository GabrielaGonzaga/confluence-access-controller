'use client';

import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import BentoGrid from '@/components/bento-grid';

export default function Home() {
    const [error, setError] = useState<string | null>(null);
    const [groups, setGroups] = useState<any[]>([]);

    useEffect(() => {
        const loadGroups = async () => {
            const res = await fetch('/api/groups');
            const raw = await res.json();
            console.log(raw.results);
            setGroups(raw.results);
        };

        loadGroups();
    }, []);

    return (
        <div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <ScrollArea className="h-[90vh]">
                <div className="container mx-auto">
                    <BentoGrid items={groups} />
                </div>
            </ScrollArea>
        </div>
    );
}
