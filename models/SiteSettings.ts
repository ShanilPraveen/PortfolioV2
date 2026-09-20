import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  blogsVisible: boolean;
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    blogsVisible: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Guard against model re-registration error in Next.js hot reload / serverless
const SiteSettings =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema);

export default SiteSettings;
