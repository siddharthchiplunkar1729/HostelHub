'use client';

import React, { useState } from 'react';
import { Search, MapPin, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MarketplaceHero() {
    const [location, setLocation] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (location.trim()) {
            router.push(`/search?location=${encodeURIComponent(location)}`);
        } else {
            router.push('/search');
        }
    };

    return (
        <section className="relative pt-32 pb-24 px-6 overflow-hidden min-h-[80vh] flex items-center">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
            <div className="absolute top-20 right-[10%] w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-10 left-[10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-pulse" />

            <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
                {/* Animated Badge */}
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-white rounded-full shadow-lg mb-8 animate-bounce-subtle">
                    <span className="flex h-2 w-2 rounded-full bg-secondary animate-ping mr-2" />
                    <span className="text-sm font-bold text-dark tracking-wide uppercase">New: Verified Hostels Now Listing</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-dark mb-8 leading-tight">
                    Find Your Perfect <br />
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                        Campus Home
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-dark-light max-w-3xl mx-auto mb-12 font-medium">
                    Browse thousands of verified student hostels and book your stay in minutes.
                </p>

                {/* Hero Search Bar */}
                <div className="max-w-4xl mx-auto mb-16 px-4">
                    <form
                        onSubmit={handleSearch}
                        className="flex flex-col md:flex-row items-center gap-4 p-3 bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50"
                    >
                        <div className="flex-1 flex items-center gap-4 px-6 py-3 w-full">
                            <MapPin className="text-primary flex-shrink-0" size={24} />
                            <input
                                type="text"
                                placeholder="Where are you planning to stay?"
                                className="w-full bg-transparent border-none focus:ring-0 text-lg font-medium text-dark placeholder:text-dark-light/50"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full md:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all flex items-center justify-center gap-3"
                        >
                            <Search size={22} />
                            Search Hostels
                        </button>
                    </form>
                </div>

                {/* Rapid Stats */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-80">
                    <div className="flex items-center gap-3">
                        <Building2 className="text-secondary" />
                        <span className="font-bold text-dark">50+ Campus Blocks</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Search className="text-accent" />
                        <span className="font-bold text-dark">Verified Listings</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="text-primary" />
                        <span className="font-bold text-dark">Campus-wide coverage</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
