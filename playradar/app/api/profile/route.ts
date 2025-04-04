import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: id },
      select: { username: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, username: user.username });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error fetching profile' },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, username } = await req.json();

    if (!id || !username) {
      return NextResponse.json(
        { success: false, error: 'User ID and username required' },
        { status: 400 },
      );
    }

    // Check if username is already taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        username: username,
        NOT: {
          id: id,
        },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Username already taken' },
        { status: 409 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { username: username },
      select: { id: true, username: true },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error updating profile' },
      { status: 500 },
    );
  }
}
