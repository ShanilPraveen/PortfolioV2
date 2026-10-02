import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Cast to strings to prevent NoSQL operator injection attacks
    const usernameStr = String(username).trim();
    const passwordStr = String(password);

    // Validate maximum length to prevent DoS
    if (usernameStr.length > 100 || passwordStr.length > 128) {
      return NextResponse.json(
        { message: 'Username or password exceeds maximum allowed length' },
        { status: 400 }
      );
    }

    await connectDB();

    // Find admin by username
    const admin = await Admin.findOne({ username: usernameStr });
    if (!admin) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 400 }
      );
    }

    // Compare password with stored hash
    const validPass = await bcrypt.compare(passwordStr, admin.password);
    if (!validPass) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 400 }
      );
    }

    // Sign JWT token with 1 hour expiry and explicit HS256 algorithm
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET!,
      { expiresIn: '1h', algorithm: 'HS256' }
    );

    return NextResponse.json({ token }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
