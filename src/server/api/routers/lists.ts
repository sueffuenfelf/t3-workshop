import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const listsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      name: z.string(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.list.create({
        data: {
          name: input.name,
          creatorId: ctx.session.user.id
        },
        include: {
          creator: true
        }
      });
    }),
  delete: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.list.delete({
        where: {
          id: input.id
        }
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.list.findMany({
      include: {
        creator: true,
        items: true
      }
    });
  }),
  getOne: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(({ ctx, input }) => {
      return ctx.prisma.list.findUnique({
        where: {
          id: input.id
        },
        include: {
          creator: true,
          items: true
        }
      });
    }),
});
