"use client";

import { Clock, CheckCircle2, Circle, User2 } from 'lucide-react';

interface ComplaintCardProps {
    complaint: {
        _id: string;
        category: string;
        title: string;
        description: string;
        priority: string;
        status: string;
        location: {
            type: string;
            roomNumber?: string;
            areaName?: string;
        };
        assignedTo?: {
            name: string;
            role: string;
        };
        eta?: string;
        createdAt: string;
        photos?: string[];
    };
}

const CATEGORY_COLORS: { [key: string]: string } = {
    'Electrical': 'bg-yellow-100 text-yellow-700',
    'Plumbing': 'bg-blue-100 text-blue-700',
    'Cleaning': 'bg-green-100 text-green-700',
    'WiFi': 'bg-purple-100 text-purple-700',
    'Mess': 'bg-orange-100 text-orange-700',
    'Other': 'bg-gray-100 text-gray-700',
};

const STATUS_STEPS = ['Pending', 'Assigned', 'In Progress', 'Resolved'];

export default function ComplaintCard({ complaint }: ComplaintCardProps) {
    const currentStepIndex = STATUS_STEPS.indexOf(complaint.status);
    const priorityColor =
        complaint.priority === 'High' ? 'border-l-priority-high' :
            complaint.priority === 'Medium' ? 'border-l-priority-medium' :
                'border-l-priority-low';

    return (
        <div className={`bg-white rounded-2xl p-6 shadow-card hover:shadow-floating transition-all border-l-4 ${priorityColor}`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${CATEGORY_COLORS[complaint.category]}`}>
                            {complaint.category}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${complaint.priority === 'High' ? 'bg-danger-light text-danger' :
                                complaint.priority === 'Medium' ? 'bg-accent-light text-accent' :
                                    'bg-success-light text-success'
                            }`}>
                            {complaint.priority}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-dark mb-1">{complaint.title}</h3>
                    <p className="text-sm text-dark-light line-clamp-2">{complaint.description}</p>
                </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-dark-light mb-4">
                <span className="font-medium">📍</span>
                <span>
                    {complaint.location.type === 'Room'
                        ? `Room ${complaint.location.roomNumber}`
                        : complaint.location.areaName}
                </span>
            </div>

            {/* Status Timeline */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    {STATUS_STEPS.map((step, idx) => (
                        <div key={step} className="flex items-center flex-1">
                            <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${idx <= currentStepIndex
                                        ? 'bg-primary text-white'
                                        : 'bg-light text-dark-light'
                                    }`}>
                                    {idx < currentStepIndex ? (
                                        <CheckCircle2 size={16} />
                                    ) : idx === currentStepIndex ? (
                                        <Clock size={16} className="animate-pulse-soft" />
                                    ) : (
                                        <Circle size={12} />
                                    )}
                                </div>
                                <span className={`text-xs mt-1 font-medium ${idx <= currentStepIndex ? 'text-primary' : 'text-dark-light'
                                    }`}>
                                    {step}
                                </span>
                            </div>
                            {idx < STATUS_STEPS.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-2 ${idx < currentStepIndex ? 'bg-primary' : 'bg-gray-200'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Assignment Info */}
            {complaint.assignedTo && (
                <div className="bg-light rounded-xl p-3 flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                        <User2 size={18} />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-dark-light font-medium">Assigned to</p>
                        <p className="text-sm font-bold text-dark">{complaint.assignedTo.name}</p>
                        <p className="text-xs text-dark-light">{complaint.assignedTo.role}</p>
                    </div>
                    {complaint.eta && (
                        <div className="text-right">
                            <p className="text-xs text-dark-light">ETA</p>
                            <p className="text-sm font-bold text-primary">
                                {new Date(complaint.eta).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-dark-light pt-4 border-t border-gray-100">
                <span>Submitted {new Date(complaint.createdAt).toLocaleDateString()}</span>
                <span className="font-medium">ID: #{complaint._id.slice(-6).toUpperCase()}</span>
            </div>
        </div>
    );
}
