import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Project from '@/models/Project';
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
    await Project.findByIdAndDelete(id);

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
