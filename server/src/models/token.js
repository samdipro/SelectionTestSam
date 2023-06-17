module.exports = (sequelize, Sequelize) => {
  const token = sequelize.define("token", {
    token: {
      type: Sequelize.STRING,
    },
    expired: {
      type: Sequelize.DATE,
    },
    payload: {
      type: Sequelize.STRING,
    },
    valid: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    status: {
      type: Sequelize.ENUM("LOGIN", "FORGOT-PASSWORD", "VERIFY"),
    },
  });
  return token;
};
