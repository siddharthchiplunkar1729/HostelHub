"use client";

import { useState } from 'react';
import { Search, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Hero() {
    const router = useRouter();
    const [location, setLocation] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (location.trim()) {
            router.push(`/search?location=${encodeURIComponent(location)}`);
        }
    };

    return (
        <div className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
            {/* Background - Using a high quality Unsplash image of backpackers/hostel life */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?q=80&w=2069&auto=format&fit=crop"
                    alt="Backpackers"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
            </div>

            <div className="relative z-10 w-full max-w-5xl px-6 text-center">
                <div className="mb-8 animate-in fade-in zoom-in duration-700">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium text-sm mb-6">
                        🚀 The #1 App for Student Backpackers
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
                        Find your tribe. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                            Live the adventure.
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">
                        Discover trusted hostels, connect with students, and book your next getaway at student-friendly prices.
                    </p>
                </div>

                {/* Search Bar - Airbnb Style */}
                <form onSubmit={handleSearch} className="bg-white p-2 rounded-full shadow-floating max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-2 animate-in slide-in-from-bottom-8 duration-700 delay-200">

                    {/* Location Input */}
                    <div className="flex-1 w-full relative px-6 py-3 hover:bg-gray-50 rounded-full transition-colors group cursor-text">
                        <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-0.5 text-left ml-7">Where</label>
                        <div className="flex items-center gap-3">
                            <MapPin size={20} className="text-secondary/70 group-hover:text-secondary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search destinations"
                                className="w-full bg-transparent outline-none text-dark font-medium placeholder:text-gray-400"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-10 bg-gray-200" />

                    {/* Date Input (Mock) */}
                    <div className="flex-1 w-full relative px-6 py-3 hover:bg-gray-50 rounded-full transition-colors group cursor-pointer">
                        <div className="flex flex-col items-start ml-7">
                            <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-0.5">When</label>
                            <div className="text-dark font-medium text-sm">Add dates</div>
                        </div>
                        <Calendar size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>

                    <div className="hidden md:block w-px h-10 bg-gray-200" />

                    {/* Guests Input (Mock) */}
                    <div className="flex-1 w-full relative px-6 py-3 hover:bg-gray-50 rounded-full transition-colors group cursor-pointer">
                        <div className="flex flex-col items-start ml-7">
                            <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-0.5">Who</label>
                            <div className="text-dark font-medium text-sm">Add guests</div>
                        </div>
                        <Users size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-secondary transition-colors" />
                    </div>

                    {/* Search Button */}
                    <button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white rounded-full p-4 px-8 flex items-center justify-center gap-2 font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95">
                        <Search size={22} strokeWidth={3} />
                        <span className="md:hidden">Search</span>
                    </button>
                </form>

                <div className="mt-12 flex items-center justify-center gap-8 text-white/80 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        Verified Reviews
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                        Student Discounts
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        No Booking Fees
                    </div>
                </div>
            </div>
        </div>
    );
}
