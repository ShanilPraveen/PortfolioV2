import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  techStack: string[];
}

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  githubUrl: { type: String },
  techStack: { type: [String], default: [] },
});

// Guard against model re-registration error in Next.js hot reload / serverless
const Project = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);

export default Project;
