"use client";

import React, { useState } from 'react';
import { MapPin, Info, Navigation, Star, Search, ArrowRight } from 'lucide-react';

// Mock Data for Hostels on Map
const HOSTEL_MARKERS = [
    { id: '1', name: 'A-Block Premium', lat: 28.6139, lng: 77.2090, rating: 4.8, price: '₹12,000/mo', type: 'Boys' },
    { id: '2', name: 'B-Block Elite', lat: 28.6239, lng: 77.2190, rating: 4.5, price: '₹10,500/mo', type: 'Girls' },
    { id: '3', name: 'Legacy Residency', lat: 28.6039, lng: 77.2290, rating: 4.2, price: '₹8,000/mo', type: 'Co-ed' },
];

export default function MapComponent() {
    const [selected, setSelected] = useState<any>(null);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="w-full h-full bg-[#E5E7EB] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative w-full h-full bg-[#E5E7EB] overflow-hidden group">
            {/* Search Overlay */}
            <div className="absolute top-6 left-6 right-6 z-10">
                <div className="max-w-md mx-auto relative">
                    <input
                        type="text"
                        placeholder="Search location or hostel name..."
                        className="w-full px-8 py-5 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white outline-none focus:ring-4 focus:ring-primary/20 transition-all font-medium text-dark"
                    />
                    <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-dark-light" size={24} />
                </div>
            </div>

            {/* Map Background (High-Fidelity Mock Illustration) */}
            <div className="absolute inset-0 grayscale opacity-80 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center">
                <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
            </div>

            {/* Modern Grid Overlay */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #00000010 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Animated Markers */}
            {HOSTEL_MARKERS.map((marker) => (
                <div
                    key={marker.id}
                    className="absolute transition-all duration-500 cursor-pointer"
                    style={{ top: `${(marker.lat - 28.5) * 500}%`, left: `${(marker.lng - 77.1) * 300}%` }}
                    onClick={() => setSelected(marker)}
                >
                    <div className={`relative flex flex-col items-center group/pin ${selected?.id === marker.id ? 'scale-125' : 'hover:scale-110'}`}>
                        {/* Pin Shadow */}
                        <div className="absolute bottom-0 w-8 h-2 bg-black/20 blur-md rounded-full -mb-1 animate-pulse" />

                        {/* Pin Head */}
                        <div className={`w-12 h-12 ${marker.type === 'Boys' ? 'bg-primary' : marker.type === 'Girls' ? 'bg-secondary' : 'bg-accent'} text-white rounded-full flex items-center justify-center shadow-xl border-4 border-white transition-all`}>
                            <MapPin size={24} fill="currentColor" />
                        </div>

                        {/* Price Label */}
                        <div className="absolute -top-10 bg-dark text-white text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
                            {marker.price}
                        </div>
                    </div>
                </div>
            ))}

            {/* Selected Card Popup */}
            {selected && (
                <div className="absolute bottom-8 left-8 right-8 z-20 animate-slide-up">
                    <div className="max-w-lg mx-auto bg-white/90 backdrop-blur-2xl rounded-[3rem] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white flex gap-6 items-center">
                        <div className={`w-24 h-24 rounded-[2rem] bg-gradient-to-br from-gray-100 to-white flex items-center justify-center text-primary shadow-inner`}>
                            <Navigation size={40} className="animate-pulse" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">{selected.type}</span>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-xs font-black">{selected.rating}</span>
                                </div>
                            </div>
                            <h4 className="text-2xl font-black text-dark mb-1">{selected.name}</h4>
                            <p className="text-dark-light font-medium text-sm mb-4">University District • 2.4km away</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-black text-dark">{selected.price}</span>
                                <button className="flex items-center gap-2 font-black text-primary uppercase tracking-widest text-xs hover:gap-3 transition-all">
                                    View Details <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Map Controls */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                {['Zoom In', 'Zoom Out', 'My Location'].map((label, idx) => (
                    <button key={idx} className="w-14 h-14 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white flex items-center justify-center text-dark-light hover:text-primary transition-all">
                        <Info size={24} />
                    </button>
                ))}
            </div>
        </div>
    );
}
