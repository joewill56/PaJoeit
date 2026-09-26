export type SupportedFormat = 'original' | 'image/jpeg' | 'image/png' | 'image/webp';
export type FormatExtension = 'jpg' | 'png' | 'webp';

export type CompressionPreset = 'none' | 'light' | 'balanced' | 'max' | 'custom';

export type SmartPreset = 
  | 'custom'
  | 'website'
  | 'social-media'
  | 'messaging'
  | 'email'
  | 'app-upload'
  | 'max-compression';

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ImageProcessingSettings {
  outputFormat: SupportedFormat;
  quality: number; // 0.05 to 1.0
  compressionPreset: CompressionPreset;
  resizeEnabled: boolean;
  resizeWidth?: number;
  resizeHeight?: number;
  lockAspectRatio: boolean;
  resizeScalePercent?: number; // e.g., 50%
  targetSizeEnabled: boolean;
  targetSizeKB?: number; // e.g., 100
  prefix?: string;
  suffix?: string;
}

export type ProcessingStatus = 
  | 'idle'
  | 'queued'
  | 'processing'
  | 'success'
  | 'error';

export interface ProcessedImageItem {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalDimensions: ImageDimensions;
  originalFormat: string;
  previewUrl: string;
  settings: ImageProcessingSettings;
  status: ProcessingStatus;
  progress: number;
  errorMessage?: string;
  
  // Results
  resultBlob?: Blob;
  resultUrl?: string;
  resultSize?: number;
  resultDimensions?: ImageDimensions;
  resultFormat?: string;
  savedPercent?: number;
  targetAchieved?: {
    targetKB: number;
    actualKB: number;
    note: string;
  };
}

export interface ToolRouteConfig {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  metaDescription: string;
  h1: string;
  lead: string;
  defaultSettings: Partial<ImageProcessingSettings>;
  acceptedInputMime?: string[];
  features: string[];
  howToSteps: { step: number; title: string; desc: string }[];
  useCases: { title: string; desc: string; icon: string }[];
  faqs: { question: string; answer: string }[];
  relatedTools: string[];
  relatedGuides: string[];
}

export interface GuideArticle {
  slug: string;
  title: string;
  metaDescription: string;
  readTime: string;
  category: string;
  summary: string;
  content: string; // Markdown or HTML structure
  relatedTools: string[];
  relatedGuides: string[];
}
