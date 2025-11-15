const createUser = (req, res) => {
  res.send("User created successfully");
}
const getUser = (req, res) => {
  res.send("User details");
}
const updateUser = (req, res) => {
  res.send("User updated successfully");
}   
const deleteUser = (req, res) => {
  res.send("User deleted successfully");
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};