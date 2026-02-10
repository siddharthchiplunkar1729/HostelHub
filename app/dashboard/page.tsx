"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import QuickActionsCard from '@/components/QuickActionsCard';
import ComplaintForm from '@/components/ComplaintForm';
import ComplaintCard from '@/components/ComplaintCard';
import MessMenuCard from '@/components/MessMenuCard';
import NoticeCard from '@/components/NoticeCard';
import { Building2, Users2, MapPin, Calendar } from 'lucide-react';

export default function DashboardPage() {
    const router = useRouter();
    const [showComplaintForm, setShowComplaintForm] = useState(false);
    const [student, setStudent] = useState<any>(null);
    const [complaints, setComplaints] = useState<any[]>([]);
    const [messMenu, setMessMenu] = useState<any>(null);
    const [notices, setNotices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/auth/login');
            return;
        }

        const user = JSON.parse(storedUser);
        if (user.role === 'Student' && !user.canAccessDashboard) {
            router.push('/search');
            return;
        }

        if (!user.studentId) {
            setLoading(false);
            return;
        }

        fetchDashboardData(user.studentId);
    }, []);

    const fetchDashboardData = async (studentId: string) => {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };

        try {
            // Fetch student info
            const studentRes = await fetch(`/api/students/${studentId}`, { headers });
            if (studentRes.ok) {
                const studentData = await studentRes.json();
                setStudent(studentData);
            }

            // Fetch recent complaints
            const complaintsRes = await fetch(`/api/complaints?studentId=${studentId}&limit=3`, { headers });
            if (complaintsRes.ok) {
                const complaintsData = await complaintsRes.json();
                setComplaints(complaintsData);
            }

            // Fetch today's mess menu
            const today = new Date().toISOString().split('T')[0];
            const menuRes = await fetch(`/api/mess-menu?date=${today}`, { headers });
            if (menuRes.ok) {
                const menuData = await menuRes.json();
                setMessMenu(menuData);
            }

            // Fetch recent notices
            const noticesRes = await fetch(`/api/notices?limit=3`, { headers });
            if (noticesRes.ok) {
                const noticesData = await noticesRes.json();
                setNotices(noticesData);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-light pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-dark-light font-medium">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-light pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-start gap-6 bg-white rounded-2xl p-6 shadow-card">
                        {/* Profile Photo */}
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {student?.name?.charAt(0) || 'S'}
                        </div>

                        {/* Student Info */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-extrabold text-dark mb-2">
                                Welcome back, {student?.name || 'Student'}! 👋
                            </h1>
                            <div className="flex flex-wrap gap-4 text-sm text-dark-light">
                                <div className="flex items-center gap-2">
                                    <Building2 size={16} className="text-primary" />
                                    <span className="font-semibold">
                                        Room {student?.roomNumber || 'Not Assigned'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-secondary" />
                                    <span>{student?.course || 'Engineering'} • Year {student?.year || 1}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-accent" />
                                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>

                        {/* Fee Status Badge */}
                        <div className={`px-4 py-2 rounded-xl ${student?.feeStatus?.isPaid
                            ? 'bg-success-light text-success'
                            : 'bg-danger-light text-danger'
                            }`}>
                            <p className="text-xs font-semibold mb-1">Fee Status</p>
                            <p className="text-lg font-bold">
                                {student?.feeStatus?.isPaid ? '✓ Paid' : '! Due'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <QuickActionsCard onSubmitComplaint={() => setShowComplaintForm(true)} />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Complaints & Roommates */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* My Complaints */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-dark">My Complaints</h2>
                                <a href="/complaints" className="text-primary font-semibold hover:underline">
                                    View All →
                                </a>
                            </div>
                            {complaints.length > 0 ? (
                                <div className="space-y-4">
                                    {complaints.map((complaint) => (
                                        <ComplaintCard key={complaint._id} complaint={complaint} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl p-12 text-center shadow-card">
                                    <div className="text-5xl mb-3">✨</div>
                                    <p className="text-dark-light">No active complaints</p>
                                </div>
                            )}
                        </div>

                        {/* Roommates */}
                        <div>
                            <h2 className="text-2xl font-bold text-dark mb-4">My Roommates</h2>
                            <div className="bg-white rounded-2xl p-6 shadow-card">
                                <div className="flex items-center gap-4">
                                    <Users2 size={48} className="text-primary" />
                                    <div>
                                        <p className="text-lg font-bold text-dark">
                                            {student?.roommateIds?.length || 0} Roommates
                                        </p>
                                        <p className="text-sm text-dark-light">View profiles and compatibility</p>
                                    </div>
                                    <button className="ml-auto px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-all">
                                        View All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Menu & Notices */}
                    <div className="space-y-8">
                        {/* Today's Mess Menu */}
                        <div>
                            <h2 className="text-2xl font-bold text-dark mb-4">Today's Menu</h2>
                            {messMenu ? (
                                <div className="space-y-4">
                                    <MessMenuCard menu={messMenu} />
                                    <Link href="/dashboard/mess-menu" className="block w-full text-center py-4 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-primary font-bold hover:border-primary transition-all">
                                        View Full Weekly Menu
                                    </Link>
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl p-8 text-center shadow-card">
                                    <div className="text-4xl mb-2">🍽️</div>
                                    <p className="text-dark-light">Menu not available</p>
                                </div>
                            )}
                        </div>

                        {/* Recent Notices */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-dark">Notices</h2>
                                <Link href="/dashboard/notices" className="text-primary font-semibold hover:underline">
                                    View All →
                                </Link>
                            </div>
                            {notices.length > 0 ? (
                                <div className="space-y-4">
                                    {notices.slice(0, 2).map((notice) => (
                                        <NoticeCard key={notice._id} notice={notice} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl p-8 text-center shadow-card">
                                    <div className="text-4xl mb-2">📢</div>
                                    <p className="text-dark-light">No new notices</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Complaint Form Modal */}
            {showComplaintForm && student && (
                <ComplaintForm
                    onClose={() => {
                        setShowComplaintForm(false);
                        if (student._id) fetchDashboardData(student._id);
                    }}
                    studentId={student._id}
                />
            )}
        </div>
    );
}
