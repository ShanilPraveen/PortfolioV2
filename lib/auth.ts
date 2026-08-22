import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Verifies the Bearer JWT token from the Authorization header.
 * Returns null if valid, or a 401 NextResponse if invalid/missing.
 * 
 * Usage in a protected route:
 *   const authError = verifyToken(request);
 *   if (authError) return authError;
 */
export function verifyToken(request: NextRequest): NextResponse | null {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized: No token provided' },
      { status: 401 }
    );
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return null; // Token is valid — allow the request to proceed
  } catch {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid or expired token' },
      { status: 401 }
    );
  }
}
