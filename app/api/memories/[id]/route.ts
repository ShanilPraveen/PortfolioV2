import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import Memory from '@/models/Memory';
import cloudinary from '@/lib/cloudinary';
import { verifyToken } from '@/lib/auth';

// DELETE /api/memories/:id — delete a memory by ID (protected)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Verify JWT token
  const authError = verifyToken(request);
  if (authError) return authError;

  try {
    const { id } = await params;

    await connectDB();
    const memory = await Memory.findById(id);

    if (!memory) {
      return NextResponse.json(
        { error: 'Memory not found' },
        { status: 404 }
      );
    }

    // Delete image asset from Cloudinary if publicId exists
    if (memory.publicId) {
      try {
        await cloudinary.uploader.destroy(memory.publicId);
      } catch (cloudError) {
        console.warn('Failed to delete asset from Cloudinary:', cloudError);
      }
    }

    await Memory.findByIdAndDelete(id);
    revalidateTag('memories', 'max');

    return NextResponse.json(
      { message: 'Memory deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting memory:', error);
    return NextResponse.json(
      { error: 'Failed to delete memory' },
      { status: 500 }
    );
  }
}
