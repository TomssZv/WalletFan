import prisma from "./prisma";
import defaultCategories from "../defaults/defaultCategories.json"

const populateCategories = async () => {
  await prisma.category.createMany({
    data: defaultCategories.categories
  })
};

populateCategories();