import { z } from 'zod';

export const noteSyncItemSchema = z.object({
  id: z.string().min(1).max(64),
  title: z.string().max(500).default(''),
  content: z.string().max(500_000).default(''),
  tags: z.array(z.string().max(80)).max(50).default([]),
  pageUrl: z.string().max(2048).nullable().optional(),
  stack: z.array(z.string().max(80)).max(30).nullable().optional(),
  updatedAt: z.string().datetime(),
  deleted: z.boolean().optional().default(false),
});

export type NoteSyncItem = z.infer<typeof noteSyncItemSchema>;

export const noteSyncPushSchema = z.object({
  notes: z.array(noteSyncItemSchema).max(200),
});

export type NoteRecord = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  pageUrl: string | null;
  stack: string[] | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
