CREATE TABLE "categoriesSchema" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "category_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categoriesSchema_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categoriesSchema"("id") ON DELETE no action ON UPDATE no action;