import express from "express";
import { getAllCategoriesinProject, getSingleCategoryinProject, addNewCategoryinProject,
     updateCategoryinProject, deleteCategoryinProject, 
     getSingleCategoryinProjectBySlug} from "./categoryController";

const router = express.Router({ mergeParams: true });

router.get("/", getAllCategoriesinProject);
router.post("/", addNewCategoryinProject);
router.get("/:categoryId", getSingleCategoryinProject);
router.get("/by-slug/:categorySlug", getSingleCategoryinProjectBySlug);
router.put("/:categoryId", updateCategoryinProject);
router.delete("/:categoryId", deleteCategoryinProject);

export default router;
