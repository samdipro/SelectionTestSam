const db = require("../models");
const { Op } = require("sequelize");
// const bcrypt = require("bcrypt");
// const { nanoid } = require("nanoid");
const moment = require("moment");
// const mailer = require("../lib/mailer");
// const sharp = require("sharp");
const url_postIMG = process.env.URL_POSTIMG;

const postController = {
  insertPost: async (req, res) => {
    try {
      const { caption, user_id } = req.body;
      const filename = req?.file.filename;

      await db.Post.create({
        Image: url_postIMG + filename,
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
  getPost: async (req, res) => {
    try {
      const whereClause = {};
      if (req.query.id) {
        whereClause.user_id = req.query.id;
      }
      const posts = await db.Post.findAll({
        include: [
          {
            model: db.User,
            foreignKey: "user_id",
          },
        ],
        where: whereClause,
      });
      // console.log(posts);
      res.send(posts);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  getPost1: async (req, res) => {
    try {
      const { id } = req.params;
      const posts = await db.Post.findOne({
        where: {
          user_id: id,
        },
        include: [
          {
            model: db.User,
            foreignKey: "user_id",
          },
        ],
      });
      console.log(posts);
      res.send(posts);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
};
module.exports = postController;
