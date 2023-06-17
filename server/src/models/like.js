module.exports = (sequelize, Sequelize) => {
  const like = sequelize.define("like", {
    liked: Sequelize.BOOLEAN,
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    post_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  });
  return like;
};
