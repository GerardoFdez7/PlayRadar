import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/connections/prisma';

// Create user if it doesn't exist when sign in with Google
export async function POST(req: NextRequest) {
  try {
    const { user, usernameFallback } = await req.json();

    // Validate Firebase user
    if (!user?.uid || !user?.email) {
      return NextResponse.json(
        { success: false, error: 'Invalid user data' },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: user.uid },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          id: user.uid,
          username: user.displayName || usernameFallback,
          email: user.email,
          image: null,
          createdAt: new Date(),
          liked: [],
          disliked: [],
          play_later: [],
          genres: [],
          platforms: [],
        },
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 },
    );
  }
}
