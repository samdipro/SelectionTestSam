module.exports = (sequelize, Sequelize) => {
  const verify = sequelize.define("verify", {
    link: Sequelize.STRING,
    valid: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });
  return verify;
};
