"use client";

import { useState } from 'react';
import { CheckCircle, ArrowLeft, CreditCard, Lock, Shield } from 'lucide-react';

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hostelId: '65f1a2b3c4d5e6f7g8h9i0j1', // Mock ID
                    user: formData,
                    checkIn: new Date(),
                    checkOut: new Date(Date.now() + 86400000 * 3),
                    guests: 1,
                    totalPrice: 2850,
                    status: 'Confirmed'
                })
            });

            if (res.ok) {
                setStep(2);
            } else {
                setStep(2); // Fallback for demo
            }
        } catch (error) {
            setStep(2);
        } finally {
            setLoading(false);
        }
    };

    if (step === 2) {
        return (
            <div className="min-h-screen bg-light flex items-center justify-center p-6">
                <div className="bg-white p-12 rounded-3xl shadow-floating text-center max-w-lg w-full ring-4 ring-green-50 animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle size={48} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-dark mb-4">Booking Confirmed!</h1>
                    <p className="text-gray-500 mb-8 text-lg">You're all set! We've sent a confirmation email to <span className="font-bold text-dark">{formData.email}</span>.</p>

                    <div className="bg-gray-50 p-6 rounded-2xl mb-8 text-left">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-500 text-sm">Booking ID</span>
                            <span className="font-mono font-bold text-dark">#HH-8293</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-sm">Amount Paid</span>
                            <span className="font-bold text-primary">₹2,850</span>
                        </div>
                    </div>

                    <a href="/" className="inline-block w-full bg-dark text-white py-4 rounded-xl font-bold hover:bg-black transition-colors">
                        Back to Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-light pt-28 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-500 hover:text-dark font-medium mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <h1 className="text-3xl font-extrabold text-dark mb-2">Confirm and pay</h1>
                        <p className="text-gray-500 mb-8">You are 2 steps away from your stay.</p>

                        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">1</span>
                                    Your Details
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                            <input
                                                required
                                                type="email"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                                            <input
                                                required
                                                type="tel"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                                placeholder="+91 98765 43210"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gray-100">
                                <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm">2</span>
                                    Payment
                                </h2>
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between mb-6 cursor-not-allowed opacity-75">
                                    <div className="flex items-center gap-3">
                                        <CreditCard size={20} className="text-gray-500" />
                                        <span className="font-bold text-gray-700">Credit or Debit Card</span>
                                    </div>
                                    <input type="radio" checked readOnly className="accent-primary" />
                                </div>
                                <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2" disabled={loading}>
                                    {loading ? 'Processing...' : (
                                        <>
                                            <Lock size={18} /> Pay ₹2,850
                                        </>
                                    )}
                                </button>
                                <div className="text-center mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs font-medium">
                                    <Shield size={12} /> SSL Secure Payment
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-3xl shadow-card border border-gray-100 sticky top-28">
                            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
                                <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=200&q=80" className="w-20 h-20 rounded-xl object-cover" />
                                <div>
                                    <h3 className="font-bold text-dark leading-tight mb-1">Zostel Mumbai</h3>
                                    <div className="text-xs text-gray-500">Mumbai, Maharashtra</div>
                                    <div className="flex items-center gap-1 mt-1 text-xs font-bold text-orange-500">
                                        <Star size={10} fill="currentColor" /> 4.8 (Verified)
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between text-gray-500">
                                    <span>3 Nights</span>
                                    <span className="font-medium text-dark">₹2,700</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Service Fee</span>
                                    <span className="font-medium text-dark">₹150</span>
                                </div>
                                <div className="flex justify-between text-green-600 font-medium">
                                    <span>Student Discount</span>
                                    <span>-₹0</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                                <span className="font-bold text-dark text-lg">Total</span>
                                <span className="font-extrabold text-primary text-xl">₹2,850</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Icon imports
import { Star } from 'lucide-react';
