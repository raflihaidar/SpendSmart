import { Category } from "@prisma/client";
import { ICategory } from "~/types/ICategory";
import { prisma } from "~/server/database/client";

export const createCategory = async (
  data: ICategory
): Promise<Category | null> => {
  const category = await prisma.category.create({
    data: {
      name: data.name,
      type_id: data.type_id,
      user_id: data.user_id,
    },
  });
  return category;
};

export const getCategoryById = async (user_id: string, type_id: number = 1) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        AND: [
          {
            user_id,
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

export const deleteCategory = async (id: number) => {
  try {
    const deletedCategory = await prisma.category.delete({
      where: {
        id,
      },
    });

    return deletedCategory;
  } catch (error: any) {
    if (error.code === "P2003") {
      // Prisma error code for foreign key constraint
      throw createError({
        statusCode: 400,
        statusMessage:
          "Cannot delete category. It has associated transactions.",
      });
    }
  } finally {
    prisma.$disconnect;
  }
};

export const updateCategory = async (
  id: number,
  name: string
): Promise<Category | null> => {
  try {
    const result = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect;
  }
};
