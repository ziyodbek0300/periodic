import { Router } from "express";
import ImagesController from "@/controllers/images.controller";
import { Routes } from "@interfaces/routes.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import multerMiddleware from "@/middlewares/multer.middleware";

export default class ImagesRoute implements Routes {
	public path = "/images";
	public router = Router();
	public imagesController = new ImagesController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			`${this.path}/upload-images`,
			multerMiddleware(["image/jpeg", "image/jpg", "image/webp", "image/png"], 10).single(
				"image"
			),
			authMiddleware,
			this.imagesController.uploadImages
		);
		this.router.post(
			`${this.path}/upload-icons`,
			multerMiddleware(["image/svg+xml"], 10).single("icon"),
			authMiddleware,
			this.imagesController.uploadIcons
		);
		this.router.post(`${this.path}/delete`, authMiddleware, this.imagesController.deleteImages);
	}
}
