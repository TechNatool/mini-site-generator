/**
 * POST /api/auth/register
 *
 * Register a new user account
 */

import { NextRequest, NextResponse } from 'next/server';
import { addUser, hashPassword, type UserEntry } from '@/lib/users-store';
import { createSessionCookie } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user entry
    const newUser: UserEntry = {
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      email: email.toLowerCase().trim(),
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    // Add user to database
    try {
      await addUser(newUser);
    } catch (error: any) {
      if (error.message === 'Email already registered') {
        return NextResponse.json(
          { success: false, error: 'Email already registered' },
          { status: 409 }
        );
      }
      throw error;
    }

    // Create session
    const sessionCookie = createSessionCookie(newUser.id);

    // Return success with session cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });

    response.headers.set('Set-Cookie', sessionCookie);
    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    );
  }
}
