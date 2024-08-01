import { Category } from "@prisma/client";
import { ICategory } from "~/types/ICategory";
import { prisma } from "~/server/database/client";

export const createCategory = async (
  data: ICategory
): Promise<Category | null> => {
  return await prisma.$transaction(async (tx) => {
    const category = await tx.category.create({
      data: {
        name: data.name,
        type_id: data.type_id,
      },
    });

    await tx.userCategory.create({
      data: {
        user_id: data.user_id,
        category_id: category.id,
      },
    });

    return category;
  });
};

export const getCategoryById = async (userId: string, type_id: number = 1) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        AND: [
          {
            user: {
              some: {
                user_id: userId,
              },
            },
          },
          {
            type_id,
          },
        ],
      },
      select: {
        id: true,
        name: true,
      },
    });

    return categories;
  } catch (error) {
    throw error;
  }
};
