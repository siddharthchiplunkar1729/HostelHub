import { MapPin, Star, Wifi, Coffee, Shield } from 'lucide-react';
import Link from 'next/link';

export default function HostelCard({ hostel }) {
    // Handle both MongoDB _id and Mock Data id
    const id = hostel._id || hostel.id;

    return (
        <Link href={`/hostels/${id}`} className="block group h-full">
            <div className="bg-white rounded-2xl shadow-card hover:shadow-floating transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col overflow-hidden border border-gray-100/50">

                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={hostel.images?.[0] || hostel.image || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80"}
                        alt={hostel.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <Star size={14} className="text-orange-400 fill-orange-400" />
                        <span className="text-sm font-bold text-dark">{hostel.rating || 'New'}</span>
                    </div>
                    {hostel.type === 'Student' && (
                        <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                            Student Housing
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors line-clamp-1">{hostel.name}</h3>
                            <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
                                <MapPin size={14} />
                                <span className="line-clamp-1">{hostel.location}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 my-4">
                        {hostel.amenities?.slice(0, 3).map((amenity, index) => (
                            <span key={index} className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">
                                {amenity}
                            </span>
                        ))}
                        {hostel.amenities?.length > 3 && (
                            <span className="text-xs font-medium bg-gray-50 text-gray-400 px-2.5 py-1 rounded-md">
                                +{hostel.amenities.length - 3}
                            </span>
                        )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 font-medium">Starting from</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-extrabold text-primary">₹{hostel.price}</span>
                                <span className="text-sm text-gray-400">/ night</span>
                            </div>
                        </div>
                        <button className="bg-gray-900 text-white p-2.5 rounded-full group-hover:bg-primary transition-colors">
                            <ArrowUpRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// Icon helper since ArrowUpRight is needed
import { ArrowUpRight } from 'lucide-react';
