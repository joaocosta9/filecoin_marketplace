CREATE TABLE "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"cid" text NOT NULL,
	"address" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"address" varchar PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_address_users_address_fk" FOREIGN KEY ("address") REFERENCES "public"."users"("address") ON DELETE no action ON UPDATE no action;