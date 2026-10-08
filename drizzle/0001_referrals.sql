CREATE TABLE IF NOT EXISTS "referral_meta" (
	"user_id" text PRIMARY KEY NOT NULL,
	"referral_code" text NOT NULL,
	"referred_by_user_id" text,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "referral_meta_referral_code_unique" UNIQUE("referral_code")
);
ALTER TABLE "referral_meta" ADD CONSTRAINT "referral_meta_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
