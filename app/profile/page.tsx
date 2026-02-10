"use client";

import { useState, useEffect } from 'react';
import { User, Mail, Phone, ShieldCheck, MapPin, Building2, Calendar, Edit3, LogOut, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            router.push('/auth/login');
        }
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        router.push('/');
    };

    if (loading) return null;

    return (
        <div className="min-h-screen bg-light pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:underline">
                    <ChevronLeft size={20} /> Back to Home
                </Link>

                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white">
                    {/* Cover Header */}
                    <div className="h-48 bg-gradient-to-r from-primary via-secondary to-accent relative">
                        <div className="absolute -bottom-16 left-12">
                            <div className="w-32 h-32 rounded-[2.5rem] bg-white p-2 shadow-2xl shadow-dark/20 flex items-center justify-center font-black text-5xl text-primary border-4 border-white">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="pt-24 pb-12 px-12">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                            <div>
                                <h1 className="text-4xl font-black text-dark mb-2">{user?.name}</h1>
                                <div className="flex items-center gap-3 text-dark-light font-bold">
                                    <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest ${user?.role === 'Student' ? 'bg-primary/10 text-primary' : user?.role === 'Warden' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                                        }`}>
                                        {user?.role} Account
                                    </span>
                                    <span>•</span>
                                    <span>Joined Feb 2026</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="px-6 py-3 bg-light text-dark font-black rounded-2xl flex items-center gap-2 hover:bg-gray-200 transition-all">
                                    <Edit3 size={18} /> Edit Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-3 bg-danger/10 text-danger font-black rounded-2xl flex items-center gap-2 hover:bg-danger hover:text-white transition-all shadow-sm"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Contact Details */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-black text-dark mb-4">Contact Details</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-5 bg-light rounded-3xl group hover:bg-white hover:shadow-card transition-all border border-transparent hover:border-gray-100">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-dark-light uppercase tracking-widest mb-1">Email Address</p>
                                            <p className="font-bold text-dark">{user?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-5 bg-light rounded-3xl group hover:bg-white hover:shadow-card transition-all border border-transparent hover:border-gray-100">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary shadow-sm group-hover:scale-110 transition-transform">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-dark-light uppercase tracking-widest mb-1">Phone Number</p>
                                            <p className="font-bold text-dark">{user?.phone || '+91 98765 43210'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Account Status / Links */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-black text-dark mb-4">Account Status</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-5 bg-light rounded-3xl border border-transparent">
                                        <div className="w-12 h-12 bg-success/10 text-success rounded-xl flex items-center justify-center shadow-sm">
                                            <ShieldCheck size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-dark-light uppercase tracking-widest mb-1">Verification Status</p>
                                            <p className="font-bold text-success capitalize">Verified Identity</p>
                                        </div>
                                    </div>

                                    {user?.role === 'Student' && (
                                        <Link href="/dashboard" className="flex items-center gap-4 p-5 bg-primary text-white rounded-3xl shadow-xl shadow-primary/20 hover:scale-105 transition-all group">
                                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white">
                                                <Building2 size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-80">Quick Access</p>
                                                <p className="font-bold">Student Dashboard</p>
                                            </div>
                                            <ChevronLeft size={24} className="rotate-180" />
                                        </Link>
                                    )}

                                    {user?.role === 'Warden' && (
                                        <Link href="/warden" className="flex items-center gap-4 p-5 bg-secondary text-white rounded-3xl shadow-xl shadow-secondary/20 hover:scale-105 transition-all group">
                                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white">
                                                <MapPin size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-80">Quick Access</p>
                                                <p className="font-bold">Warden Panel</p>
                                            </div>
                                            <ChevronLeft size={24} className="rotate-180" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Security / Advanced */}
                        <div className="mt-12 pt-12 border-t border-gray-100 flex flex-wrap gap-8 justify-between items-center opacity-60">
                            <div className="flex gap-8 text-xs font-black uppercase tracking-widest">
                                <a href="#" className="hover:text-primary transition-colors">Privacy Settings</a>
                                <a href="#" className="hover:text-primary transition-colors">Change Password</a>
                                <a href="#" className="hover:text-primary transition-colors">Digital ID</a>
                            </div>
                            <p className="text-[10px] font-bold text-dark-light">ID: {user?._id || user?.id || 'HH-67A8-X92'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
