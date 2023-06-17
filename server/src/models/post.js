module.exports = (sequelize, Sequelize) => {
  const post = sequelize.define("Post", {
    caption: Sequelize.STRING,
    Image: {
      type: Sequelize.STRING,
    },
  });
  return post;
};
