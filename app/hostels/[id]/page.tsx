"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Star, MapPin, Shield, Utensils, Wifi, Dumbbell,
    BookOpen, Video, Users, CheckCircle, ChevronLeft,
    ArrowRight, MessageSquare, ThumbsUp, Loader2, Camera, LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';

interface Review {
    _id: string;
    studentId: string;
    rating: number;
    reviewText: string;
    helpful: number;
    photos: string[];
    createdAt: string;
}

interface Hostel {
    _id: string;
    blockName: string;
    type: string;
    description: string;
    totalRooms: number;
    availableRooms: number;
    facilities: string[];
    images: string[];
    virtualTourUrl?: string;
    rating: number;
    averageRating: number;
    totalReviews: number;
    reviews: Review[];
    wardenInfo: {
        name: string;
        phone: string;
        email: string;
    };
    rooms?: {
        roomNumber: string;
        status: 'Available' | 'Full';
        occupants: number;
        capacity: number;
    }[];
}

const facilityIcons: { [key: string]: any } = {
    'WiFi': Wifi,
    'Gym': Dumbbell,
    'Library': BookOpen,
    'Mess': Utensils,
};

export default function HostelDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [hostel, setHostel] = useState<Hostel | null>(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        if (id) fetchHostelDetails();
    }, [id]);

    const fetchHostelDetails = async () => {
        try {
            const res = await fetch(`/api/hostel-blocks/${id}`);
            if (res.ok) {
                const data = await res.json();
                setHostel(data);
            }
        } catch (error) {
            console.error('Error fetching hostel details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async () => {
        // Auth Check
        const token = localStorage.getItem('token');
        if (!token) {
            router.push(`/auth/login?returnUrl=/hostels/${id}`);
            return;
        }

        setApplying(true);
        try {
            // Verify token and get user/student ID
            const authRes = await fetch('/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!authRes.ok) {
                // Token invalid or expired
                router.push(`/auth/login?returnUrl=/hostels/${id}`);
                return;
            }

            const authData = await authRes.json();

            if (authData.user.role !== 'Student') {
                alert('Only students can apply for hostels.');
                setApplying(false);
                return;
            }

            if (!authData.student) {
                alert('Student profile not found. Please contact support.');
                setApplying(false);
                return;
            }

            // Use actual student ID from auth
            // authData.student might be an ID or object depending on my 'me' route port implementation
            // In my port, I returned 'studentData' which is the whole row or ID.
            // Let's assume it's the ID if it's a string, or .id if object.
            const studentId = typeof authData.student === 'string' ? authData.student : authData.student.id;

            const res = await fetch('/api/applications/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    studentId: studentId,
                    hostelBlockId: id,
                    applicationData: {
                        preferredRoomType: 'Double Share',
                        moveInDate: new Date()
                    }
                })
            });

            if (res.ok) {
                alert('Applied! Visit hostel in 12hrs to confirm admission.');
                router.push('/dashboard');
            } else {
                const err = await res.json();
                alert(err.error || 'Failed to submit application.');
            }
        } catch (error) {
            alert('Failed to submit application. Please try again.');
            console.error(error);
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        );
    }

    if (!hostel) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center text-center px-6">
                <div>
                    <h1 className="text-4xl font-black mb-4">Hostel Not Found</h1>
                    <Link href="/search" className="text-primary font-bold underline">Back to Search</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-light">
            {/* Hero Section / Gallery */}
            <section className="relative h-[60vh] md:h-[70vh] bg-dark overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={hostel.images[activeImage] || 'https://images.unsplash.com/photo-1555854817-5b2247a8175f?q=80&w=2070&auto=format&fit=crop'}
                        className="w-full h-full object-cover opacity-60 transition-all duration-700"
                        alt={hostel.blockName}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
                </div>

                <div className="absolute top-24 left-6 md:left-12 z-20">
                    <button
                        onClick={() => router.back()}
                        className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white hover:text-dark transition-all shadow-xl"
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>

                <div className="absolute bottom-12 left-6 md:left-12 right-6 md:right-12 z-20">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-4 py-1.5 bg-primary text-white text-xs font-black uppercase tracking-wider rounded-full">
                                    {hostel.type} Hostel
                                </span>
                                <div className="flex items-center gap-1 px-3 py-1.5 bg-yellow-400 text-dark text-xs font-black rounded-full">
                                    <Star size={14} fill="currentColor" />
                                    {hostel.rating.toFixed(1)} Rating
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                                {hostel.blockName}
                            </h1>
                            <p className="flex items-center gap-2 text-white/80 font-medium text-lg">
                                <MapPin size={20} className="text-primary" />
                                North Campus, University Grounds
                            </p>
                        </div>

                        {/* Image Controls */}
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {hostel.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === idx ? 'border-primary scale-110 shadow-xl' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover" alt="Hostel view" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left: Details */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Description */}
                        <div>
                            <h2 className="text-3xl font-black text-dark mb-6 tracking-tight">About the Property</h2>
                            <p className="text-xl text-dark-light leading-relaxed">
                                {hostel.description}
                            </p>
                        </div>

                        {/* Facilities Grid */}
                        <div>
                            <h2 className="text-2xl font-black text-dark mb-8">Premium Facilities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {hostel.facilities.map((f, idx) => {
                                    const Icon = facilityIcons[f] || Shield;
                                    return (
                                        <div key={idx} className="p-6 bg-card rounded-3xl border border-border shadow-sm flex flex-col items-center text-center group hover:shadow-card hover:scale-105 transition-all">
                                            <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                                                <Icon size={28} />
                                            </div>
                                            <span className="font-bold text-dark">{f}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Occupancy Map Grid */}
                        <div className="bg-card rounded-[3rem] p-10 shadow-sm border border-border">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-3xl font-black text-dark tracking-tight">Occupancy Map</h2>
                                    <p className="text-dark-light font-medium">Visual room availability for {hostel.blockName}</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-danger shadow-inner" />
                                        <span className="text-xs font-black uppercase text-dark-light">Full</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-success shadow-inner" />
                                        <span className="text-xs font-black uppercase text-dark-light">Available</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-3">
                                {hostel.rooms && hostel.rooms.length > 0 ? (
                                    hostel.rooms.map((room: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 border-2 transition-all hover:scale-110 cursor-help group/room relative
                                                ${room.status === 'Full'
                                                    ? 'bg-danger/10 border-danger text-danger'
                                                    : 'bg-success/10 border-success text-success shadow-xl shadow-success/10'}`}
                                        >
                                            <span className="text-[10px] font-black">{room.roomNumber}</span>

                                            {/* Tooltip */}
                                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-2 bg-dark text-white rounded-lg text-[10px] whitespace-nowrap opacity-0 group-hover/room:opacity-100 transition-opacity z-50 pointer-events-none">
                                                Room {room.roomNumber} • {room.status} • {room.occupants}/{room.capacity} Beds
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center opacity-40">
                                        <LayoutDashboard size={48} className="mx-auto mb-4" />
                                        <p className="font-black uppercase tracking-widest text-xs">Loading Occupancy Data...</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Virtual Tour section */}
                        {hostel.virtualTourUrl && (
                            <div className="bg-dark rounded-[3rem] p-12 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-[100px]" />
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="max-w-md">
                                        <h2 className="text-4xl font-black mb-4">Experience the tour.</h2>
                                        <p className="text-white/60 mb-8 font-medium">Explore every corner of {hostel.blockName} from the comfort of your home with our high-definition 3D tour.</p>
                                        <a
                                            href={hostel.virtualTourUrl}
                                            target="_blank"
                                            className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl"
                                        >
                                            <Video size={20} />
                                            Start Virtual Tour
                                        </a>
                                    </div>
                                    <div className="w-64 h-64 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] flex items-center justify-center border border-white/10 group-hover:rotate-6 transition-transform">
                                        <Video size={80} className="text-primary opacity-50" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Reviews Section */}
                        <div id="reviews">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-black text-dark tracking-tight">Student Feedback</h2>
                                <div className="text-right">
                                    <div className="text-4xl font-black text-dark">{hostel.rating.toFixed(1)}</div>
                                    <div className="text-sm text-dark-light font-bold uppercase tracking-widest">Global Rating</div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {hostel.reviews && hostel.reviews.length > 0 ? (
                                    hostel.reviews.map((review) => (
                                        <div key={review._id} className="bg-card p-8 rounded-[2.5rem] shadow-sm border border-border hover:shadow-card transition-all">
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center text-white font-black text-xl">
                                                        {review.studentId?.charAt(0) || 'S'}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-1 mb-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={16}
                                                                    fill={i < review.rating ? "#FBBF24" : "none"}
                                                                    className={i < review.rating ? "text-yellow-400" : "text-gray-200"}
                                                                />
                                                            ))}
                                                        </div>
                                                        <p className="text-sm font-bold text-dark-light">Verified Resident</p>
                                                    </div>
                                                </div>
                                                <div className="text-sm text-dark-light font-medium bg-light px-4 py-2 rounded-xl">
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <p className="text-lg text-dark leading-relaxed mb-6 italic">"{review.reviewText}"</p>
                                            <div className="flex items-center gap-6">
                                                <button className="flex items-center gap-2 text-sm font-black text-primary hover:scale-105 transition-all">
                                                    <ThumbsUp size={18} />
                                                    Helpful ({review.helpful})
                                                </button>
                                                <button className="flex items-center gap-2 text-sm font-bold text-dark-light hover:text-dark">
                                                    Report
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 bg-card rounded-[2.5rem] text-center border border-dashed border-border">
                                        <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                                        <p className="text-dark-light font-bold italic">No reviews yet. Be the first to share your experience!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Sidebar Action */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-8">
                            {/* Booking Card */}
                            <div className="bg-card rounded-[3rem] p-10 shadow-2xl border border-border relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-[100px] -z-0" />
                                <div className="relative z-10 text-center">
                                    <div className="mb-8">
                                        <span className="text-sm font-black text-dark-light uppercase tracking-widest mb-2 block">Available Rooms</span>
                                        <div className="text-6xl font-black text-dark mb-2 tracking-tighter">
                                            {hostel.availableRooms}
                                            <span className="text-2xl text-dark-light"> / {hostel.totalRooms}</span>
                                        </div>
                                        <div className="w-full bg-light h-3 rounded-full overflow-hidden mb-2">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary to-secondary"
                                                style={{ width: `${(hostel.availableRooms / hostel.totalRooms) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-3 p-4 bg-light rounded-2xl">
                                            <CheckCircle className="text-success" />
                                            <span className="text-sm font-bold text-dark">University Verified Listing</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 bg-light rounded-2xl">
                                            <Utensils className="text-secondary" />
                                            <span className="text-sm font-bold text-dark">Mess Menu Rating: 4.8/5</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleApply}
                                        disabled={applying || hostel.availableRooms === 0}
                                        className="w-full py-5 bg-dark text-white rounded-[1.5rem] font-black text-xl uppercase tracking-widest hover:bg-primary hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4 disabled:opacity-50"
                                    >
                                        {applying ? (
                                            <Loader2 className="animate-spin" />
                                        ) : (
                                            <>
                                                {hostel.availableRooms === 0 ? 'Waitlist' : 'Apply Now'}
                                                <ArrowRight size={24} />
                                            </>
                                        )}
                                    </button>
                                    <p className="mt-6 text-xs text-dark-light font-bold">Safe & Secure Digital Enrollment</p>
                                </div>
                            </div>

                            {/* Warden Info Card */}
                            <div className="bg-card rounded-[2.5rem] p-8 shadow-card border border-border">
                                <h3 className="text-xl font-bold text-dark mb-6">Contact Warden</h3>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-2xl">
                                        {hostel.wardenInfo.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-dark text-lg">{hostel.wardenInfo.name}</p>
                                        <p className="text-sm text-dark-light font-medium">Head Warden</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="p-4 bg-light rounded-xl text-sm font-bold text-dark-light flex items-center justify-between">
                                        Phone: <span className="text-dark">{hostel.wardenInfo.phone}</span>
                                    </div>
                                    <div className="p-4 bg-light rounded-xl text-sm font-bold text-dark-light flex items-center justify-between">
                                        Email: <span className="text-dark">{hostel.wardenInfo.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
