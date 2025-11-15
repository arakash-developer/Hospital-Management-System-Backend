const Country = require("../models/country");

// CREATE COUNTRY
const createCountry = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await Country.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Country already exists" });
    }

    const country = new Country({ name });
    const saved = await country.save();

    res.status(201).json({
      message: "Country created successfully",
      countryId: saved._id,
    });
  } catch (error) {
    console.error("Error creating country:", error);
    res.status(500).json({ message: "Failed to create country" });
  }
};

// GET ALL COUNTRIES
const getCountries = async (req, res) => {
  try {
    const data = await Country.find().sort({ _id: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ message: "Failed to fetch countries" });
  }
};

// UPDATE COUNTRY
const updateCountry = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    const updated = await Country.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.status(200).json({
      message: "Country updated successfully",
      country: updated,
    });
  } catch (error) {
    console.error("Error updating country:", error);
    res.status(500).json({ message: "Failed to update country" });
  }
};

// DELETE COUNTRY
const deleteCountry = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Country.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.status(200).json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).json({ message: "Failed to delete country" });
  }
};

module.exports = {
  createCountry,
  getCountries,
  updateCountry,
  deleteCountry,
};
