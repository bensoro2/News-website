// src/routes/settingRoutes.js
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

// GET /settings - ดึงค่าการตั้งค่า
router.get("/", async (req, res) => {
  try {
    let setting = await prisma.setting.findFirst();

    // ถ้ายังไม่มีค่าการตั้งค่า ให้สร้างค่าเริ่มต้น
    if (!setting) {
      setting = await prisma.setting.create({
        data: {
          facebookUrl: "https://www.facebook.com/nuuneoicom",
        },
      });
    }

    res.json(setting);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /settings - อัปเดตค่าการตั้งค่า
router.put("/", async (req, res) => {
  const { facebookUrl } = req.body;

  if (!facebookUrl) {
    return res.status(400).json({ error: "facebookUrl is required" });
  }

  try {
    let setting = await prisma.setting.findFirst();

    if (!setting) {
      // ถ้ายังไม่มีค่าการตั้งค่า ให้สร้างใหม่
      setting = await prisma.setting.create({
        data: {
          facebookUrl,
        },
      });
    } else {
      // อัปเดตค่าการตั้งค่าเดิม
      setting = await prisma.setting.update({
        where: { id: setting.id },
        data: { facebookUrl },
      });
    }

    res.json({ message: "Settings updated successfully", setting });
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
