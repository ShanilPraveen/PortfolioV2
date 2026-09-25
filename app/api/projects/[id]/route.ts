import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import Project from '@/models/Project';
import cloudinary from '@/lib/cloudinary';
import { verifyToken } from '@/lib/auth';

// DELETE /api/projects/:id — delete a project by ID (protected)
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
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Extract publicId either from document field or from Cloudinary URL pattern
    const publicId =
      project.publicId ||
      project.imageUrl?.match(/\/upload\/(?:v\d+\/)?([^\.]+)/)?.[1];

    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudError) {
        console.warn('Failed to delete project asset from Cloudinary:', cloudError);
      }
    }

    await Project.findByIdAndDelete(id);

    revalidateTag('projects', 'max');

    return NextResponse.json(
      { message: 'Project deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
