import { HttpException } from "@exceptions/HttpException";
import { isEmpty } from "@utils/util";
import { writeFile } from "fs/promises";
import { unlink } from "fs";
import path from "path";

/**
 * Imagelarni yuklash va O'chirish bo'limi. Barchasi sodda murakkab logika yozilmagan
 */
export default class ImagesService {
	public async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
		if (isEmpty(files)) throw new HttpException(400, "Files is empty");

		const images: string[] = [];
		for (const file of files) {
			const image = `images/${file.originalname.split(".")[0]}-${Date.now()}${path.extname(
				file.originalname
			)}`;

			await writeFile(path.join(__dirname, "../../uploads/", image), file.buffer);

			images.push(image);
		}

		return images;
	}

	public async uploadIcons(files: Express.Multer.File[]): Promise<string[]> {
		if (isEmpty(files)) throw new HttpException(400, "Files is empty");

		const images: string[] = [];
		for (const file of files) {
			const image = `icons/${file.originalname.split(".")[0]}-${Date.now()}${path.extname(
				file.originalname
			)}`;

			await writeFile(path.join(__dirname, "../../uploads/", image), file.buffer);

			images.push(image);
		}

		return images;
	}

	public async daleteFile(images: string[]): Promise<string[]> {
		if (isEmpty(images)) throw new HttpException(400, "Images is empty");

		for (const image of images) {
			unlink(
				path.join(__dirname, "../../uploads/", image),
				(err: NodeJS.ErrnoException) => {}
			);
		}

		return images;
	}
}
