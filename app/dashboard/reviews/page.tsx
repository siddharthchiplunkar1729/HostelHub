"use client";

import { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, Camera, Shield, CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ReviewSubmissionPage() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.role === 'Student' && !userData.canAccessDashboard) {
                router.push('/search');
                return;
            }
            setUser(userData);
        } else {
            router.push('/auth/login');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) return alert('Please provide a rating');

        setSubmitting(true);
        try {
            const res = await fetch(`/api/hostels/${user.enrolledHostelId}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId: user.studentId,
                    rating,
                    reviewText: review
                })
            });

            if (res.ok) {
                alert('Thank you for your feedback! Your review helps other students.');
                router.push('/dashboard');
            }
        } catch (error) {
            alert('Failed to submit review. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center mb-6 mx-auto">
                        <MessageSquare size={40} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-dark mb-4 tracking-tight">Share Your Experience</h1>
                    <p className="text-dark-light font-medium text-lg">Your honest feedback helps improve our hostel community.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-white space-y-12">
                    {/* Rating Picker */}
                    <div className="text-center">
                        <label className="text-[10px] font-black uppercase tracking-widest text-dark-light mb-6 block">Overall Satisfaction</label>
                        <div className="flex justify-center gap-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className="transition-all duration-300 transform hover:scale-125 focus:outline-none"
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={() => setRating(star)}
                                >
                                    <Star
                                        size={48}
                                        fill={(hover || rating) >= star ? "#FBBF24" : "none"}
                                        className={(hover || rating) >= star ? "text-yellow-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" : "text-gray-200"}
                                        strokeWidth={1.5}
                                    />
                                </button>
                            ))}
                        </div>
                        <p className="mt-6 font-black text-primary text-sm uppercase tracking-widest">
                            {rating === 1 && "Poor"}
                            {rating === 2 && "Fair"}
                            {rating === 3 && "Good"}
                            {rating === 4 && "Great"}
                            {rating === 5 && "Excellent"}
                        </p>
                    </div>

                    {/* Review Text */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-dark-light block">Detailed Feedback</label>
                        <textarea
                            placeholder="Tell us what you love or what can be improved..."
                            className="w-full h-48 p-8 bg-light rounded-[2.5rem] border-none focus:ring-4 focus:ring-primary/20 transition-all text-dark font-medium leading-relaxed resize-none"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                        />
                    </div>

                    {/* Photo Upload Placeholder */}
                    <div className="p-8 border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/30 transition-all">
                        <div className="w-14 h-14 bg-gray-50 text-dark-light rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                            <Camera size={28} />
                        </div>
                        <p className="font-bold text-dark text-sm">Add Photos</p>
                        <p className="text-xs text-dark-light">Show us your room or the hostel facilities (Optional)</p>
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-light rounded-2xl">
                            <Shield size={18} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-dark-light">Verified Reviewer</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-light rounded-2xl">
                            <CheckCircle size={18} className="text-success" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-dark-light">Public Submission</span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitting || rating === 0}
                        className="w-full py-6 bg-dark text-white rounded-[2rem] font-black text-xl uppercase tracking-widest hover:bg-primary hover:scale-105 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-4 disabled:opacity-50"
                    >
                        {submitting ? <Loader2 className="animate-spin" /> : <><Send size={24} /> Submit Review</>}
                    </button>
                </form>
            </div>
        </div>
    );
}
