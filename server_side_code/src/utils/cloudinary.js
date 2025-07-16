const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config({ path: "./env" });
const mime = require("mime-types");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const mimeType = mime.lookup(localFilePath);
    const resourceType = mimeType === "application/pdf" ? "raw" : "auto";

    //upload the file on cloudinary

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType,
    });
    // file has been uploaded successfull

    fs.rmSync("./public/temp", { recursive: true, force: true });
    fs.mkdirSync("./public/temp");
    return response;
  } catch (error) {
    fs.rmSync("./public/temp", { recursive: true, force: true });
    fs.mkdirSync("./public/temp"); // remove the locally saved temporary file as the upload operation got failed
    console.error("Cloudinary upload failed", error);

    return null;
  }
};

module.exports = { uploadOnCloudinary };
