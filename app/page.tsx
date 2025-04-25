'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AtlassianUser } from '@/types/IAtlassianUser';

type UserDetails = {
  displayName: string;
  email: string;
  profilePicture?: {
    path: string;
  };
};

export default function AccessRequestPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [users, setUsers] = useState<AtlassianUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [userFound, setUserFound] = useState<UserDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch('/api/users');
        if (!res.ok) throw new Error('Failed to load users');
        setUsers(await res.json());
      } catch (err) {
        console.error('Error loading users:', err);
      }
    };
    loadUsers();
  }, []);

  const fetchUserDetails = async (accountId: string): Promise<UserDetails> => {
    const response = await fetch(`/api/users/${accountId}`);
    if (!response.ok) throw new Error('Failed to fetch user details');
    return response.json();
  };

  const enableUserAccess = async (accountId: string): Promise<void> => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountId, action: 'enable' }),
    });
    if (!response.ok) throw new Error('Failed to update user lifecycle');
  };

  const requestAccess = async () => {
    if (!email) {
      setError('Please enter your email or name.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setUserFound(null);

    try {
      const matchedUser = users.find(user => 
        user.email === email || user.name === email
      );

      if (!matchedUser) {
        throw new Error('User not found');
      }

      const userData = await fetchUserDetails(matchedUser.account_id);
      setUserFound(userData);
      await enableUserAccess(matchedUser.account_id);

      setTimeout(() => {
        router.push('https://datawake.atlassian.net/wiki/spaces/dw/overview?mode=global');
      }, 2500);

    } catch (err: any) {
      setError(err.message || 'Failed to request access');
    } 
  };

  return (
    <div className="min-h-screen p-6 pt-28">
      <div className="max-w-xl mx-auto mb-10">
        <Card className="w-full p-6">
          <CardContent>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {successMessage && <p className="text-green-600 mb-2">{successMessage}</p>}

            {!userFound ? (
              <div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1">
                    Insira seu Nome ou Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Nome ou Email"
                    required
                  />
                </div>

                <Button 
                  onClick={requestAccess} 
                  disabled={loading} 
                  className="w-full"
                >
                  {loading ? 'Requesting...' : 'Solicitar Acesso'}
                </Button>
              </div>
            ) : (
              <div className="mt-6 flex flex-col items-center">
                <p className="font-semibold">Olá {userFound.displayName}</p>
                
                {userFound.profilePicture && (
                  <img
                    src={`https://datawake.atlassian.net/${userFound.profilePicture.path}`}
                    alt={userFound.displayName}
                    className="w-40 m-6 rounded-full"
                  />
                )}

                <div className='text-center text-md text-gray-500'>
                  <p>{userFound.email}</p>
                  <p>
                    Suas credenciais foram atualizadas. <br />
                    Você será direcionado ao Confluence em breve.
                  </p>
                </div>

                {loading && (
                  <div className="animate-spin w-12 h-12 mt-8 border-2 border-primary border-t-transparent rounded-full" />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}