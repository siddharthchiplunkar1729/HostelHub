"use client";

import { ThumbsUp, ThumbsDown, Clock, Utensils } from 'lucide-react';
import { useState } from 'react';

interface MessMenuCardProps {
    menu: {
        _id: string;
        date: string;
        day: string;
        meals: Array<{
            mealType: string;
            items: string[];
            timings: string;
            calories?: number;
            isVeg: boolean;
            thumbsUp: number;
            thumbsDown: number;
        }>;
        specialMenu: boolean;
        notes?: string;
    };
}

const MEAL_COLORS: { [key: string]: string } = {
    'Breakfast': 'from-orange-400 to-yellow-400',
    'Lunch': 'from-green-400 to-emerald-400',
    'Snacks': 'from-purple-400 to-pink-400',
    'Dinner': 'from-blue-400 to-indigo-400',
};

const MEAL_ICONS: { [key: string]: string } = {
    'Breakfast': '🌅',
    'Lunch': '☀️',
    'Snacks': '☕',
    'Dinner': '🌙',
};

export default function MessMenuCard({ menu }: MessMenuCardProps) {
    const [activeRatings, setActiveRatings] = useState<{ [key: string]: 'up' | 'down' | null }>({});

    const handleRating = async (mealType: string, rating: 'up' | 'down') => {
        setActiveRatings(prev => ({
            ...prev,
            [mealType]: prev[mealType] === rating ? null : rating
        }));

        // TODO: Submit rating to API
        await fetch(`/api/mess-menu/${menu._id}/rate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mealType, rating })
        });
    };

    const isToday = new Date(menu.date).toDateString() === new Date().toDateString();

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-floating transition-all">
            {/* Header */}
            <div className={`p-6 ${menu.specialMenu
                ? 'bg-gradient-to-r from-accent to-orange-400'
                : 'bg-gradient-to-r from-primary to-secondary'} text-white`}>
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-2xl font-bold mb-1">{menu.day}</h3>
                        <p className="text-sm opacity-90">
                            {new Date(menu.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </p>
                        {isToday && (
                            <span className="inline-block mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                                📍 Today's Menu
                            </span>
                        )}
                    </div>
                    <Utensils size={32} className="opacity-80" />
                </div>
                {menu.notes && (
                    <div className="mt-3 px-3 py-2 bg-white/15 backdrop-blur-sm rounded-lg">
                        <p className="text-sm font-medium">✨ {menu.notes}</p>
                    </div>
                )}
            </div>

            {/* Meals */}
            <div className="p-6 space-y-4">
                {menu.meals.map((meal, idx) => {
                    const totalRatings = meal.thumbsUp + meal.thumbsDown;
                    const positivePercentage = totalRatings > 0
                        ? (meal.thumbsUp / totalRatings) * 100
                        : 50;

                    return (
                        <div key={idx} className="group bg-light rounded-xl p-4 hover:shadow-sm transition-all">
                            {/* Meal Header */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${MEAL_COLORS[meal.mealType]} flex items-center justify-center text-2xl shadow-sm`}>
                                        {MEAL_ICONS[meal.mealType]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark">{meal.mealType}</h4>
                                        <div className="flex items-center gap-2 text-xs text-dark-light">
                                            <Clock size={12} />
                                            <span>{meal.timings}</span>
                                            {meal.calories && (
                                                <>
                                                    <span>•</span>
                                                    <span>{meal.calories} cal</span>
                                                </>
                                            )}
                                            {meal.isVeg && (
                                                <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">
                                                    🌱 VEG
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Rating Buttons */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleRating(meal.mealType, 'up')}
                                        className={`p-2 rounded-lg transition-all ${activeRatings[meal.mealType] === 'up'
                                                ? 'bg-success text-white shadow-sm'
                                                : 'bg-white hover:bg-success/10 text-dark-light hover:text-success'
                                            }`}
                                    >
                                        <ThumbsUp size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleRating(meal.mealType, 'down')}
                                        className={`p-2 rounded-lg transition-all ${activeRatings[meal.mealType] === 'down'
                                                ? 'bg-danger text-white shadow-sm'
                                                : 'bg-white hover:bg-danger/10 text-dark-light hover:text-danger'
                                            }`}
                                    >
                                        <ThumbsDown size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Items */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {meal.items.map((item, itemIdx) => (
                                    <span
                                        key={itemIdx}
                                        className="px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-dark border border-gray-100"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                            {/* Rating Bar */}
                            {totalRatings > 0 && (
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-success to-secondary transition-all duration-500"
                                            style={{ width: `${positivePercentage}%` }}
                                        />
                                    </div>
                                    <div className="text-xs font-bold text-dark-light whitespace-nowrap">
                                        {meal.thumbsUp} 👍 / {meal.thumbsDown} 👎
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
