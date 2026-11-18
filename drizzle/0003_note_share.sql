CREATE TABLE IF NOT EXISTS "note_share" (
	"slug" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"note_id" text NOT NULL,
	"snapshot" jsonb NOT NULL,
	"referral_code" text,
	"created_at" timestamp NOT NULL,
	"expires_at" timestamp NOT NULL,
	"revoked_at" timestamp
);
ALTER TABLE "note_share" ADD CONSTRAINT "note_share_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
CREATE UNIQUE INDEX IF NOT EXISTS "note_share_user_note_idx" ON "note_share" USING btree ("user_id","note_id");