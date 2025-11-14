// welcomeController.js
const getWelcome = (req, res) => {
  res.json({ message: "Welcome" });
};

module.exports = {
  getWelcome,
};

// Minimal doctor controller exposing functions used by routes.
const isProd =
  process.env.RUNNING === "production" || process.env.NODE_ENV === "production";

const sendError = (res, status, message, err) => {
  const payload = { error: message };
  if (!isProd && err) payload.detail = err.message || String(err);
  return res.status(status).json(payload);
};

const createDoctor = async (req, res) => {
  try {
    if (!req.body) {
      return sendError(
        res,
        400,
        "Request body missing. Enable app.use(express.json())."
      );
    }
    const { name, email, specialization } = req.body;
    if (!name || !email) {
      return sendError(res, 400, "name and email are required");
    }
    // ...replace with DB logic (mongoose/prisma) as needed...
    const doctor = {
      id: Date.now().toString(),
      name,
      email,
      specialization: specialization || null,
    };
    return res.status(201).json(doctor);
  } catch (err) {
    console.error("createDoctor error:", err);
    return sendError(res, 500, "Failed to create doctor", err);
  }
};

const getDoctors = async (req, res) => {
  try {
    // ...replace with DB read...
    return res.json([]);
  } catch (err) {
    console.error("getDoctors error:", err);
    return sendError(res, 500, "Failed to fetch doctors", err);
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return sendError(res, 400, "Doctor id required");
    // ...replace with DB read...
    return res.json({ id });
  } catch (err) {
    console.error("getDoctorById error:", err);
    return sendError(res, 500, "Failed to fetch doctor", err);
  }
};

const updateDoctor = async (req, res) => {
  try {
    if (!req.body) {
      return sendError(
        res,
        400,
        "Request body missing. Enable app.use(express.json())."
      );
    }
    const { id } = req.params;
    if (!id) return sendError(res, 400, "Doctor id required");
    // ...replace with DB update...
    return res.json({ id, ...req.body });
  } catch (err) {
    console.error("updateDoctor error:", err);
    return sendError(res, 500, "Failed to update doctor", err);
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return sendError(res, 400, "Doctor id required");
    // ...replace with DB delete...
    return res.json({ message: "Doctor deleted", id });
  } catch (err) {
    console.error("deleteDoctor error:", err);
    return sendError(res, 500, "Failed to delete doctor", err);
  }
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
