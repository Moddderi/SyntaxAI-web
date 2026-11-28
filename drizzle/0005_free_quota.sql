ALTER TABLE "user" ADD COLUMN "free_note_day" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "free_note_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "free_context_day" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "free_context_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "free_photo_day" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "free_photo_count" integer DEFAULT 0 NOT NULL;
