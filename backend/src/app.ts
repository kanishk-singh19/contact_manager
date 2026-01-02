import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes";

const app = express();

// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://contact-manager-nu-gules.vercel.app"
    ],
    methods: ["GET", "POST", "DELETE"],
  })
);
app.use(express.json());

// ✅ Health check route
app.get("/", (_req, res) => {
  res.send("API is running");
});

app.use("/api/contacts", contactRoutes);

export default app;
