import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  })
);

app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.send("API is running");
});

app.use("/api/contacts", contactRoutes);

export default app;
