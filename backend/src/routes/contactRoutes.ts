import { Router, Request, Response } from "express";
import Contact from "../models/Contact";

const router = Router();

// POST contact
router.post("/", async (req: Request, res: Response) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch {
    res.status(400).json({ message: "Failed to save contact" });
  }
});

// GET contacts
router.get("/", async (_req: Request, res: Response) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

export default router;
