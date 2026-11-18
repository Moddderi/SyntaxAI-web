import { z } from 'zod';

export const NOTE_SHARE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export const noteShareSnapshotSchema = z.object({
  title: z.string().min(1).max(500),
  summary: z.string().max(20_000).optional(),
  body: z.string().max(200_000).optional(),
  code: z.string().max(500_000),
  primaryTech: z.string().max(80),
  language: z.string().max(80),
  topics: z.array(z.string().max(80)).max(50),
  sourceUrl: z.string().max(2048).optional(),
  sourceType: z.enum(['code', 'image', 'tab']).optional(),
  noteCreatedAt: z.string().datetime().optional(),
});

export type NoteShareSnapshot = z.infer<typeof noteShareSnapshotSchema>;

export const createNoteShareSchema = z.object({
  noteId: z.string().min(1).max(64),
  snapshot: noteShareSnapshotSchema,
});