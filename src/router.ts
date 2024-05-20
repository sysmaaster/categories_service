import express from "express";
import CategoryController from "./controller/category.controller";

const Router = () => {
  const router = express.Router();
  router.get("/:id", CategoryController.getAll);
  router.put("/:id", CategoryController.update);
  router.delete("/:id", CategoryController.delet);
  router.get("/", CategoryController.getAll);
  router.post("/", CategoryController.create);
  router.get("/healthcheck", (req, res) => res.sendStatus(200));
  return router;
};

export default Router;
