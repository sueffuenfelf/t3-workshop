import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const itemsRouter = createTRPCRouter({
  toggleDone: protectedProcedure
    .input(z.object({
      id: z.string(),
      done: z.boolean()
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.item.update({
        where: {
          id: input.id
        },
        data: {
          done: input.done
        }
      });
    }),
  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      listId: z.string()
    }))
    .mutation(({ ctx, input }) => {

      return ctx.prisma.item.create({
        data: {
          name: input.name,
          done: false,
          creatorId: ctx.session.user.id,
          listId: input.listId
        }
      });
    }),
  delete: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.item.delete({
        where: {
          id: input.id
        }
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.item.findMany();
  })
});
