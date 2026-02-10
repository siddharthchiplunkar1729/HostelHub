"use client";

import { useEffect, useState } from 'react';
import { User } from 'lucide-react';

interface Story {
    _id?: string;
    userName: string;
    userAvatar: string;
    hostelName: string;
    content: string;
    image?: string;
    category: 'Experience' | 'Tip' | 'Review';
}

export default function StoriesSection() {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStories() {
            try {
                const res = await fetch('/api/stories');
                if (res.ok) {
                    const data = await res.json();
                    setStories(data);
                }
            } catch (error) {
                console.error('Failed to fetch stories:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchStories();
    }, []);

    if (loading) {
        return (
            <div className="mb-8">
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="min-w-[300px] h-48 bg-gray-200 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (stories.length === 0) return null;

    const categoryColors: Record<string, string> = {
        Experience: 'bg-purple-100 text-purple-700',
        Tip: 'bg-green-100 text-green-700',
        Review: 'bg-blue-100 text-blue-700'
    };

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-extrabold text-dark">
                    Traveler Stories 📖
                </h2>
                <p className="text-sm text-gray-500">{stories.length} stories</p>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {stories.map((story, idx) => (
                    <div
                        key={story._id || idx}
                        className="min-w-[320px] bg-white rounded-2xl shadow-card hover:shadow-floating transition-shadow p-5 flex flex-col gap-3 cursor-pointer group"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
                                {story.userAvatar ? (
                                    <img src={story.userAvatar} alt={story.userName} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={24} className="text-white" />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-dark">{story.userName}</p>
                                <p className="text-xs text-gray-500">stayed at {story.hostelName}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${categoryColors[story.category]}`}>
                                {story.category}
                            </span>
                        </div>

                        {/* Content */}
                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                            {story.content}
                        </p>

                        {/* Image */}
                        {story.image && (
                            <div className="w-full h-32 rounded-xl overflow-hidden">
                                <img
                                    src={story.image}
                                    alt="Story"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
