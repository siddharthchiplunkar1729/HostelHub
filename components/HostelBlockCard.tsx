"use client";

import { Building2, Users, Wifi, Dumbbell, BookOpen, Utensils, Video, MapPin } from 'lucide-react';
import Link from 'next/link';

interface HostelBlockCardProps {
    block: {
        _id: string;
        blockName: string;
        type: string;
        description: string;
        availableRooms: number;
        totalRooms: number;
        wardenInfo: {
            name: string;
            phone: string;
            photo?: string;
        };
        facilities: string[];
        images: string[];
        virtualTourUrl?: string;
        rating: number;
    };
}

const facilityIcons: { [key: string]: any } = {
    'WiFi': Wifi,
    'Gym': Dumbbell,
    'Library': BookOpen,
    'Mess': Utensils,
};

export default function HostelBlockCard({ block }: HostelBlockCardProps) {
    const occupancyPercentage = ((block.totalRooms - block.availableRooms) / block.totalRooms) * 100;

    return (
        <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-floating transition-all duration-300 hover:-translate-y-1 border border-border">
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                {block.images && block.images.length > 0 ? (
                    <img
                        src={block.images[0]}
                        alt={block.blockName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Building2 size={64} className="text-primary/30" />
                    </div>
                )}

                {/* Type Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold ${block.type === 'Boys' ? 'bg-primary text-white' :
                    block.type === 'Girls' ? 'bg-secondary text-white' :
                        'bg-accent text-white'
                    }`}>
                    {block.type} Hostel
                </div>

                {/* Availability Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold ${block.availableRooms > 10 ? 'bg-success text-white' :
                    block.availableRooms > 0 ? 'bg-accent text-white' :
                        'bg-danger text-white'
                    }`}>
                    {block.availableRooms} Rooms Available
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-dark mb-1 group-hover:text-primary transition-colors">
                        {block.blockName}
                    </h3>
                    <p className="text-sm text-dark-light line-clamp-2">
                        {block.description}
                    </p>
                </div>

                {/* Occupancy Bar */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-dark-light">Occupancy</span>
                        <span className="text-xs font-bold text-dark">{occupancyPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-light rounded-full h-2 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                            style={{ width: `${occupancyPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Facilities */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {block.facilities.slice(0, 4).map((facility, idx) => {
                            const Icon = facilityIcons[facility] || Building2;
                            return (
                                <div
                                    key={idx}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-light rounded-lg text-xs font-medium text-dark"
                                >
                                    <Icon size={14} className="text-primary" />
                                    {facility}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Warden Info */}
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                        {block.wardenInfo.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-xs text-dark-light font-medium">Warden</p>
                        <p className="text-sm font-bold text-dark">{block.wardenInfo.name}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <Link
                        href={`/hostels/${block._id}`}
                        className="flex-1 bg-primary hover:bg-primary-hover text-white text-center py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow-md"
                    >
                        View Details
                    </Link>
                    {block.virtualTourUrl && (
                        <a
                            href={block.virtualTourUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 bg-light hover:bg-light-hover rounded-xl transition-all flex items-center justify-center"
                            title="Virtual Tour"
                        >
                            <Video size={18} className="text-primary" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
