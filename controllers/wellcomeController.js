// welcomeController.js
const getWelcome = (req, res) => {
  res.json({ message: "Welcome" });
};

module.exports = {
  getWelcome,
};
