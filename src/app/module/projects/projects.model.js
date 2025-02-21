import { Schema, model } from 'mongoose';

// title: '',
// desc: '',
// bannerImage,
// main image,
// top images = [], // 3 images
// bottom images = [], // 7 images
// category: '',
// study: '',
// platform: '',
// vibe: ['','',]

const projectsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    bannerImage: {
      type: String,
      required: true,
    },
    showImage: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    topImages: {
      type: [String],
      required: true,
    },
    bottomImages: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      enum: ['branding', 'custom-website', 'website-in-a-day'],
      required: true,
    },
    study: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    vibe: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Projects = model('Projects', projectsSchema);
