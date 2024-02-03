const Users = require('../models/Users');

const getAllUsers = async () => {
  const users = await Users.findAll();
  return users.map((user) => user.toJSON());
};

module.exports = { getAllUsers };
