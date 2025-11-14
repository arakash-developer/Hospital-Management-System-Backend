const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Add this import
const { connectDB } = require("./src/db/mongo"); // ensure correct path to your mongo helper

const app = express();

// enable body parsing before routes and capture raw body for diagnostics
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = (req.rawBody || "") + buf.toString();
    },
  })
);
app.use(
  express.urlencoded({
    extended: true,
    verify: (req, res, buf) => {
      req.rawBody = (req.rawBody || "") + buf.toString();
    },
  })
);
app.use(cookieParser());

// CORS configuration to accept multiple origins
const allowedOrigins = [
  "http://localhost:5173", // Vite frontend 1
  "http://localhost:5000", // Vite frontend 1
  "http://localhost:4173", // Vite frontend 2
  "https://bdhms.vercel.app", // Production frontend
  "https://hms.arakash.com", // Production frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));

// diagnostics middleware: fallback-parse rawBody when body is empty, and log helpful info
app.use((req, res, next) => {
  const ct = (req.headers && req.headers["content-type"]) || "";
  const bodyEmpty =
    req.body === undefined ||
    (typeof req.body === "object" && Object.keys(req.body).length === 0);

  if (bodyEmpty && req.rawBody && req.rawBody.trim()) {
    try {
      // try parse when content-type is json or missing
      if (ct.includes("application/json") || ct === "") {
        req.body = JSON.parse(req.rawBody);
        console.log(`Fallback-parsed rawBody for ${req.method} ${req.path}`);
      }
    } catch (err) {
      // store parse error for controllers to report if needed
      req._bodyParseError = err.message;
      console.warn(
        `Failed to parse rawBody for ${req.method} ${req.path}: ${err.message}`
      );
    }
  }

  if (
    req.body === undefined ||
    (typeof req.body === "object" && Object.keys(req.body).length === 0)
  ) {
    console.log(
      `Empty body for ${req.method} ${req.path} — content-type=${
        ct || "not provided"
      } rawLength=${req.rawBody ? req.rawBody.length : 0}`
    );
  }

  next();
});

// require and mount routes after middleware
const wellcomeRoute = require("./routes/wellcomeRoute");
app.use("/api/wellcome", wellcomeRoute);

const doctorRoutes = require("./routes/doctorRoute");
app.use("/api/doctors", doctorRoutes);

// IMPORTANT: user routes live under src/routes — require correct path
const userRoutes = require("./src/routes/userRoutes");
app.use("/api/users", userRoutes);

// ensure DB connects before listening
async function start() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
