module.exports = (sequelize, Sequelize) => {
  const comment = sequelize.define("comment", {
    comments: Sequelize.INTEGER,
  });
  return comment;
};
