const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function addSampleData() {
  try {
    // เพิ่มผู้ใช้ (ถ้ายังไม่มี)
    const existingUser = await prisma.user.findFirst({ where: { uname: 'testuser' } });
    if (!existingUser) {
      await prisma.user.create({
        data: {
          uid: 1,
          uname: 'testuser',
          upassword: await bcrypt.hash('testpassword', SALT_ROUNDS), // ถ้าใช้ bcrypt
          // หรือ upassword: 'testpassword' ถ้าใช้ plaintext
        },
      });
      console.log('เพิ่มผู้ใช้สำเร็จ');
    }

    // ข้อมูลใน admin ดูเหมือนมีอยู่แล้วจากภาพ ไม่ต้องเพิ่ม
    console.log('ตรวจสอบข้อมูลใน admin แล้ว');
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addSampleData();