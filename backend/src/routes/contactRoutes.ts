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

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact" });
  }
});

export default router;
