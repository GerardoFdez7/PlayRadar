import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import prisma from '@/lib/prisma';

// Register user with email and password
export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    // Firebase authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    // Create MongoDB user document
    await prisma.user.create({
      data: {
        id: user.uid,
        username,
        email,
        createdAt: new Date(),
        liked: [],
        disliked: [],
        play_later: [],
        genres: [],
        platforms: [],
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 },
    );
  }
}

// Check if email or username is taken
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const username = searchParams.get('username');

  if (!email || !username) {
    return NextResponse.json(
      { success: false, error: 'Missing email or username' },
      { status: 400 },
    );
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    return NextResponse.json({ taken: !!existingUser });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Check failed' },
      { status: 500 },
    );
  }
}
