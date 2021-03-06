const fs = require("fs");
const { createWriteStream } = require("fs");
const tempWrite = require('temp-write');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CloudName,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const saveFile = ({ stream, filename }) =>
  new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(filename))
      .on("finish", () => resolve())
      .on("error", reject)
  );

const eager_options = {
  width: 200,
  crop: "fit"
};

const uploadToCloudinary = filename => {
  return new Promise((resolve, reject) => {
    const upload_stream = cloudinary.uploader.upload(
      filename,
      { tags: "basic_sample", public_id: "blue_lake", eager: eager_options },
      function(err, image) {
        if (err) {
          console.warn(err);
        }
        console.log("*original- " + image.url);
        console.log("*resized- " + image.eager[0].url);

        return resolve({
          original: image.url,
          w200: image.eager[0].url
        });
      }
    );
  });
};

const Mutations = {
  async uploadFile(parent, args, ctx, info) {
    const { stream } = await args.file;
    const filePath = tempWrite.sync('unicorn');
    const filename = fs.readFileSync(filePath, 'utf8');
    console.log({ filename });

    // write in fileSystem
    await saveFile({ stream, filename });

    // Eager Transformations:
    // Applied as soon as the file is uploaded, instead of lazily applying them when accessed by your site's visitors.

    // upload in cloudinary
    const { original, w200 } = await uploadToCloudinary(filename);

    return ctx.db.mutation.createScreen({
      data: {
        basepath: "hardcoded",
        original,
        w200
      }
    });
  }
};

module.exports = Mutations;
