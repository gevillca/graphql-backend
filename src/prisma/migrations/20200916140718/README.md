# Migration `20200916140718`

This migration has been generated by Gustavo Villca at 9/16/2020, 10:07:18 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"id" text   NOT NULL ,
"name" text   NOT NULL ,
"lastName" text   NOT NULL ,
"email" text   NOT NULL ,
"password" text   NOT NULL ,
"registerdate" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200916140718
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,17 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model User {
+  id           String   @id @default(uuid())
+  name         String
+  lastName     String
+  email        String   @unique
+  password     String
+  registerdate DateTime @default(now())
+}
```


