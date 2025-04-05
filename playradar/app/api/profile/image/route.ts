import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/connections/prisma';

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
      select: { image: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, image: user.image });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error fetching profile image' },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, image } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 },
      );
    }

    const updatedImage = await prisma.user.update({
      where: { id: id },
      data: { image: image },
      select: { id: true, image: true },
    });

    return NextResponse.json({
      success: true,
      image: updatedImage,
    });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error updating image' },
      { status: 500 },
    );
  }
}
