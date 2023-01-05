import { NextFunction, Request, Response } from "express";
import ImagesService from "@/services/images.service";
import catchAsync from "@/utils/catchAsync";

export default class SeriesController {
	private imagesService = new ImagesService();

	public uploadImages = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const images = await this.imagesService.uploadImages(req.files as Express.Multer.File[]);

		res.status(200).json({ data: images, message: "uploaded" });
	});

	public uploadIcons = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const images = await this.imagesService.uploadIcons(req.files as Express.Multer.File[]);

		res.status(200).json({ data: images, message: "uploaded" });
	});

	public deleteImages = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const images = await this.imagesService.daleteFile(req.body);

		res.status(200).json({ data: images, message: "deleted" });
	});
}
