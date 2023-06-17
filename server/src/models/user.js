module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "User",
    {
      email: Sequelize.STRING,
      name: Sequelize.STRING,
      username: Sequelize.STRING,
      password: Sequelize.STRING,
      bio: Sequelize.STRING,
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      avatar_url: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
    }
  );
  return user;
};
