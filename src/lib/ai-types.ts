import { z } from 'zod';

export const aiLocaleSchema = z.enum(['en', 'uk']);

/** Combined cap for all base64 images in one request (~9 MB of image data). */
const MAX_TOTAL_IMAGE_CHARS = 12_000_000;

export const analyzeSnippetRequestSchema = z
  .object({
    locale: aiLocaleSchema.default('en'),
    promptOrCode: z.string().max(100_000).default(''),
    imagesBase64: z.array(z.string().max(6_000_000)).max(4).optional(),
  })
  .superRefine((value, ctx) => {
    const hasText = value.promptOrCode.trim().length > 0;
    const hasImages = Boolean(value.imagesBase64 && value.imagesBase64.length > 0);
    if (!hasText && !hasImages) {
      ctx.addIssue({
        code: 'custom',
        message: 'Provide promptOrCode and/or imagesBase64',
        path: ['promptOrCode'],
      });
    }

    const totalImageChars = (value.imagesBase64 ?? []).reduce((sum, image) => sum + image.length, 0);
    if (totalImageChars > MAX_TOTAL_IMAGE_CHARS) {
      ctx.addIssue({
        code: 'custom',
        message: 'Images are too large. Use smaller screenshots.',
        path: ['imagesBase64'],
      });
    }
  });

export type AnalyzeSnippetRequest = z.infer<typeof analyzeSnippetRequestSchema>;

export const pageContextSchema = z.object({
  selectedText: z.string().max(100_000).default(''),
  rawContent: z.string().max(200_000).min(1),
  url: z.string().max(2048),
  pageTitle: z.string().max(500).default(''),
  metaDescription: z.string().max(2000).optional(),
  siteType: z.enum(['github', 'stackoverflow', 'mdn', 'devto', 'general']),
  timestamp: z.number().int().nonnegative(),
});

export const analyzeMixedRequestSchema = z.object({
  locale: aiLocaleSchema.default('en'),
  pageContext: pageContextSchema,
});

export type AnalyzeMixedRequest = z.infer<typeof analyzeMixedRequestSchema>;

export const rawSnippetResultSchema = z
  .object({
    title: z.string(),
    primaryTech: z.string().optional(),
    language: z.string(),
    topics: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    summary: z.string().optional(),
    code: z.string(),
  })
  .superRefine((value, ctx) => {
    const hasTopics = Array.isArray(value.topics);
    const hasTags = Array.isArray(value.tags);
    if (!hasTopics && !hasTags) {
      ctx.addIssue({
        code: 'custom',
        message: 'topics or tags required',
        path: ['topics'],
      });
    }
  });

export type RawSnippetResult = z.infer<typeof rawSnippetResultSchema>;

export const rawMixedResultSchema = z.object({
  suggestedTitle: z.string().optional(),
  title: z.string().optional(),
  formattedNote: z.string().optional(),
  note: z.string().optional(),
  summary: z.string().optional(),
  primaryCode: z.string().optional(),
  code: z.string().optional(),
  language: z.string().optional(),
  primaryTech: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type RawMixedResult = z.infer<typeof rawMixedResultSchema>;
