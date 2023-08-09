import { listsRouter } from "~/server/api/routers/lists";
import { itemsRouter } from "~/server/api/routers/items";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  lists: listsRouter,
  items: itemsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
