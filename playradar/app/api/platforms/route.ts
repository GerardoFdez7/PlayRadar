import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/connections/prisma';

export async function POST(req: NextRequest) {
  try {
    const { id, gameId } = await req.json();

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        platforms: { push: [gameId] },
      },
    });
    return NextResponse.json({ success: true, user });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error storing platforms' },
      { status: 500 },
    );
  }
}

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
      select: { platforms: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, platforms: user.platforms });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error fetching platforms' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id, gameId } = await req.json();

    // First get current user to access existing platforms
    const currentUser = await prisma.user.findUnique({
      where: { id: id },
      select: { platforms: true },
    });

    // Filter out the gameId we want to remove
    const updatedPlatforms =
      currentUser?.platforms.filter((id) => id !== gameId) || [];

    const user = await prisma.user.update({
      where: { id: id },
      data: {
        platforms: updatedPlatforms,
      },
    });
    return NextResponse.json({ success: true, user });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error removing platform' },
      { status: 500 },
    );
  }
}
