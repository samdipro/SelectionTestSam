const db = require("../models");
// const { Op } = require("sequelize");
// const bcrypt = require("bcrypt");
// const { nanoid } = require("nanoid");
// const moment = require("moment");
// const mailer = require("../lib/mailer");
// const sharp = require("sharp");
const url_postIMG = process.env.URL_POSTIMG;

const postController = {
  insertPost: async (req, res) => {
    try {
      console.log("masuk");
      const { caption, user_id } = req.body;
      const filename = req?.file.filename;

      await db.Post.create({
        image: url_postIMG + filename,
        caption,
        user_id,
      }).then(() => {
        res.send({
          message: "Post success",
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
};
module.exports = postController;
