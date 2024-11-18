require("dotenv").config(); // เพิ่มบรรทัดนี้
const app = require("./src/app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// เริ่มต้นเซิร์ฟเวอร์
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
