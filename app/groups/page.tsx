'use client';

import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import BentoGrid from '@/components/bento-grid';

export default function Home() {
    const [error, setError] = useState<string | null>(null);
    const [groups, setGroups] = useState<any[]>([]);

    useEffect(() => {
        const loadGroups = async () => {
            try {
                const res = await fetch('/api/groups');

                if (!res.ok) {
                    throw new Error(`Error ${res.status}: ${res.statusText}`);
                }

                const raw = await res.json();
                console.log(raw.results);
                setGroups(raw.results);

            } catch (err: any) {
                console.error("Error loading groups:", err);
                setError(err.message || 'Failed to load groups');
            }
        }; 

        loadGroups();
    }, []);

    return (
        <div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <ScrollArea className="h-[90vh]">
                <div className="container mx-auto">
                    <h3 className="text-lg font-semibold py-4">Groups from Confluence</h3>
                    <BentoGrid items={groups} />
                </div>
            </ScrollArea>
        </div>
    );
}
