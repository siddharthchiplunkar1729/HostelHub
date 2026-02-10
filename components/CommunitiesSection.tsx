"use client";

import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

interface Community {
    _id?: string;
    name: string;
    description: string;
    memberCount: number;
    category: string;
    icon: string;
}

export default function CommunitiesSection() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCommunities() {
            try {
                const res = await fetch('/api/communities');
                if (res.ok) {
                    const data = await res.json();
                    setCommunities(data);
                }
            } catch (error) {
                console.error('Failed to fetch communities:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCommunities();
    }, []);

    if (loading) {
        return (
            <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (communities.length === 0) return null;

    const formatMemberCount = (count: number) => {
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}k`;
        }
        return count.toString();
    };

    return (
        <div className="mt-12">
            <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-dark mb-2">
                    Join Communities 🌍
                </h2>
                <p className="text-gray-600">Connect with like-minded travelers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {communities.map((community, idx) => (
                    <div
                        key={community._id || idx}
                        className="bg-white rounded-2xl shadow-card hover:shadow-floating transition-all p-5 cursor-pointer group border-2 border-transparent hover:border-primary/20"
                    >
                        {/* Icon & Name */}
                        <div className="flex items-start gap-3 mb-3">
                            <div className="text-4xl">{community.icon}</div>
                            <div className="flex-1">
                                <h3 className="font-bold text-dark group-hover:text-primary transition-colors">
                                    {community.name}
                                </h3>
                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                    <Users size={12} />
                                    <span>{formatMemberCount(community.memberCount)} members</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
                            {community.description}
                        </p>

                        {/* Join Button */}
                        <button className="w-full py-2 px-4 bg-primary/10 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors text-sm">
                            Join Community
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
