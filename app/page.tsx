'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const res = await fetch('/api/groups');

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const raw = await res.json();
        console.log("Raw groups:", raw);

        if (!Array.isArray(raw)) {
          throw new Error('Expected an array of groups');
        }

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
      } catch (err: any) {
        console.error("Error loading users:", err);
        setError('Failed to load users');
      }
    };

    loadGroups();
  }, []);

  // const requestAccess = async () => {
  //   setLoading(true);
  //   setError(null);
  //   setSuccessMessage(null);

  //   if (!email) {
  //     setError('Please enter your email.');
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const matchedUser = users.find((user: any) => user.email === email);
  //     console.log("Matched user:", matchedUser);

  //     if (!matchedUser) {
  //       throw new Error('User not found');
  //     }

  //     await callAtlassianLifecycleAction({
  //       accountId: matchedUser.accountId,
  //       action: 'enable',
  //     });

  //     setStatus('GRANTED');
  //     setSuccessMessage('Access request submitted successfully.');
  //   } catch (err: any) {
  //     console.error(err);
  //     setError(err.message || 'Failed to request access.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-xl mx-auto mb-10">
        <Card className="w-full p-6">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Request Access to Confluence</h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}
            {successMessage && <p className="text-green-600 mb-2">{successMessage}</p>}

            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="your.email@domain.com"
                required
              />
            </div>

            {/* 
            <Button onClick={requestAccess} disabled={loading} className="w-full">
              {loading ? 'Requesting...' : 'Request Access'}
            </Button> 
            */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
