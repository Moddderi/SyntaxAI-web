ALTER TABLE "user" ADD COLUMN "creem_customer_id" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "had_trial" boolean DEFAULT false NOT NULL;
