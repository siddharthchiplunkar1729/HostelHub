import { NextResponse } from 'next/server';
import { verifyToken, extractToken } from './jwt';

/**
 * Authentication middleware - verifies JWT token
 */
export function withAuth(handler) {
    return async (request, context) => {
        try {
            const token = extractToken(request);

            if (!token) {
                return NextResponse.json(
                    { error: 'No token provided' },
                    { status: 401 }
                );
            }

            const decoded = verifyToken(token);

            if (!decoded) {
                return NextResponse.json(
                    { error: 'Invalid or expired token' },
                    { status: 401 }
                );
            }

            // Attach user data to request
            request.user = decoded;

            return handler(request, context);
        } catch (error) {
            console.error('Auth middleware error:', error);
            return NextResponse.json(
                { error: 'Authentication failed' },
                { status: 401 }
            );
        }
    };
}

/**
 * Role-based authorization middleware
 */
export function withRole(...allowedRoles) {
    return (handler) => {
        return withAuth(async (request, context) => {
            const userRole = request.user?.role;

            if (!userRole || !allowedRoles.includes(userRole)) {
                return NextResponse.json(
                    { error: 'Insufficient permissions' },
                    { status: 403 }
                );
            }

            return handler(request, context);
        });
    };
}

/**
 * Student-only routes
 */
export const withStudent = withRole('Student');

/**
 * Warden-only routes
 */
export const withWarden = withRole('Warden', 'Admin');

/**
 * Admin-only routes
 */
export const withAdmin = withRole('Admin');

/**
 * Multiple roles allowed
 */
export const withStudentOrWarden = withRole('Student', 'Warden', 'Admin');
