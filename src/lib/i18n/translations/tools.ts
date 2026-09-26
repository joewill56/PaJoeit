import { LanguageCode } from '../languages';

export interface LocalizedToolContent {
  title: string;
  shortTitle: string;
  tagline: string;
  metaDescription: string;
  h1: string;
  lead: string;
  features: string[];
  howToSteps: { step: number; title: string; desc: string }[];
  useCases: { title: string; desc: string; icon: string }[];
  faqs: { question: string; answer: string }[];
  explanation: {
    overviewTitle: string;
    overviewContent: string;
    whyTitle: string;
    whyContent: string;
    specsTitle: string;
    specs: { label: string; value: string }[];
  };
}

// English Base Content
const EN_TOOLS: Record<string, LocalizedToolContent> = {
  'root': {
    title: 'PAJOEIT CONVERT – Free Online Image Workspace',
    shortTitle: 'All-in-One Image Workspace',
    tagline: 'Convert, compress and resize images online. Fast. Free. Private. No signup required.',
    metaDescription: 'Convert, compress, and resize images directly in your browser. Fast, free, private image workspace with zero server uploads or signups.',
    h1: 'Convert, Compress & Resize Images Online',
    lead: 'High-performance image workspace. Transform formats, shave off file sizes, and scale dimensions locally in your browser. 100% private with zero cloud uploads.',
    features: [
      'Universal format conversion (WebP, PNG, JPG)',
      'Smart quality compression with visual preservation',
      'Target-size engine (e.g. compress to 100KB)',
      'Aspect-locked multi-dimensional resizing',
      'Batch processing with one-click ZIP download',
      '100% Client-side privacy—images never leave your browser',
    ],
    howToSteps: [
      { step: 1, title: 'Upload images', desc: 'Drag and drop your JPG, PNG, or WebP files or choose from your device.' },
      { step: 2, title: 'Choose workflow', desc: 'Select target format, compression level, target size, or custom dimensions.' },
      { step: 3, title: 'Process locally', desc: 'Hit Process. The engine transforms files locally without server delays.' },
      { step: 4, title: 'Download or ZIP', desc: 'Inspect before/after savings, preview changes, and download individual files or a ZIP.' },
    ],
    useCases: [
      { title: 'Website Optimization', desc: 'Drastically boost Core Web Vitals and load times by switching to WebP and compressed JPG.', icon: 'globe' },
      { title: 'Government & Portal Uploads', desc: 'Hit strict upload limits like 100KB or 200KB for passport, ID, and application forms.', icon: 'shield-check' },
      { title: 'Social & Messaging', desc: 'Resize high-resolution camera photos for WhatsApp, Discord, Slack, and Instagram without pixelation.', icon: 'share-2' },
      { title: 'Graphic Design & Print', desc: 'Transform transparent WebP assets into high-resolution PNGs or compact JPG presentations.', icon: 'layers' },
    ],
    faqs: [
      { question: 'Do my photos get uploaded to any server?', answer: 'No. PAJOEIT CONVERT processes 100% of your images inside your web browser using HTML5 Canvas and client-side memory. Your pictures never touch our servers or any cloud database.' },
      { question: 'Is there a limit on how many images I can process?', answer: 'No artificial batch limits exist. You can convert dozens of images at once and download them conveniently bundled in a single ZIP file.' },
      { question: 'Can I compress an image down to an exact size like 100KB?', answer: 'Yes! Our Target Size Engine intelligently adapts compression quality and step-down resolution to match your requested file size as closely as possible.' },
    ],
    explanation: {
      overviewTitle: 'Universal Client-Side Image Workspace',
      overviewContent: 'PAJOEIT CONVERT gives photographers, web developers, designers, and everyday users instant control over their media without uploading sensitive files to cloud servers. Built with HTML5 Canvas, bicubic downsampling, and client-side compression algorithms, your data remains strictly on your device.',
      whyTitle: 'Why Choose PAJOEIT CONVERT?',
      whyContent: 'Traditional converter websites force you to upload personal photos to their servers, queue in line, view spammy ads, or pay subscriptions. PAJOEIT CONVERT is completely free, runs at native device speeds, and honors complete privacy.',
      specsTitle: 'Platform Specifications',
      specs: [
        { label: 'Execution', value: '100% In-Browser (Client-side)' },
        { label: 'Supported Inputs', value: 'JPG, PNG, WebP, GIF, AVIF, BMP' },
        { label: 'Output Formats', value: 'WebP, JPG, PNG' },
        { label: 'Batch Processing', value: 'Supported with JSZip bundling' },
      ],
    },
  },
  'webp-to-png': {
    title: 'WebP to PNG Converter – Free, High Quality & In-Browser',
    shortTitle: 'WebP to PNG',
    tagline: 'Convert modern WebP images to lossless PNG format with preserved transparency.',
    metaDescription: 'Convert WebP to PNG online for free. Retain full alpha transparency and crisp pixel sharpness directly in your browser without uploads.',
    h1: 'Convert WebP to PNG Online',
    lead: 'Transform Google WebP graphics into universal, lossless PNG files with complete transparency preservation. Fast, private, and free.',
    features: [
      'Full Alpha Transparency Preservation',
      'Lossless pixel fidelity and sharp contrast',
      'No file size restrictions or watermarks',
      'Unlimited batch processing with ZIP packaging',
    ],
    howToSteps: [
      { step: 1, title: 'Upload WebP file', desc: 'Drag and drop your .webp image into the workspace box above.' },
      { step: 2, title: 'Verify settings', desc: 'Format is pre-configured to lossless PNG with alpha channel retention.' },
      { step: 3, title: 'Process', desc: 'Click Process to rasterize the WebP frame directly inside your browser.' },
      { step: 4, title: 'Save PNG', desc: 'Download your crisp, transparent PNG immediately.' },
    ],
    useCases: [
      { title: 'Graphic Software Compatibility', desc: 'Import downloaded web graphics into older versions of Photoshop, Illustrator, or InDesign.', icon: 'layers' },
      { title: 'Icon & Logo Transparency', desc: 'Extract transparent brand logos and UI elements from WebP websites into clean PNGs.', icon: 'globe' },
      { title: 'Print & Presentation', desc: 'Ensure graphics print with maximum sharpness in presentations and physical brochures.', icon: 'printer' },
    ],
    faqs: [
      { question: 'Will my transparent background be preserved?', answer: 'Yes! PNG natively supports full 8-bit alpha transparency. Our converter retains all transparency intact without white backdrops.' },
      { question: 'Why does the PNG file sometimes have a larger file size than the WebP?', answer: 'WebP is a modern compressed web format. PNG is a lossless format designed for editing fidelity, so it contains uncompressed pixel data.' },
    ],
    explanation: {
      overviewTitle: 'Why Convert WebP to PNG?',
      overviewContent: 'While WebP is excellent for website load speeds, many desktop editors, legacy operating systems, and video tools still lack native WebP support. Converting to PNG ensures universal compatibility with zero loss in visual sharpness.',
      whyTitle: 'Transparent and Lossless',
      whyContent: 'Unlike JPG which forces transparent pixels to turn white or black, our WebP to PNG converter faithfully preserves every subtle semi-transparent pixel gradient, shadow, and cutout edge.',
      specsTitle: 'Conversion Specifications',
      specs: [
        { label: 'Target Mime', value: 'image/png' },
        { label: 'Transparency', value: 'Supported (Alpha Channel 8-bit)' },
        { label: 'Compression', value: 'Lossless DEFLATE' },
      ],
    },
  },
  'webp-to-jpg': {
    title: 'WebP to JPG Converter – Fast, Clean & Free',
    shortTitle: 'WebP to JPG',
    tagline: 'Convert WebP images to standard JPG format with clean white background matting.',
    metaDescription: 'Convert WebP to JPG online for free. Transform modern WebP files into universally compatible JPEG photos with adjustable quality.',
    h1: 'Convert WebP to JPG Online',
    lead: 'Turn WebP files into universal JPEG photos compatible with every phone, tablet, television, and photo printing booth.',
    features: [
      'Universal compatibility across all devices and software',
      'Automatic pure-white matte fill for transparent assets',
      'Configurable quality compression (50% to 100%)',
      'Fast batch processing with instant ZIP download',
    ],
    howToSteps: [
      { step: 1, title: 'Upload WebP', desc: 'Drop one or more .webp pictures into the upload area.' },
      { step: 2, title: 'Adjust quality', desc: 'Choose Balanced (75%) for web or Maximum (95%) for photography.' },
      { step: 3, title: 'Process', desc: 'Local canvas rasterization finishes in milliseconds.' },
      { step: 4, title: 'Download JPG', desc: 'Save your standard JPEG files ready for any viewer.' },
    ],
    useCases: [
      { title: 'Printing & Digital Frames', desc: 'Send photos to drugstore printing kiosks or digital photo frames that reject WebP.', icon: 'printer' },
      { title: 'Office & Email Clients', desc: 'Attach photos in Outlook, Word, and PowerPoint without broken image icons.', icon: 'mail' },
      { title: 'Social Media Uploads', desc: 'Upload to legacy forums and portals that only accept .jpg and .jpeg extensions.', icon: 'share-2' },
    ],
    faqs: [
      { question: 'What happens to transparent backgrounds in WebP to JPG?', answer: 'Because JPEG does not support transparency, transparent areas are smoothly matted with a clean pure-white background (#FFFFFF).' },
      { question: 'Is WebP to JPG conversion lossy?', answer: 'Yes, JPEG uses perceptual lossy compression. You can control the exact quality slider to maintain virtually imperceptible visual difference.' },
    ],
    explanation: {
      overviewTitle: 'Universal Accessibility with JPEG',
      overviewContent: 'The Joint Photographic Experts Group (JPEG) format has been the international standard for digital photos since 1992. Every computer, smartphone, e-reader, and car display can render JPG instantly without extra codecs.',
      whyTitle: 'Smart Background Matting',
      whyContent: 'When converting images with transparent sections, PAJOEIT CONVERT fills the void with pure white, avoiding the ugly black artifacts produced by naive conversion tools.',
      specsTitle: 'Conversion Details',
      specs: [
        { label: 'Target Mime', value: 'image/jpeg' },
        { label: 'Alpha Handling', value: 'Matte to White #FFFFFF' },
        { label: 'Quality Options', value: 'Custom 0.1 to 1.0 (Default 0.75)' },
      ],
    },
  },
  'png-to-jpg': {
    title: 'PNG to JPG Converter – Dramatically Reduce Image Size',
    shortTitle: 'PNG to JPG',
    tagline: 'Convert heavy PNG graphics into lightweight JPG photos in seconds.',
    metaDescription: 'Convert PNG to JPG online for free. Slash file size by up to 80% with adjustable compression and clean white background matting.',
    h1: 'Convert PNG to JPG Online',
    lead: 'Reduce bloated PNG file sizes by up to 80% while preserving stunning visual fidelity. Ideal for web photography and fast social sharing.',
    features: [
      'Huge file size savings (often 70%–85% smaller)',
      'Custom quality control from 50% to 100%',
      'Automatic white backdrop fill for transparent areas',
      'Batch conversion with one-click ZIP download',
    ],
    howToSteps: [
      { step: 1, title: 'Upload PNG', desc: 'Drop heavy screenshots or graphic PNGs into the dropzone.' },
      { step: 2, title: 'Set Compression', desc: 'Select Balanced (75%) for best space savings or Light (88%) for high detail.' },
      { step: 3, title: 'Process', desc: 'Convert instantly without waiting for remote server queues.' },
      { step: 4, title: 'Save JPG', desc: 'Download your optimized JPEG file and enjoy massive storage savings.' },
    ],
    useCases: [
      { title: 'Email Attachments', desc: 'Shrink multi-megabyte PNG screenshots so they easily fit inside email size limits.', icon: 'mail' },
      { title: 'Blog & CMS Uploads', desc: 'Speed up WordPress and Shopify loading speeds by converting camera PNGs to JPG.', icon: 'globe' },
      { title: 'Mobile Storage', desc: 'Reclaim smartphone storage by converting uncompressed PNG camera captures.', icon: 'hard-drive' },
    ],
    faqs: [
      { question: 'Why are PNG files so much larger than JPG?', answer: 'PNG uses lossless compression that records every single pixel exact value. JPG uses discrete cosine transform algorithms that discard invisible color noise.' },
      { question: 'When should I NOT convert PNG to JPG?', answer: 'Keep PNG if your image is an icon, text graphic, line art, or requires a transparent background.' },
    ],
    explanation: {
      overviewTitle: 'The Power of PNG to JPG Conversion',
      overviewContent: 'Screenshots and raw camera exports are frequently saved as 5MB–10MB PNGs. Converting them to JPG typically cuts the file size down to 300KB–600KB without any noticeable difference on computer or mobile screens.',
      whyTitle: 'Fast Loading & Bandwidth Savings',
      whyContent: 'Smaller images mean faster website loading, reduced mobile data consumption, and rapid sharing across WhatsApp, Slack, and email.',
      specsTitle: 'Technical Specifications',
      specs: [
        { label: 'Algorithm', value: 'Bicubic Canvas DCT Compression' },
        { label: 'Target Size Reduction', value: 'Average 60% – 85%' },
        { label: 'Processing Speed', value: '< 100ms per image' },
      ],
    },
  },
  'jpg-to-png': {
    title: 'JPG to PNG Converter – Uncompressed Lossless Clarity',
    shortTitle: 'JPG to PNG',
    tagline: 'Convert compressed JPG images into uncompressed PNG files for graphic editing.',
    metaDescription: 'Convert JPG to PNG online for free. Prepare photos for graphic editing, overlay composition, and lossless archiving in your browser.',
    h1: 'Convert JPG to PNG Online',
    lead: 'Transform compressed JPEG photos into lossless PNG format. Stop generational compression degradation during editing and graphic layering.',
    features: [
      'Prevents repeated lossy re-compression artifacts',
      'Lossless pixel encoding standard',
      'Universal compatibility with all design programs',
      'Batch processing for photo libraries',
    ],
    howToSteps: [
      { step: 1, title: 'Select JPG file', desc: 'Upload your JPEG or JPG photo.' },
      { step: 2, title: 'Confirm format', desc: 'Output format is locked to lossless PNG.' },
      { step: 3, title: 'Generate PNG', desc: 'Canvas decodes JPEG DCT and wraps into PNG DEFLATE container.' },
      { step: 4, title: 'Download', desc: 'Save your lossless PNG ready for layer composition.' },
    ],
    useCases: [
      { title: 'Design Layering', desc: 'Prepare product photos for background removal, masks, and Canva/Figma layers.', icon: 'layers' },
      { title: 'Prevent Degradation', desc: 'Stop re-saving JPGs which causes artifact accumulation over time.', icon: 'shield-check' },
      { title: 'Software Requirement', desc: 'Satisfy specific portal upload requirements that mandate PNG file types.', icon: 'file-check' },
    ],
    faqs: [
      { question: 'Does converting JPG to PNG improve image quality?', answer: 'No converter can restore data that was already discarded by lossy JPG compression. However, converting to PNG freezes quality and prevents any further degradation.' },
      { question: 'Can I add transparency?', answer: 'The resulting PNG supports transparency, which allows you to subsequently erase or mask out backgrounds in photo editing tools.' },
    ],
    explanation: {
      overviewTitle: 'Why Convert JPG to PNG?',
      overviewContent: 'Every time you edit and re-save a JPG file, lossy compression is applied again, introducing visible block artifacts and muddy colors. Converting to PNG establishes a stable master file that will not degrade further.',
      whyTitle: 'Ideal for Graphic Design Workflows',
      whyContent: 'Designers frequently need PNG containers for transparent overlays, sticker creations, and multi-layer composites.',
      specsTitle: 'Conversion Details',
      specs: [
        { label: 'Container', value: 'PNG (Portable Network Graphics)' },
        { label: 'Color Depth', value: '24-bit RGB / 32-bit RGBA' },
        { label: 'Compression', value: 'ZLIB DEFLATE (Lossless)' },
      ],
    },
  },
  'image-compressor': {
    title: 'Image Compressor – Reduce Image File Size Without Quality Loss',
    shortTitle: 'Image Compressor',
    tagline: 'Compress JPG, PNG, and WebP images with smart visual quality preservation.',
    metaDescription: 'Free online image compressor. Compress JPG, PNG, and WebP photos by up to 80% directly in your browser. Fast, private, with zero server uploads.',
    h1: 'Compress Images Online',
    lead: 'Shave megabytes off your images without sacrificing visual crispness. Smart client-side compression algorithms ensure professional visual clarity.',
    features: [
      'Smart perceptual compression preserves sharpness and textures',
      'Presets: Maximum (50%), Balanced (75%), Light (88%), or Custom',
      'Interactive side-by-side Before/After comparison slider',
      'Batch compression with single ZIP download',
    ],
    howToSteps: [
      { step: 1, title: 'Upload pictures', desc: 'Add one or dozens of JPG, PNG, or WebP files.' },
      { step: 2, title: 'Choose compression', desc: 'Select Balanced (75%) for typical usage or customize your quality slider.' },
      { step: 3, title: 'Compress', desc: 'Watch real-time progress as local browser algorithms compress your files.' },
      { step: 4, title: 'Compare & Save', desc: 'Inspect savings and download individual images or your entire batch as a ZIP.' },
    ],
    useCases: [
      { title: 'Web Speed Optimization', desc: 'Cut page weight to pass Google Core Web Vitals and improve SEO rankings.', icon: 'globe' },
      { title: 'Email Attachments', desc: 'Keep high-res attachments under strict 25MB corporate email caps.', icon: 'mail' },
      { title: 'Document Submissions', desc: 'Easily meet file size caps on university, visa, and legal application portals.', icon: 'file-check' },
    ],
    faqs: [
      { question: 'How much file size can I expect to save?', answer: 'Photos taken on modern smartphones typically shrink by 60% to 85% with virtually zero perceptible visual difference at normal viewing distances.' },
      { question: 'Can I preview image quality before saving?', answer: 'Yes! Use our built-in Before/After split slider on any processed image to inspect sharpness at 100% scale.' },
    ],
    explanation: {
      overviewTitle: 'Perceptual Client-Side Compression',
      overviewContent: 'High-resolution smartphone cameras take photos with redundant data that human eyes cannot perceive. PAJOEIT CONVERT strips invisible color noise while preserving critical edges, faces, and text sharpness.',
      whyTitle: 'Zero Privacy Risk',
      whyContent: 'Unlike cloud compressors that store your personal photos on their servers, PAJOEIT CONVERT executes every byte calculation right inside your browser memory.',
      specsTitle: 'Engine Specifications',
      specs: [
        { label: 'Supported Formats', value: 'JPG, PNG, WebP' },
        { label: 'Compression Presets', value: 'Light (88%), Balanced (75%), Max (50%)' },
        { label: 'Comparison Tool', value: 'Interactive Draggable Split Slider' },
      ],
    },
  },
  'image-resizer': {
    title: 'Image Resizer – Resize Image Dimensions in Pixels or Percent',
    shortTitle: 'Image Resizer',
    tagline: 'Resize photos to exact width and height with locked aspect ratio.',
    metaDescription: 'Resize images online for free. Scale dimensions in pixels with locked aspect ratio and bicubic resampling directly in your browser.',
    h1: 'Resize Image Dimensions Online',
    lead: 'Scale images to custom pixel dimensions with locked aspect ratio. Crisp bicubic downsampling prevents jagged edges and pixelation.',
    features: [
      'Lock aspect ratio to prevent distorted stretching',
      'Pixel width & height or percentage-based scaling',
      'High-quality bicubic downsampling interpolation',
      'Simultaneous resizing and compression workflow',
    ],
    howToSteps: [
      { step: 1, title: 'Upload image', desc: 'Select or drag your photo into the workspace.' },
      { step: 2, title: 'Enter dimensions', desc: 'Type your desired width (e.g. 1920px or 1080px). Height adjusts automatically.' },
      { step: 3, title: 'Apply', desc: 'Click Process to resample the pixels cleanly.' },
      { step: 4, title: 'Download', desc: 'Save your perfectly scaled image.' },
    ],
    useCases: [
      { title: 'Social Media Banners', desc: 'Create exact dimensions for YouTube banners (2560×1440), Facebook covers, and Instagram.', icon: 'share-2' },
      { title: 'E-Commerce Standards', desc: 'Standardize catalog product photos to uniform 1000×1000 or 1200×1200 square dimensions.', icon: 'shopping-bag' },
      { title: 'Email Signatures & Avatars', desc: 'Downscale huge photos to 128×128 or 256×256 profile icons without blur.', icon: 'user' },
    ],
    faqs: [
      { question: 'Why does my image look blurry when resized?', answer: 'Resizing an image larger than its original resolution causes interpolation blur. Downscaling, however, retains full sharpness with our bicubic resampling.' },
      { question: 'Will resizing change my file size?', answer: 'Yes! Reducing pixel dimensions drastically reduces file size because there are fewer total pixels to encode.' },
    ],
    explanation: {
      overviewTitle: 'Bicubic Downsampling Engine',
      overviewContent: 'Simple nearest-neighbor scaling causes ugly jagged steps along curved lines. Our image resizer uses advanced canvas interpolation to calculate smooth averages, keeping lines crisp and gradients clean.',
      whyTitle: 'Aspect Ratio Protection',
      whyContent: 'By default, aspect ratio is strictly locked. Change width to 1200px and height scales proportionally so people and products never look squashed or stretched.',
      specsTitle: 'Resizing Options',
      specs: [
        { label: 'Sampling Method', value: 'Bicubic Smooth Interpolation' },
        { label: 'Aspect Ratio', value: 'Locked Proportional (Toggleable)' },
        { label: 'Maximum Resolution', value: 'Up to 8K (Device memory dependent)' },
      ],
    },
  },
  'compress-jpg-to-100kb': {
    title: 'Compress JPG to 100KB – Free Target File Size Reducer',
    shortTitle: 'Compress JPG to 100KB',
    tagline: 'Hit strict 100KB upload limits for government, passport, and exam portals.',
    metaDescription: 'Compress JPG to 100KB online for free. Automatically tune compression and resolution to hit under 100KB for passport, ID, and job portals.',
    h1: 'Compress JPG to 100KB Online',
    lead: 'Strict upload portal limit? Our Target Size Engine intelligently tunes quality and dimensions to compress your JPG under 100KB with zero guesswork.',
    features: [
      'Target Size Engine guarantees files fit under strict limits (100KB, 50KB, 200KB)',
      'Binary search quality tuning for maximum fidelity at target size',
      'Step-down resolution fallbacks for extremely large source files',
      '100% private in-browser execution—perfect for passports and ID documents',
    ],
    howToSteps: [
      { step: 1, title: 'Upload JPG or photo', desc: 'Select your photo, passport scan, or certificate.' },
      { step: 2, title: 'Target 100KB active', desc: 'Target size is pre-set to 100KB (or customize to 50KB/200KB).' },
      { step: 3, title: 'Iterative optimization', desc: 'The engine tests compression levels until the file fits under 100KB.' },
      { step: 4, title: 'Download compliant file', desc: 'Submit your compliant photo with 100% confidence.' },
    ],
    useCases: [
      { title: 'Government & Passport Portals', desc: 'Satisfy strict government portal rules requiring photos under 100KB or 50KB.', icon: 'shield-check' },
      { title: 'University & Exam Registrations', desc: 'Upload admit card photos and signatures without recurring "file too large" errors.', icon: 'book-open' },
      { title: 'Job & Visa Applications', desc: 'Attach compliant resumes and applicant photos to strict recruitment systems.', icon: 'file-check' },
    ],
    faqs: [
      { question: 'How does PAJOEIT CONVERT reach exactly under 100KB?', answer: 'Our Target Size Engine performs iterative binary search across compression quality levels. If the image is extremely large, it gently steps down pixel dimensions until the file is guaranteed under 100KB.' },
      { question: 'Is it safe to upload my passport or ID photo here?', answer: 'Yes! Unlike other websites, your document is NEVER uploaded to any server. All processing runs locally inside your browser on your machine.' },
      { question: 'Can I target a different size like 50KB or 200KB?', answer: 'Absolutely. You can type any target size in KB inside the settings panel.' },
    ],
    explanation: {
      overviewTitle: 'The Solution to Frustrating Upload Limits',
      overviewContent: 'Government agencies, embassies, and academic institutions worldwide reject uploads exceeding 100KB. Manually tweaking sliders in Photoshop to guess the final file size wastes valuable time. PAJOEIT CONVERT automates this completely.',
      whyTitle: 'Zero-Upload Privacy for Sensitive Documents',
      whyContent: 'Uploading your passport, national ID card, or driver license to unknown online servers poses severe identity theft risks. PAJOEIT CONVERT never transmits your pictures over the internet.',
      specsTitle: 'Target Engine Details',
      specs: [
        { label: 'Default Target', value: '100 KB' },
        { label: 'Algorithm', value: 'Iterative Binary Search & Adaptive Resampling' },
        { label: 'Maximum Iterations', value: '6 Optimization Passes' },
      ],
    },
  },
};

// Localized overrides for ES, FR, PT, DE, AR, HI, ID, ZH, JA
const LOCALIZED_TOOLS: Partial<Record<LanguageCode, Record<string, Partial<LocalizedToolContent>>>> = {
  es: {
    'root': {
      title: 'PAJOEIT CONVERT – Espacio de Trabajo Gratuito de Imágenes',
      shortTitle: 'Espacio Todo en Uno',
      tagline: 'Convierte, comprime y redimensiona imágenes online. Rápido. Gratis. Privado. Sin registro.',
      metaDescription: 'Convierte, comprime y redimensiona imágenes en tu navegador. Espacio de trabajo rápido, gratuito y 100% privado sin subir archivos a servidores.',
      h1: 'Convierte, Comprime y Redimensiona Imágenes Online',
      lead: 'Espacio de trabajo de imágenes de alto rendimiento. Cambia formatos, reduce el peso y escala dimensiones en tu navegador sin subir nada a la nube.',
    },
    'webp-to-png': {
      title: 'Convertidor WebP a PNG – Gratis, Alta Calidad en Navegador',
      shortTitle: 'WebP a PNG',
      tagline: 'Convierte imágenes WebP a formato PNG sin pérdidas conservando la transparencia.',
      metaDescription: 'Convierte WebP a PNG online gratis. Conserva la transparencia alfa y la nitidez original directamente en tu navegador sin subidas.',
      h1: 'Convertir WebP a PNG Online',
      lead: 'Transforma gráficos WebP en archivos PNG universales sin pérdidas con total conservación de transparencia. Rápido, privado y gratis.',
    },
    'webp-to-jpg': {
      title: 'Convertidor WebP a JPG – Rápido, Limpio y Gratuito',
      shortTitle: 'WebP a JPG',
      h1: 'Convertir WebP a JPG Online',
      lead: 'Convierte archivos WebP en fotos JPEG universales compatibles con cualquier teléfono, tablet o impresora.',
    },
    'png-to-jpg': {
      title: 'Convertidor PNG a JPG – Reduce Drásticamente el Tamaño',
      shortTitle: 'PNG a JPG',
      h1: 'Convertir PNG a JPG Online',
      lead: 'Reduce el peso de archivos PNG hasta un 80% manteniendo una gran fidelidad visual. Ideal para webs y redes.',
    },
    'jpg-to-png': {
      title: 'Convertidor JPG a PNG – Claridad sin Pérdidas',
      shortTitle: 'JPG a PNG',
      h1: 'Convertir JPG a PNG Online',
      lead: 'Transforma fotos JPEG en formato PNG sin pérdidas. Evita la degradación de calidad al editar.',
    },
    'image-compressor': {
      title: 'Compresor de Imágenes – Reduce Peso sin Perder Calidad',
      shortTitle: 'Compresor de Imágenes',
      h1: 'Comprimir Imágenes Online',
      lead: 'Ahorra megabytes en tus fotos sin perder nitidez. Algoritmos inteligentes en tu propio navegador.',
    },
    'image-resizer': {
      title: 'Redimensionador de Imágenes – Ajusta Ancho y Alto',
      shortTitle: 'Redimensionador',
      h1: 'Redimensionar Dimensiones de Imagen Online',
      lead: 'Escala imágenes a dimensiones exactas con proporción bloqueada. Remuestreo bicúbico nítido.',
    },
    'compress-jpg-to-100kb': {
      title: 'Comprimir JPG a 100KB – Reductor a Tamaño Exacto Gratis',
      shortTitle: 'Comprimir JPG a 100KB',
      h1: 'Comprimir JPG a 100KB Online',
      lead: '¿Límites estrictos en formularios? Nuestro motor ajusta automáticamente la calidad para que tu JPG pese menos de 100KB.',
    },
  },
  fr: {
    'root': {
      title: 'PAJOEIT CONVERT – Espace de Traitement d\'Images en Ligne Gratuit',
      shortTitle: 'Espace Tout-en-Un',
      tagline: 'Convertissez, compressez et redimensionnez vos images en ligne. Rapide. Gratuit. Privé.',
      h1: 'Convertir, Compresser et Redimensionner des Images en Ligne',
      lead: 'Espace de traitement d\'images performant. Changez de format, réduisez la taille et ajustez les dimensions directement dans votre navigateur.',
    },
    'webp-to-png': {
      title: 'Convertisseur WebP en PNG – Gratuit, Haute Qualité',
      shortTitle: 'WebP en PNG',
      h1: 'Convertir WebP en PNG en Ligne',
      lead: 'Transformez vos fichiers WebP en PNG haute fidélité avec conservation totale de la transparence.',
    },
    'webp-to-jpg': {
      title: 'Convertisseur WebP en JPG – Rapide et Gratuit',
      shortTitle: 'WebP en JPG',
      h1: 'Convertir WebP en JPG en Ligne',
      lead: 'Convertissez vos images WebP en JPEG universels compatibles avec tous les appareils.',
    },
    'png-to-jpg': {
      title: 'Convertisseur PNG en JPG – Réduction Massive du Poids',
      shortTitle: 'PNG en JPG',
      h1: 'Convertir PNG en JPG en Ligne',
      lead: 'Réduisez le poids des fichiers PNG jusqu\'à 80% tout en conservant une netteté remarquable.',
    },
    'jpg-to-png': {
      title: 'Convertisseur JPG en PNG – Format Sans Perte',
      shortTitle: 'JPG en PNG',
      h1: 'Convertir JPG en PNG en Ligne',
      lead: 'Transformez vos photos JPEG en format PNG sans perte pour l\'édition et le graphisme.',
    },
    'image-compressor': {
      title: 'Compresseur d\'Images – Réduisez la Taille Sans Perte Visible',
      shortTitle: 'Compresseur d\'Images',
      h1: 'Compresser des Images en Ligne',
      lead: 'Allégez vos fichiers sans sacrifier la netteté. Traitement 100% local dans votre navigateur.',
    },
    'image-resizer': {
      title: 'Redimensionneur d\'Images – Ajustez Pixels et Proportions',
      shortTitle: 'Redimensionneur',
      h1: 'Redimensionner des Images en Ligne',
      lead: 'Changez les dimensions de vos images avec respect strict des proportions et rééchantillonnage de pointe.',
    },
    'compress-jpg-to-100kb': {
      title: 'Compresser JPG à 100Ko – Outil Automatique Gratuit',
      shortTitle: 'Compresser JPG à 100Ko',
      h1: 'Compresser un JPG à Moins de 100 Ko',
      lead: 'Portails administratifs stricts ? Notre moteur ajuste automatiquement la compression sous la barre des 100 Ko.',
    },
  },
  de: {
    'root': {
      title: 'PAJOEIT CONVERT – Kostenloser Online-Bild-Arbeitsbereich',
      shortTitle: 'All-in-One Bild-Workspace',
      tagline: 'Bilder online konvertieren, komprimieren und skalieren. Schnell. Kostenlos. Privat.',
      h1: 'Bilder Online Konvertieren, Komprimieren & Skalieren',
      lead: 'Leistungsstarker Bild-Arbeitsbereich im Browser. Formate wechseln, Dateigrößen reduzieren und Dimensionen anpassen – 100% privat ohne Server-Upload.',
    },
    'webp-to-png': {
      title: 'WebP zu PNG Konverter – Kostenlos & Verlustfrei im Browser',
      shortTitle: 'WebP zu PNG',
      h1: 'WebP zu PNG Online Konvertieren',
      lead: 'WebP-Bilder in universelle PNG-Dateien umwandeln – mit vollständiger Beibehaltung der Transparenz.',
    },
    'webp-to-jpg': {
      title: 'WebP zu JPG Konverter – Schnell & Universell Kompatibel',
      shortTitle: 'WebP zu JPG',
      h1: 'WebP zu JPG Online Konvertieren',
      lead: 'WebP-Dateien in universelle JPEG-Fotos umwandeln, die auf jedem Gerät sofort lesbar sind.',
    },
    'png-to-jpg': {
      title: 'PNG zu JPG Konverter – Dateigröße Drastisch Reduzieren',
      shortTitle: 'PNG zu JPG',
      h1: 'PNG zu JPG Online Konvertieren',
      lead: 'Große PNG-Dateien um bis zu 80% verkleinern bei erstklassiger visueller Schärfe.',
    },
    'jpg-to-png': {
      title: 'JPG zu PNG Konverter – Verlustfreie Bildqualität',
      shortTitle: 'JPG zu PNG',
      h1: 'JPG zu PNG Online Konvertieren',
      lead: 'JPEG-Dateien in verlustfreie PNG-Formate überführen für präzise Weiterbearbeitung.',
    },
    'image-compressor': {
      title: 'Bild-Kompressor – Dateigröße Reduzieren ohne Qualitätsverlust',
      shortTitle: 'Bild-Kompressor',
      h1: 'Bilder Online Komprimieren',
      lead: 'Dateigrößen drastisch schrumpfen ohne sichtbaren Qualitätsverlust direkt in Ihrem Browser.',
    },
    'image-resizer': {
      title: 'Bildgröße Ändern – Pixel & Seitenverhältnis Anpassen',
      shortTitle: 'Bild-Resizer',
      h1: 'Bildabmessungen Online Ändern',
      lead: 'Skalieren Sie Bilder auf exakte Pixelgrößen mit gesperrtem Seitenverhältnis und bikubischer Interpolation.',
    },
    'compress-jpg-to-100kb': {
      title: 'JPG auf 100KB Komprimieren – Kostenloser Zielgrößen-Optimizer',
      shortTitle: 'JPG auf 100KB Komprimieren',
      h1: 'JPG auf 100KB Online Komprimieren',
      lead: 'Strenge Upload-Limits bei Bewerbungen oder Behörden? Unser Algorithmus passt die Datei präzise unter 100KB an.',
    },
  },
  pt: {
    'root': {
      title: 'PAJOEIT CONVERT – Espaço de Trabalho de Imagens Online Gratuito',
      shortTitle: 'Espaço Tudo-em-Um',
      tagline: 'Converta, comprima e redimensione imagens online. Rápido. Grátis. Privado.',
      h1: 'Converter, Comprimir e Redimensionar Imagens Online',
      lead: 'Ferramenta de alto desempenho executada diretamente no navegador. 100% privada, sem upload para servidores.',
    },
    'webp-to-png': {
      title: 'Conversor WebP para PNG – Gratuito e de Alta Qualidade',
      shortTitle: 'WebP para PNG',
      h1: 'Converter WebP para PNG Online',
      lead: 'Transforme imagens WebP em PNGs de alta qualidade preservando total transparência.',
    },
    'webp-to-jpg': {
      title: 'Conversor WebP para JPG – Rápido e Gratuito',
      shortTitle: 'WebP para JPG',
      h1: 'Converter WebP para JPG Online',
      lead: 'Converta gráficos WebP em fotos JPEG compatíveis com qualquer dispositivo.',
    },
    'png-to-jpg': {
      title: 'Conversor PNG para JPG – Reduza o Tamanho do Arquivo',
      shortTitle: 'PNG para JPG',
      h1: 'Converter PNG para JPG Online',
      lead: 'Reduza o peso de arquivos PNG em até 80% mantendo alta nitidez visual.',
    },
    'jpg-to-png': {
      title: 'Conversor JPG para PNG – Qualidade Sem Perdas',
      shortTitle: 'JPG para PNG',
      h1: 'Converter JPG para PNG Online',
      lead: 'Converta JPEG para o formato PNG estável e sem perda de gerações sucessivas.',
    },
    'image-compressor': {
      title: 'Compressor de Imagens – Otimize Sem Perder Qualidade',
      shortTitle: 'Compressor de Imagens',
      h1: 'Comprimir Imagens Online',
      lead: 'Economize espaço em disco e acelere sites com compressão inteligente no navegador.',
    },
    'image-resizer': {
      title: 'Redimensionador de Imagens – Ajuste Pixels e Proporções',
      shortTitle: 'Redimensionador',
      h1: 'Redimensionar Imagens Online',
      lead: 'Mude a largura e altura de imagens mantendo a proporção original perfeita.',
    },
    'compress-jpg-to-100kb': {
      title: 'Comprimir JPG para 100KB – Ajuste Automático Gratuito',
      shortTitle: 'Comprimir JPG para 100KB',
      h1: 'Comprimir JPG para 100KB Online',
      lead: 'Limite rígido em portais de inscrição ou passaporte? Otimize seu JPG para menos de 100KB sem esforço.',
    },
  },
  ar: {
    'root': {
      title: 'PAJOEIT CONVERT – مساحة عمل معالجة الصور المجانية عبر الإنترنت',
      shortTitle: 'مساحة العمل المتكاملة',
      tagline: 'تحويل وضغط وتغيير حجم الصور عبر الإنترنت. سريع. مجاني. خاص. بدون تسجيل.',
      h1: 'تحويل وضغط وتغيير حجم الصور عبر الإنترنت',
      lead: 'مساحة عمل متطورة لمعالجة الصور مباشرة داخل متصفحك. خصوصية تامة بنسبة 100% دون رفع صورك إلى أي خادم خارجي.',
    },
    'webp-to-png': {
      title: 'تحويل WebP إلى PNG – مجاني وعالي الجودة في المتصفح',
      shortTitle: 'WebP إلى PNG',
      h1: 'تحويل WebP إلى PNG عبر الإنترنت',
      lead: 'حول صور WebP الحديثة إلى ملفات PNG بدون فقدان للجودة مع الحفاظ الكامل على شفافية الخلفية.',
    },
    'webp-to-jpg': {
      title: 'تحويل WebP إلى JPG – سريع ومتوافق عالمياً',
      shortTitle: 'WebP إلى JPG',
      h1: 'تحويل WebP إلى JPG عبر الإنترنت',
      lead: 'حول ملفات WebP إلى صور JPG قياسية متوافقة مع جميع الهواتف الذكية والتطبيقات.',
    },
    'png-to-jpg': {
      title: 'تحويل PNG إلى JPG – تقليص حجم الملفات بشكل كبير',
      shortTitle: 'PNG إلى JPG',
      h1: 'تحويل PNG إلى JPG عبر الإنترنت',
      lead: 'قلص حجم ملفات PNG بنسبة تصل إلى 80% مع الاحتفاظ بدقة بصرية مذهلة.',
    },
    'jpg-to-png': {
      title: 'تحويل JPG إلى PNG – جودة غير منقوصة للتحرير',
      shortTitle: 'JPG إلى PNG',
      h1: 'تحويل JPG إلى PNG عبر الإنترنت',
      lead: 'حول صور JPEG إلى تنسيق PNG بدون فقدان لمزيد من التعديل والتركيب الجرافيكي.',
    },
    'image-compressor': {
      title: 'ضاغط الصور – تقليص حجم الصور دون فقدان الجودة',
      shortTitle: 'ضاغط الصور',
      h1: 'ضغط الصور عبر الإنترنت',
      lead: 'وفر مساحة التخزين وسرع مواقع الويب من خلال تقنية ضغط ذكية تعمل محلياً داخل جهازك.',
    },
    'image-resizer': {
      title: 'تغيير حجم الصور – ضبط الأبعاد والنسب بدقة',
      shortTitle: 'مغير أبعاد الصور',
      h1: 'تغيير أبعاد الصور عبر الإنترنت',
      lead: 'غير أبعاد صورك بالبكسل مع قفل نسبة العرض إلى الارتفاع لمنع التشويه.',
    },
    'compress-jpg-to-100kb': {
      title: 'ضغط JPG إلى 100 كيلوبايت – محرك الحجم المستهدف الدقيق',
      shortTitle: 'ضغط JPG إلى 100KB',
      h1: 'ضغط JPG إلى أقل من 100 كيلوبايت',
      lead: 'هل تواجه حدوداً صارمة في بوابات التقديم والتأشيرات؟ يقوم محركنا بضبط الجودة ليكون الملف أقل من 100KB فوراً.',
    },
  },
  hi: {
    'root': {
      title: 'PAJOEIT CONVERT – मुफ्त ऑनलाइन इमेज वर्कस्पेस',
      shortTitle: 'ऑल-इन-वन इमेज वर्कस्पेस',
      tagline: 'छवियों को ऑनलाइन बदलें, कंप्रेस करें और रीसाइज़ करें। तेज़। मुफ़्त। निजी। बिना साइनअप।',
      h1: 'छवियों को ऑनलाइन कनवर्ट, कंप्रेस और रीसाइज़ करें',
      lead: 'ब्राउज़र में सीधे काम करने वाला शक्तिशाली इमेज टूल। 100% निजी, आपकी तस्वीरें कभी किसी सर्वर पर अपलोड नहीं होतीं।',
    },
    'webp-to-png': {
      title: 'WebP से PNG कनवर्टर – मुफ़्त और पारदर्शी',
      shortTitle: 'WebP से PNG',
      h1: 'WebP को PNG में ऑनलाइन बदलें',
      lead: 'WebP ग्राफिक्स को पारदर्शी पृष्ठभूमि के साथ दोषरहित PNG फाइलों में बदलें।',
    },
    'webp-to-jpg': {
      title: 'WebP से JPG कनवर्टर – तेज़ और सभी डिवाइस पर समर्थित',
      shortTitle: 'WebP से JPG',
      h1: 'WebP को JPG में ऑनलाइन बदलें',
      lead: 'WebP छवियों को मानक JPEG तस्वीरों में बदलें जो हर फोन और कंप्यूटर पर आसानी से खुलती हैं।',
    },
    'png-to-jpg': {
      title: 'PNG से JPG कनवर्टर – फ़ाइल साइज़ 80% तक घटाएं',
      shortTitle: 'PNG से JPG',
      h1: 'PNG को JPG में ऑनलाइन बदलें',
      lead: 'भारी PNG फाइलों को हल्का बनाएं ताकि वे ईमेल और वेबसाइटों पर तेज़ी से लोड हों।',
    },
    'jpg-to-png': {
      title: 'JPG से PNG कनवर्टर – संपादन के लिए बेहतरीन गुणवत्ता',
      shortTitle: 'JPG से PNG',
      h1: 'JPG को PNG में ऑनलाइन बदलें',
      lead: 'JPEG तस्वीरों को दोषरहित PNG में बदलें ताकि संपादन के दौरान गुणवत्ता खराब न हो।',
    },
    'image-compressor': {
      title: 'इमेज कंप्रेसर – बिना गुणवत्ता खोए फ़ाइल का आकार कम करें',
      shortTitle: 'इमेज कंप्रेसर',
      h1: 'इमेज ऑनलाइन कंप्रेस करें',
      lead: 'अपनी तस्वीरों की स्पष्टता बनाए रखते हुए उनके आकार को चुटकियों में कम करें।',
    },
    'image-resizer': {
      title: 'इमेज रीसाइज़र – सटीक पिक्सेल और अनुपात में बदलें',
      shortTitle: 'इमेज रीसाइज़र',
      h1: 'इमेज का आकार ऑनलाइन बदलें',
      lead: 'पहलू अनुपात (Aspect Ratio) को सुरक्षित रखते हुए तस्वीरों की चौड़ाई और ऊंचाई को ठीक से बदलें।',
    },
    'compress-jpg-to-100kb': {
      title: 'JPG को 100KB तक कंप्रेस करें – सरकारी और परीक्षा फॉर्म हेतु',
      shortTitle: 'JPG को 100KB बनाएं',
      h1: 'JPG को 100KB में ऑनलाइन कंप्रेस करें',
      lead: 'पासपोर्ट, नौकरी या परीक्षा फॉर्म के लिए सख्त 100KB सीमा? हमारा टूल आपकी फोटो को ठीक 100KB से कम कर देता है।',
    },
  },
  id: {
    'root': {
      title: 'PAJOEIT CONVERT – Workspace Gambar Online Gratis & Privat',
      shortTitle: 'Workspace Lengkap',
      tagline: 'Konversi, kompres, dan ubah ukuran gambar online. Cepat. Gratis. Privat. Tanpa daftar.',
      h1: 'Konversi, Kompres & Ubah Ukuran Gambar Online',
      lead: 'Workspace gambar berkecepatan tinggi langsung di browser Anda. Format fleksibel, ukuran hemat, 100% aman tanpa unggah ke server.',
    },
    'webp-to-png': {
      title: 'Konverter WebP ke PNG – Gratis & Berkualitas Tinggi',
      shortTitle: 'WebP ke PNG',
      h1: 'Konversi WebP ke PNG Online',
      lead: 'Ubah grafik WebP menjadi file PNG dengan transparansi latar belakang yang terjaga sempurna.',
    },
    'webp-to-jpg': {
      title: 'Konverter WebP ke JPG – Cepat & Kompatibel Universal',
      shortTitle: 'WebP ke JPG',
      h1: 'Konversi WebP ke JPG Online',
      lead: 'Ubah file WebP menjadi foto JPG standar yang dapat dibuka di perangkat mana pun.',
    },
    'png-to-jpg': {
      title: 'Konverter PNG ke JPG – Kurangi Ukuran File Hingga 80%',
      shortTitle: 'PNG ke JPG',
      h1: 'Konversi PNG ke JPG Online',
      lead: 'Kecilkan ukuran file PNG berat menjadi JPG ringan tanpa menurunkan kualitas visual secara kasat mata.',
    },
    'jpg-to-png': {
      title: 'Konverter JPG ke PNG – Kualitas Gambar Tanpa Penurunan',
      shortTitle: 'JPG ke PNG',
      h1: 'Konversi JPG ke PNG Online',
      lead: 'Ubah foto JPEG menjadi format PNG tanpa penurunan kualitas untuk kebutuhan desain grafis.',
    },
    'image-compressor': {
      title: 'Kompresor Gambar – Kecilkan Ukuran Tanpa Mengorbankan Ketajaman',
      shortTitle: 'Kompresor Gambar',
      h1: 'Kompres Gambar Online',
      lead: 'Hemat kapasitas memori dan percepat loading website dengan kompresi cerdas di browser.',
    },
    'image-resizer': {
      title: 'Pengubah Ukuran Gambar – Atur Piksel & Rasio Aspek',
      shortTitle: 'Ubah Ukuran',
      h1: 'Ubah Ukuran Gambar Online',
      lead: 'Sesuaikan dimensi foto dengan mengunci rasio aspek agar tidak terdistorsi.',
    },
    'compress-jpg-to-100kb': {
      title: 'Kompres JPG ke 100KB – Pas untuk Syarat Dokumen & Lamaran',
      shortTitle: 'Kompres JPG ke 100KB',
      h1: 'Kompres JPG ke 100KB Online',
      lead: 'Batas unggah portal ketat? Mesin ukuran target kami secara otomatis menyesuaikan kualitas agar pas di bawah 100KB.',
    },
  },
  zh: {
    'root': {
      title: 'PAJOEIT CONVERT – 免费在线图像工作空间',
      shortTitle: '全功能图像工作台',
      tagline: '在线转换、压缩和调整图像尺寸。快速。免费。隐私。无需注册。',
      h1: '在线转换、压缩与调整图片尺寸',
      lead: '高性能纯前端图片工作空间。无需上传到任何云端服务器，直接在浏览器中秒级完成格式转换与高质量压缩，100% 保护隐私。',
    },
    'webp-to-png': {
      title: 'WebP 转 PNG 转换器 – 免费高清保真透明背景',
      shortTitle: 'WebP 转 PNG',
      h1: '在线将 WebP 转换为 PNG',
      lead: '将现代 WebP 格式图片转换为通用的无损 PNG 格式，完整保留 Alpha 透明通道。',
    },
    'webp-to-jpg': {
      title: 'WebP 转 JPG 转换器 – 快速通用兼容',
      shortTitle: 'WebP 转 JPG',
      h1: '在线将 WebP 转换为 JPG',
      lead: '将 WebP 图片转换为兼容所有设备、手机和冲印系统的标准 JPEG 照片。',
    },
    'png-to-jpg': {
      title: 'PNG 转 JPG 转换器 – 大幅缩小文件体积达 80%',
      shortTitle: 'PNG 转 JPG',
      h1: '在线将 PNG 转换为 JPG',
      lead: '将庞大的 PNG 截图和图片压缩成小巧轻便的 JPG，同时保持细腻清晰的画质。',
    },
    'jpg-to-png': {
      title: 'JPG 转 PNG 转换器 – 无损保真适合二次编辑',
      shortTitle: 'JPG 转 PNG',
      h1: '在线将 JPG 转换为 PNG',
      lead: '将 JPG 图片导出为无损 PNG 容器，防止多次保存时的画质劣化。',
    },
    'image-compressor': {
      title: '图片压缩器 – 在线极致压缩不失真',
      shortTitle: '图片压缩器',
      h1: '在线压缩图片大小',
      lead: '在保留肉眼难以察觉的高画质前提下大幅缩减图片体积，全面加速网页加载速度。',
    },
    'image-resizer': {
      title: '图片尺寸调整器 – 精确像素与比例锁定',
      shortTitle: '调整尺寸',
      h1: '在线调整图片分辨率与像素',
      lead: '按固定比例无损调整图片宽度和高度，双三次重采样算法杜绝边缘锯齿。',
    },
    'compress-jpg-to-100kb': {
      title: 'JPG 压缩至 100KB – 证件照与考试上传专用神器',
      shortTitle: '压缩 JPG 至 100KB',
      h1: '在线将 JPG 压缩至 100KB 以内',
      lead: '报考、签证或办事网站限制 100KB？智能算法自动寻找最佳压缩点，确保文件小于 100KB。',
    },
  },
  ja: {
    'root': {
      title: 'PAJOEIT CONVERT – 無料オンライン画像ワークスペース',
      shortTitle: 'オールインワン画像ツール',
      tagline: '画像の変換、圧縮、リサイズをブラウザ内で完結。高速・無料・完全プライベート。',
      h1: '画像の変換・圧縮・リサイズをオンラインで完結',
      lead: 'サーバーへの画像アップロード一切なし。お使いの端末（ブラウザ）内で高速にフォーマット変換、容量削減、解像度リサイズを実行します。',
    },
    'webp-to-png': {
      title: 'WebP から PNG への変換 – 無料・高画質・透過保持',
      shortTitle: 'WebP から PNG',
      h1: 'WebP を PNG にオンライン変換',
      lead: 'WebP 画像を透過度（アルファチャンネル）を完全維持したまま、互換性の高い PNG に変換します。',
    },
    'webp-to-jpg': {
      title: 'WebP から JPG への変換 – 高速・あらゆる機器で表示可能',
      shortTitle: 'WebP から JPG',
      h1: 'WebP を JPG にオンライン変換',
      lead: 'WebP 画像をあらゆるデバイスや印刷機で開ける標準的な JPEG 写真に一括変換します。',
    },
    'png-to-jpg': {
      title: 'PNG から JPG への変換 – ファイル容量を最大80%削減',
      shortTitle: 'PNG から JPG',
      h1: 'PNG を JPG にオンライン変換',
      lead: '容量の重い PNG ファイルを最大80%軽量化。視覚的な鮮明さを維持したまま素早く保存。',
    },
    'jpg-to-png': {
      title: 'JPG から PNG への変換 – 画質劣化を防ぐ無劣化フォーマット',
      shortTitle: 'JPG から PNG',
      h1: 'JPG を PNG にオンライン変換',
      lead: 'JPEG 写真を再圧縮劣化のない PNG フォーマットに変換。デザイン編集のマスター用にも最適。',
    },
    'image-compressor': {
      title: '画像圧縮ツール – 画質を落とさずにファイル容量を大幅削減',
      shortTitle: '画像圧縮ツール',
      h1: '画像をオンラインで圧縮',
      lead: '見た目の美しさを保ったまま数メガバイトの写真を一瞬で軽量化。ウェブサイトの高速化にも。',
    },
    'image-resizer': {
      title: '画像リサイズツール – アスペクト比を固定してピクセル変更',
      shortTitle: '画像リサイズ',
      h1: '画像の解像度・サイズをオンライン変更',
      lead: '縦横比を固定したまま綺麗なバイキュービック補間で画像の拡大縮小を行います。',
    },
    'compress-jpg-to-100kb': {
      title: 'JPG を 100KB に圧縮 – 願書・申請ポータル専用ツール',
      shortTitle: 'JPG を 100KB に圧縮',
      h1: 'JPG を 100KB 以下に圧縮',
      lead: 'パスポートや公的申請の100KB制限も安心。自動探索エンジンが100KB以下に収まるよう最適化します。',
    },
  },
};

/**
 * Returns complete localized tool data for any tool and language
 */
export function getLocalizedTool(slug: string, lang: LanguageCode): LocalizedToolContent {
  const normalizedSlug = slug.replace(/^\//, '') || 'root';
  const base = EN_TOOLS[normalizedSlug] || EN_TOOLS['root'];

  if (lang === 'en') {
    return base;
  }

  const langOverrides = LOCALIZED_TOOLS[lang]?.[normalizedSlug];
  if (!langOverrides) {
    return base;
  }

  return {
    ...base,
    ...langOverrides,
  };
}
