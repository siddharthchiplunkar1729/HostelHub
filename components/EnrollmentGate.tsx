'use client';

import React, { useEffect, useState } from 'react';
import { ShieldAlert, Home, Search, Loader2, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
    role: string;
    enrolledHostelId?: string;
    canAccessDashboard?: boolean;
}

export default function EnrollmentGate({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // First try to fetch latest from API
                const token = localStorage.getItem('token');
                const apiRes = await fetch('/api/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (apiRes.ok) {
                    const data = await apiRes.json();
                    const latestUser = data.user;
                    localStorage.setItem('user', JSON.stringify(latestUser));

                    setUser(latestUser);
                    return;
                }

                // Fallback to localStorage
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                } else {
                    router.push('/auth/login');
                }
            } catch (e) {
                console.error('Failed to fetch user session', e);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    if (user?.role === 'Student' && !user.canAccessDashboard) {
        return (
            <div className="min-h-screen bg-light flex items-center justify-center px-6 py-12">
                <div className="max-w-2xl w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-white">
                    <div className="w-24 h-24 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-8">
                        <ShieldAlert size={48} />
                    </div>

                    <h2 className="text-4xl font-black text-dark mb-6">Enrollment Required</h2>
                    <p className="text-xl text-dark-light mb-12">
                        You're almost there! Once your application is **accepted by the warden** (after payment), your dashboard will unlock.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {!user?.enrolledHostelId ? (
                            <Link
                                href="/search"
                                className="flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:shadow-floating transition-all"
                            >
                                <Search size={22} />
                                Find a Hostel
                            </Link>
                        ) : (
                            <button
                                onClick={async () => {
                                    try {
                                        const res = await fetch(`/api/students/${(user as any)._id || (user as any).studentId}/pay`, { method: 'POST' });
                                        if (res.ok) {
                                            window.location.reload();
                                        }
                                    } catch (e) {
                                        console.error('Payment failed');
                                    }
                                }}
                                className="flex items-center justify-center gap-3 px-8 py-5 bg-success text-white rounded-2xl font-bold text-lg hover:shadow-floating transition-all"
                            >
                                <CreditCard size={22} />
                                Pay Hostel Fees
                            </button>
                        )}
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-3 px-8 py-5 bg-dark text-white rounded-2xl font-bold text-lg hover:shadow-floating transition-all"
                        >
                            <Home size={22} />
                            Back to Home
                        </Link>
                    </div>

                    <div className="mt-12 pt-12 border-t border-gray-100 italic text-dark-light/60">
                        Payment status: {user?.enrolledHostelId ? "Paid & Awaiting Review" : "Incomplete"}
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
