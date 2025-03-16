const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const SALT_ROUNDS = 10; 

// ฟังก์ชันสำหรับผู้ดูแลระบบ
const registerAdmin = async (req, res) => {
  const { A_id, A_name, A_password } = req.body;
  try {
    // Hash รหัสผ่านก่อนบันทึก
    const hashedPassword = await bcrypt.hash(A_password, SALT_ROUNDS);
    const admin = await prisma.admin.create({
      data: { A_id, A_name, A_password: hashedPassword },
    });
    res.status(201).json({ message: 'ผู้ดูแลระบบถูกสร้างเรียบร้อย', admin });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้างผู้ดูแลระบบ' });
  }
};

const loginAdmin = async (req, res) => {
  const { A_id, A_password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({ where: { A_id } });
    if (admin && await bcrypt.compare(A_password, admin.A_password)) {
      res.json({ message: 'ล็อกอินสำเร็จ', user: { A_id: admin.A_id, role: 'Admin' } });
    } else {
      res.status(401).json({ error: 'รหัสผ่านหรือ ID ไม่ถูกต้อง' });
    }
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการล็อกอิน' });
  }
};

const getAdminProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await prisma.admin.findUnique({ where: { A_id: id } });
    if (admin) res.json(admin);
    else res.status(404).json({ error: 'ไม่พบผู้ดูแลระบบ' });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
};

// ฟังก์ชันสำหรับผู้ใช้
const registerUser = async (req, res) => {
  const { uid, uname, upassword } = req.body;
  try {
    // Hash รหัสผ่านก่อนบันทึก
    const hashedPassword = await bcrypt.hash(upassword, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: { uid, uname, upassword: hashedPassword },
    });
    res.status(201).json({ message: 'ผู้ใช้ถูกสร้างเรียบร้อย', user });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้างผู้ใช้' });
  }
};

const loginUser = async (req, res) => {
  const { uname, upassword } = req.body;
  try {
    const user = await prisma.user.findFirst({ where: { uname } });
    if (user && await bcrypt.compare(upassword, user.upassword)) {
      res.json({ message: 'ล็อกอินสำเร็จ', user: { uname: user.uname, role: 'User' } });
    } else {
      res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการล็อกอิน' });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdmin: async (req, res) => {/* ... */},
  deleteAdmin: async (req, res) => {/* ... */},
  registerUser,
  loginUser,
  getUserProfile: async (req, res) => {/* ... */},
  updateUser: async (req, res) => {/* ... */},
  deleteUser: async (req, res) => {/* ... */},
};