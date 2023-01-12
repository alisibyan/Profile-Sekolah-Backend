const { Readable } = require("stream");
const { v4: uuid } = require("uuid");
const { storage } = require("./provider/firebase");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = class {
  static toBuffer(dataUri) {
    const base64 = dataUri.replace("data:", "").replace(/^.+,/, "");
    const contentType = dataUri.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    const buffer = Buffer.from(base64, "base64");
    return {
      buffer,
      contentType,
      extension: contentType.replace("image/", ""),
    };
  }

  /**
   *
   * @param {string} fileName
   * @param {any} res
   * @example holla.png
   */
  static async readFile(fileName, res) {
    try {
      const image = await prisma.image.findUnique({
        where: {
          fileName,
        },
      });
      if (!image) {
        return res.status(404).end("file not found");
      }
      const buffer = await storage.file(`${image.path}/${fileName}`).download();
      const stream = new Readable();
      stream._read = () => {};
      stream.push(buffer[0]);
      stream.push(null);
      res.contentType(image.contentType);
      return stream.pipe(res);
    } catch (error) {
      res.status(404).end("file not found");
    }
  }

  static async upload(dataUri, path = "image") {
    try {
      const { buffer, ...file } = this.toBuffer(dataUri);
      const idImage = uuid();
      const fileName = `${idImage}.${file.extension}`;
      const fileKey = `${path}/${fileName}`;
      await storage.file(fileKey).save(buffer);
      const image = await prisma.image.create({
        data: { idImage, fileName, contentType: file.contentType, path },
      });
      return image;
    } catch (error) {
      throw error;
    }
  }

  static async replace(dataUri, fileName) {
    try {
      const image = await prisma.image.findUnique({
        where: {
          fileName,
        },
      });
      if (!image) {
        throw new Error("file not found");
      }
      const { buffer, contentType } = this.toBuffer(dataUri);
      const fileKey = `${image.path}/${image.fileName}`;
      await storage.file(fileKey).save(buffer);
      await prisma.image.update({
        where: {
          idImage: image.idImage,
        },
        data: {
          contentType,
        },
      });
      return image;
    } catch (error) {
      throw error;
    }
  }

  static async remove(fileName) {
    try {
      const image = await prisma.image.findUnique({
        where: {
          fileName,
        },
      });
      const result = await Promise.all([
        prisma.image.delete({
          where: {
            idImage: image.idImage,
          },
        }),
        storage.deleteFiles({ prefix: `${image.path}/${image.fileName}` }),
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  //   export const uploadImage = async (destination: string, image: Buffer) => {
  //     const file = storage.bucket().file(destination);
  //     await file.save(image, { contentType: yourContentType });
  //     return file.publicUrl();
  //   };
};
