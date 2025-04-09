import express from "express";
import { getAllCategoriesinProject, getSingleCategoryinProject, addNewCategoryinProject,
     updateCategoryinProject, deleteCategoryinProject} from "./categoryController";

const router = express.Router({ mergeParams: true });

router.get("/", getAllCategoriesinProject);
router.get("/:categoryId", getSingleCategoryinProject);

router.post("/", addNewCategoryinProject);
router.put("/:categoryId", updateCategoryinProject);
router.delete("/:categoryId", deleteCategoryinProject);

export default router;
