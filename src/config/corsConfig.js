const cors = require("cors");

const configureCors = () => {
  return cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "https://localhost:3000",
      ];

      if (!origin || allowedOrigins.indexOf(origin) != -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors"));
      }
    },

    methods: ["GET", "POST", "PUT", "DELETE"],
  });
};
