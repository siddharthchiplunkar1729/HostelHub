"use client";

import { FileText, AlertTriangle, Utensils, QrCode, CreditCard, Phone } from 'lucide-react';

interface QuickActionsCardProps {
    onSubmitComplaint: () => void;
}

const ACTIONS = [
    {
        icon: AlertTriangle,
        label: 'Submit Complaint',
        color: 'from-danger to-red-600',
        action: 'complaint'
    },
    {
        icon: Utensils,
        label: "Today's Menu",
        color: 'from-secondary to-green-600',
        action: 'menu'
    },
    {
        icon: QrCode,
        label: 'Mark Attendance',
        color: 'from-primary to-blue-600',
        action: 'attendance'
    },
    {
        icon: CreditCard,
        label: 'Pay Fee',
        color: 'from-accent to-orange-600',
        action: 'fee'
    },
    {
        icon: FileText,
        label: 'View Notices',
        color: 'from-purple-500 to-pink-600',
        action: 'notices'
    },
    {
        icon: Phone,
        label: 'Emergency SOS',
        color: 'from-red-600 to-red-800',
        action: 'sos'
    },
    {
        icon: FileText,
        label: 'Submit Review',
        color: 'from-yellow-400 to-orange-500',
        action: 'review'
    }
];

export default function QuickActionsCard({ onSubmitComplaint }: QuickActionsCardProps) {
    const handleAction = (action: string) => {
        switch (action) {
            case 'complaint':
                onSubmitComplaint();
                break;
            case 'menu':
                window.location.href = '/mess-menu';
                break;
            case 'attendance':
                // TODO: Open QR scanner
                alert('QR Scanner feature coming soon!');
                break;
            case 'fee':
                window.location.href = '/fee-payment';
                break;
            case 'notices':
                window.location.href = '/notices';
                break;
            case 'sos':
                alert('Emergency services contacted!');
                break;
            case 'review':
                window.location.href = '/dashboard/reviews';
                break;
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-card">
            <h2 className="text-lg font-bold text-dark mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {ACTIONS.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={idx}
                            onClick={() => handleAction(item.action)}
                            className={`group relative overflow-hidden rounded-xl p-4 bg-gradient-to-br ${item.color} text-white hover:shadow-floating transition-all hover:-translate-y-1 active:scale-95`}
                        >
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                            <Icon size={24} className="mb-2 relative z-10" />
                            <p className="text-sm font-bold relative z-10">{item.label}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
