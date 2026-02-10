import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

/**
 * Generate JWT token for user
 */
export function generateToken(user) {
    const payload = {
        id: user._id || user.id,
        email: user.email,
        role: user.role
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify JWT token
 */
export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

/**
 * Generate refresh token
 */
export function generateRefreshToken(user) {
    const payload = {
        id: user._id || user.id,
        type: 'refresh'
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
}

/**
 * Extract token from Authorization header
 */
export function extractToken(request) {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    return authHeader.substring(7);
}

/**
 * Decode token without verification (for debugging)
 */
export function decodeToken(token) {
    try {
        return jwt.decode(token);
    } catch (error) {
        return null;
    }
}
