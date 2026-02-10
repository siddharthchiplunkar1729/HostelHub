import { NextRequest } from 'next/server';

// Extend NextRequest to include user property from middleware
export interface AuthenticatedRequest extends NextRequest {
    user?: {
        id?: string; // in case we use id
        _id: string; // the token uses _id
        email: string;
        role: string;
        name: string;
        canAccessDashboard: boolean;
    };
}
