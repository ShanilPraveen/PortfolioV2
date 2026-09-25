import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';
import cloudinary from '@/lib/cloudinary';
import { verifyToken } from '@/lib/auth';

// DELETE /api/blogs/:id — delete a blog by ID (protected)
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
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Extract publicId either from document field or from Cloudinary URL pattern
    const publicId =
      blog.publicId ||
      blog.imageUrl?.match(/\/upload\/(?:v\d+\/)?([^\.]+)/)?.[1];

    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudError) {
        console.warn('Failed to delete blog asset from Cloudinary:', cloudError);
      }
    }

    await Blog.findByIdAndDelete(id);

    revalidateTag('blogs', 'max');

    return NextResponse.json(
      { message: 'Blog deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
