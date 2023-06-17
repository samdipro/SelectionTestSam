const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const moment = require("moment");
const mailer = require("../lib/mailer");
const url_pass = process.env.url_pass;
const url_verif = process.env.url_verif;

const url_image = process.env.URL_IMAGE;

const userController = {
  register: async (req, res) => {
    try {
      const { email, name, username, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);

      const cemail = await db.User.findOne({
        where: {
          email,
        },
      });
      if (cemail) {
        throw new Error("email allready exist");
      }
      const cuser = await db.User.findOne({
        where: {
          username,
        },
      });
      if (cuser) {
        throw new Error("username allready exist");
      }

      const user = await db.User.create({
        email,
        name,
        username,
        password: hashPassword,
      });

      const generateToken = nanoid();
      const token = await db.Token.create({
        expired: moment().add(1, "d").format(),
        token: generateToken,
        payload: user.dataValues.id,
        status: "VERIFY",
      });

      mailer({
        subject: "Verify Account",
        to: user.dataValues.email, //email untuk verify
        text: "please verfy using this link:" + url_verif + generateToken,
      });
      return await db.User.findOne().then((result) => {
        res.send(result);
      });
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  },

  getByEmail: async (req, res) => {
    try {
      const { email } = req.query;
      const check = await db.User.findOne({
        where: {
          email,
        },
      });
      console.log(check.dataValues.email);
      if (check) {
        res.send(true);
      } else {
        res.send(false);
      }
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { emun, password } = req.query;
      const user = await db.User.findOne({
        where: { [db.Sequelize.Op.or]: [{ name: emun }, { email: emun }] },
      });

      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);
        // console.log(match);
        console.log(user.dataValues.id);
        if (match) {
          const payload = {
            id: user.dataValues.id,
          };
          const generateToken = nanoid();
          // console.log(nanoid());
          const cektoken = await db.Token.update(
            {
              valid: false,
            },
            {
              where: {
                payload: JSON.stringify({ id: user.dataValues.id }),
                // status: "login",
                valid: true,
              },
            }
          );
          const token = await db.Token.create({
            expired: moment().add(1, "days").format(),
            token: generateToken,
            payload: JSON.stringify(payload.id),
          });
          // console.log(token);
          return res.send({
            message: "login berhasil",
            value: user,
            token: token.dataValues.token,
          });
        } else {
          throw new Error("login Gagal");
        }
      } else {
        return res.send({ message: "login gagal" });
      }
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  editUser: async (req, res) => {
    try {
      const { name, username, bio } = req.body;
      const filename = req.file?.filename;
      const editClause = {};
      let check;
      console.log(name);
      if (name) {
        editClause.name = name;
      }
      console.log(username);
      if (username) {
        editClause.username = username;
        check = await db.User.findOne({
          where: {
            username,
          },
        });

        if (check?.dataValues.username == username) {
          return res.send("username already been used");
        }
      }
      console.log(filename);
      if (filename) {
        editClause.avatar_url = url_image + filename;
      }
      console.log(bio);
      if (bio) {
        editClause.bio = bio;
      }
      if (!Object.keys(editClause).length) {
        return res.send({ message: "No fields to update" });
      }
      console.log(req.params.id);
      console.log(editClause);
      const update = await db.User.update(editClause, {
        where: {
          id: req.params.id,
        },
      });
      console.log(update);

      return await db.User.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => {
        delete result.dataValues.password;
        res.send(result.dataValues);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  getByToken: async (req, res) => {
    try {
      const { token } = req.query;
      let data = await db.Token.findOne({
        where: {
          [Op.and]: [
            {
              token,
            },
            {
              expired: {
                [Op.gt]: moment("00:00:00", "hh:mm:ss").format(),
                [Op.lte]: moment().add(1, "d").format(),
              },
            },
            {
              valid: true,
            },
          ],
        },
      });

      // console.log(data.dataValues.payload);

      const user = await db.User.findOne({
        where: {
          id: data.dataValues.payload,
        },
      });
      delete user.dataValues.password;
      res.send(user);
      console.log(user.dataValues);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  },
  forgetPass: async (req, res) => {
    try {
      const { email } = req.query;
      const user = await db.User.findOne({
        where: {
          email: email,
        },
      });
      if (user.dataValues) {
        await db.Token.update(
          {
            valid: false,
          },
          {
            where: {
              payload: JSON.stringify({ id: user.dataValues.id }),
              status: "FORGOT-PASSWORD",
            },
          }
        );
        const payload = {
          id: user.dataValues.id,
        };
        const generateToken = nanoid();
        const token = await db.Token.create({
          expired: moment().add(1, "d").format(),
          token: generateToken,
          payload: JSON.stringify(payload),
          status: "FORGOT-PASSWORD",
        });

        await mailer({
          subject: "Reset Password",
          to: user.dataValues.email, //email untuk forget password
          text: url_pass + generateToken,
        });

        return res.send({
          message: "silahkan check email anda",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  changePass: async (req, res) => {
    try {
      const { token } = req.params;
      // console.log(token);
      let data = await db.Token.findOne({
        where: {
          [Op.and]: [
            {
              token,
            },
            {
              expired: {
                [Op.gt]: moment("00:00:00", "hh:mm:ss").format(),
                [Op.lte]: moment().add(1, "d").format(),
              },
            },
            {
              valid: true,
            },
          ],
        },
      });

      console.log(data.dataValues.payload);

      // const user = await db.User.findOne({
      //   where: {
      //     id: data.dataValues.payload,
      //   },
      // });

      const { password } = req.body;
      console.log(password);
      // const id = data.dataValues.payload;
      const id = JSON.parse(data.dataValues.payload);
      console.log(id.id);
      const hashPassword = await bcrypt.hash(password, 10);
      await db.User.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id: id.id,
          },
        }
      );
      await db.Token.update(
        {
          valid: false,
        },
        {
          where: {
            token,
          },
        }
      );
      await db.User.findOne({
        where: {
          id: id.id,
        },
      }).then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  reqVerify: async (req, res) => {
    try {
      const { email } = req.query;
      const user = await db.User.findOne({
        where: {
          email: email,
        },
      });
      console.log(user.dataValues.email);
      if (user.dataValues.email) {
        await db.Token.update(
          {
            valid: false,
          },
          {
            where: {
              payload: JSON.stringify({ id: user.dataValues.id }),
              status: "VERIFY",
            },
          }
        );
        const payload = {
          id: user.dataValues.id,
        };
        const generateToken = nanoid();
        const token = await db.Token.create({
          expired: moment().add(1, "d").format(),
          token: generateToken,
          payload: JSON.stringify(payload),
          status: "VERIFY",
        });

        await mailer({
          subject: "Verify Account",
          to: user.dataValues.email, //email untuk verify
          text: url_verif + generateToken,
        });

        return res.send({
          message: "silahkan check email anda",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  verify: async (req, res) => {
    try {
      const { token } = req.params;
      // console.log(token);
      let data = await db.Token.findOne({
        where: {
          [Op.and]: [
            {
              token,
            },
            {
              expired: {
                [Op.gt]: moment("00:00:00", "hh:mm:ss").format(),
                [Op.lte]: moment().add(1, "d").format(),
              },
            },
            {
              valid: true,
            },
          ],
        },
      });

      console.log(data.dataValues.payload);

      const id = data.dataValues.payload;
      await db.User.update(
        {
          verified: true,
        },
        {
          where: {
            id,
          },
        }
      );
      await db.Token.update(
        {
          valid: false,
        },
        {
          where: {
            token,
          },
        }
      );
      await db.User.findOne({
        where: {
          id,
        },
      }).then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  uploadAvatar: async (req, res) => {
    try {
      console.log("masuk");
      const { filename } = req.file;
      await db.User.update(
        {
          avatar_url: url_image + filename,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      await db.User.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => res.send(result));
    } catch (error) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
};
module.exports = userController;
