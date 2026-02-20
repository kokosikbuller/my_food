ALTER TABLE "categoriesSchema" RENAME TO "categories";--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_categoriesSchema_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;