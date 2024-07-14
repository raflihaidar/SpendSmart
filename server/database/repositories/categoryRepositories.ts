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
        total: 1,
      },
    });

    return category;
  });
};

export const getCategoryById = async (userId: string) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        user: {
          some: {
            user_id: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
