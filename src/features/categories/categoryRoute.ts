import express from "express";
import { getAllCategoriesinProject, getSingleCategoryinProject, addNewCategoryinProject,
     updateCategoryinProject, deleteCategoryinProject,
     getSingleCategoryinProjectBySlug,
     addMultipleCategoriesinProject} from "./categoryController";

const router = express.Router({ mergeParams: true });

router.get("/", getAllCategoriesinProject);

router.get("/:categoryId", getSingleCategoryinProject);
router.get("/slug/:categorySlug", getSingleCategoryinProjectBySlug);

router.post("/", addNewCategoryinProject);
router.post("/multiple", addMultipleCategoriesinProject);
router.put("/:categoryId", updateCategoryinProject);
router.delete("/:categoryId", deleteCategoryinProject);

export default router;
