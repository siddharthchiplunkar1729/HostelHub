"use client";

import { AlertCircle, Bell, Share2, Bookmark, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface NoticeCardProps {
    notice: {
        _id: string;
        title: string;
        content: string;
        type: string;
        priority: string;
        from: {
            role: string;
            name: string;
        };
        createdAt: string;
        attachments?: Array<{
            name: string;
            url: string;
        }>;
        isAcknowledged?: boolean;
    };
}

const TYPE_CONFIG: { [key: string]: { bg: string, icon: any, border: string } } = {
    'Emergency': {
        bg: 'bg-gradient-to-r from-danger to-red-600',
        icon: AlertCircle,
        border: 'border-l-danger'
    },
    'Important': {
        bg: 'bg-gradient-to-r from-accent to-orange-500',
        icon: Bell,
        border: 'border-l-accent'
    },
    'General': {
        bg: 'bg-gradient-to-r from-primary to-blue-600',
        icon: Bell,
        border: 'border-l-primary'
    },
};

export default function NoticeCard({ notice }: NoticeCardProps) {
    const [acknowledged, setAcknowledged] = useState(notice.isAcknowledged || false);
    const [saved, setSaved] = useState(false);

    const config = TYPE_CONFIG[notice.type] || TYPE_CONFIG['General'];
    const Icon = config.icon;

    const handleAcknowledge = async () => {
        setAcknowledged(true);
        // TODO: Call API to acknowledge
        await fetch(`/api/notices/${notice._id}/acknowledge`, {
            method: 'PUT',
        });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: notice.title,
                text: notice.content,
            });
        }
    };

    return (
        <div className={`bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-floating transition-all border-l-4 ${config.border} ${!acknowledged ? 'ring-2 ring-primary/20' : ''}`}>
            {/* Header */}
            <div className={`${config.bg} text-white p-4 flex items-center gap-3`}>
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Icon size={20} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-xs font-bold">
                            {notice.type}
                        </span>
                        {notice.priority === 'High' && !acknowledged && (
                            <span className="px-2 py-0.5 bg-white/30 backdrop-blur-sm rounded text-xs font-bold animate-pulse-soft">
                                🔥 URGENT
                            </span>
                        )}
                    </div>
                    <div className="text-xs opacity-90">
                        {notice.from.role} • {notice.from.name}
                    </div>
                </div>
                {!acknowledged && (
                    <div className="w-3 h-3 bg-yellow-300 rounded-full animate-pulse-soft shadow-lg" title="Unread" />
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-3">{notice.title}</h3>
                <p className="text-dark-light leading-relaxed mb-4 whitespace-pre-wrap">
                    {notice.content}
                </p>

                {/* Attachments */}
                {notice.attachments && notice.attachments.length > 0 && (
                    <div className="space-y-2 mb-4">
                        {notice.attachments.map((attachment, idx) => (
                            <a
                                key={idx}
                                href={attachment.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 bg-light hover:bg-light-hover rounded-xl transition-colors group"
                            >
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    📎
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">
                                        {attachment.name}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    {!acknowledged ? (
                        <button
                            onClick={handleAcknowledge}
                            className="flex-1 bg-primary hover:bg-primary-hover text-white py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                        >
                            <CheckCircle size={18} />
                            Acknowledge
                        </button>
                    ) : (
                        <div className="flex-1 bg-success-light text-success py-2.5 rounded-xl font-bold flex items-center justify-center gap-2">
                            <CheckCircle size={18} />
                            Acknowledged
                        </div>
                    )}

                    <button
                        onClick={() => setSaved(!saved)}
                        className={`p-2.5 rounded-xl transition-all ${saved
                                ? 'bg-accent text-white shadow-sm'
                                : 'bg-light hover:bg-light-hover text-dark-light'
                            }`}
                        title="Save notice"
                    >
                        <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
                    </button>

                    <button
                        onClick={handleShare}
                        className="p-2.5 bg-light hover:bg-light-hover rounded-xl transition-colors text-dark-light"
                        title="Share notice"
                    >
                        <Share2 size={18} />
                    </button>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs text-dark-light">
                        {new Date(notice.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                        })}
                    </span>
                    <span className="text-xs font-medium text-dark-light">
                        ID: #{notice._id.slice(-6).toUpperCase()}
                    </span>
                </div>
            </div>
        </div>
    );
}
