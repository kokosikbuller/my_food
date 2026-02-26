import { createApp } from "./api/https";
import { db } from "./infrastructure/db/client";

const app = createApp(db);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

