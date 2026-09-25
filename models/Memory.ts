import mongoose, { Schema, Document } from 'mongoose';

export interface IMemory extends Document {
  imageUrl: string;
  publicId?: string;
  order: number;
  createdAt: Date;
}

const memorySchema = new Schema<IMemory>({
  imageUrl: { type: String, required: true },
  publicId: { type: String },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Guard against model re-registration error in Next.js hot reload / serverless
const Memory = mongoose.models.Memory || mongoose.model<IMemory>('Memory', memorySchema);

export default Memory;
