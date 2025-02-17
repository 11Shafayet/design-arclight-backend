import { Schema, model } from 'mongoose';

// title: '',
// desc: '',
// bannerImage,
// main image,
// top images = [], // 3 image
// bottom images = [],
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
