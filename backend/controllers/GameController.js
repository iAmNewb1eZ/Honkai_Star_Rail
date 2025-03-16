const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCharacter = async (req, res) => {
  const { C_id, C_name, C_path, C_element, C_role, C_rarelity, C_images } = req.body;
  try {
    const character = await prisma.character.create({
      data: { C_id, C_name, C_path, C_element, C_role, C_rarelity, C_images },
    });
    res.status(201).json({ message: 'ตัวละครถูกสร้างเรียบร้อย', character });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้างตัวละคร' });
  }
};

const getAllCharacters = async (req, res) => {
  const { C_path, C_rarelity } = req.query;
  try {
    const characters = await prisma.character.findMany({
      where: { C_path: C_path || undefined, C_rarelity: C_rarelity || undefined },
    });
    res.json({ characters });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงตัวละคร' });
  }
};

const getCharacterById = async (req, res) => {
  const { id } = req.params;
  try {
    const character = await prisma.character.findUnique({
      where: { C_id: parseInt(id) }, // เปลี่ยนตามประเภทของ C_id (ถ้าเป็น Int)
    });
    if (character) res.json(character);
    else res.status(404).json({ error: 'ไม่พบตัวละคร' });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงตัวละคร' });
  }
};

const updateCharacter = async (req, res) => {
  const { id } = req.params;
  const { C_name, C_path, C_element, C_role, C_rarelity, C_images } = req.body;
  try {
    const character = await prisma.character.update({
      where: { C_id: parseInt(id) },
      data: { C_name, C_path, C_element, C_role, C_rarelity, C_images },
    });
    res.json({ message: 'ตัวละครถูกอัพเดทเรียบร้อย', character });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัพเดทตัวละคร' });
  }
};

const deleteCharacter = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.character.delete({
      where: { C_id: parseInt(id) },
    });
    res.json({ message: 'ตัวละครถูกลบเรียบร้อย' });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบตัวละคร' });
  }
};

const createLightcone = async (req, res) => {
  const { LC_id, LC_name, LC_path, LC_Effect, LC_rarelity } = req.body;
  try {
    const lightcone = await prisma.lightcone.create({
      data: { LC_id, LC_name, LC_path, LC_Effect, LC_rarelity },
    });
    res.status(201).json({ message: 'ไลต์โคนถูกสร้างเรียบร้อย', lightcone });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้างไลต์โคน' });
  }
};

const getAllLightcones = async (req, res) => {
  const { page = 1, limit = 12 } = req.query; 
  try {
    const skip = (page - 1) * limit;
    const lightcones = await prisma.lightcone.findMany({
      skip: parseInt(skip),
      take: parseInt(limit),
      select: {
        LC_id: true,
        LC_name: true,
        LC_path: true, // ต้องมีฟิลด์นี้เพื่อกรองใน Frontend
        LC_Effect: true,
        LC_rarelity: true,
        LC_images: true,
      },
    });
    const total = await prisma.lightcone.count();
    res.json({ lightcones, totalPages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    console.error('Error in getAllLightcones:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงไลต์โคน: ' + error.message });
  }
};

const getLightconeById = async (req, res) => {
  const { id } = req.params;
  try {
    const lightcone = await prisma.lightcone.findUnique({
      where: { LC_id: id },
    });
    if (lightcone) res.json(lightcone);
    else res.status(404).json({ error: 'ไม่พบไลต์โคน' });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงไลต์โคน' });
  }
};

const updateLightcone = async (req, res) => {
  const { id } = req.params;
  const { LC_name, LC_path, LC_Effect, LC_rarelity } = req.body;
  try {
    const lightcone = await prisma.lightcone.update({
      where: { LC_id: id },
      data: { LC_name, LC_path, LC_Effect, LC_rarelity },
    });
    res.json({ message: 'ไลต์โคนถูกอัพเดทเรียบร้อย', lightcone });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัพเดทไลต์โคน' });
  }
};

const deleteLightcone = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.lightcone.delete({
      where: { LC_id: id },
    });
    res.json({ message: 'ไลต์โคนถูกลบเรียบร้อย' });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบไลต์โคน' });
  }
};

const createPlanarOrnament = async (req, res) => {
  const { PO_id, PO_name, PO_Effect } = req.body;
  try {
    const planarOrnament = await prisma.planar_ornaments.create({
      data: { PO_id, PO_name, PO_Effect },
    });
    res.status(201).json({ message: 'เครื่องประดับ planar ถูกสร้างเรียบร้อย', planarOrnament });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้างเครื่องประดับ planar' });
  }
};

const getAllPlanarOrnaments = async (req, res) => {
  try {
    const planarOrnaments = await prisma.planar_ornaments.findMany();
    res.json({ planarOrnaments });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงเครื่องประดับ planar' });
  }
};

const getPlanarOrnamentById = async (req, res) => {
  const { id } = req.params;
  try {
    const planarOrnament = await prisma.planar_ornaments.findUnique({
      where: { PO_id: id },
    });
    if (planarOrnament) res.json(planarOrnament);
    else res.status(404).json({ error: 'ไม่พบเครื่องประดับ planar' });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงเครื่องประดับ planar' });
  }
};

const updatePlanarOrnament = async (req, res) => {
  const { id } = req.params;
  const { PO_name, PO_Effect } = req.body;
  try {
    const planarOrnament = await prisma.planar_ornaments.update({
      where: { PO_id: id },
      data: { PO_name, PO_Effect },
    });
    res.json({ message: 'เครื่องประดับ planar ถูกอัพเดทเรียบร้อย', planarOrnament });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัพเดทเครื่องประดับ planar' });
  }
};

const deletePlanarOrnament = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.planar_ornaments.delete({
      where: { PO_id: id },
    });
    res.json({ message: 'เครื่องประดับ planar ถูกลบเรียบร้อย' });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบเครื่องประดับ planar' });
  }
};

const createRelicSet = async (req, res) => {
  const { R_id, R_name, R_Effect_2, R_Effect_4 } = req.body;
  try {
    const relicSet = await prisma.relic_set.create({
      data: { R_id, R_name, R_Effect_2, R_Effect_4 },
    });
    res.status(201).json({ message: 'ชุดรีลิกถูกสร้างเรียบร้อย', relicSet });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้างชุดรีลิก' });
  }
};

const getAllRelicSets = async (req, res) => {
  try {
    const relicSets = await prisma.relic_set.findMany();
    res.json({ relicSets });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงชุดรีลิก' });
  }
};

const getRelicSetById = async (req, res) => {
  const { id } = req.params;
  try {
    const relicSet = await prisma.relic_set.findUnique({
      where: { R_id: id },
    });
    if (relicSet) res.json(relicSet);
    else res.status(404).json({ error: 'ไม่พบชุดรีลิก' });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงชุดรีลิก' });
  }
};

const updateRelicSet = async (req, res) => {
  const { id } = req.params;
  const { R_name, R_Effect_2, R_Effect_4 } = req.body;
  try {
    const relicSet = await prisma.relic_set.update({
      where: { R_id: id },
      data: { R_name, R_Effect_2, R_Effect_4 },
    });
    res.json({ message: 'ชุดรีลิกถูกอัพเดทเรียบร้อย', relicSet });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัพเดทชุดรีลิก' });
  }
};

const deleteRelicSet = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.relic_set.delete({
      where: { R_id: id },
    });
    res.json({ message: 'ชุดรีลิกถูกลบเรียบร้อย' });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบชุดรีลิก' });
  }
};

const createRecommendation = async (req, res) => {
  const { RC_name, C_id, R_id, LC_id, PO_id, uid } = req.body;
  try {
    const recommendation = await prisma.recomment_record.create({
      data: { RC_name, C_id, R_id, LC_id, PO_id, uid },
    });
    res.status(201).json({ message: 'บันทึกแนะนำถูกสร้าง', recommendation });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้างบันทึกแนะนำ' });
  }
};

const getAllRecommendations = async (req, res) => {
  const { C_id } = req.query;
  try {
    const recommendations = await prisma.recomment_record.findMany({
      where: { C_id: C_id ? parseInt(C_id) : undefined },
      include: {
        character: true,
        lightcone: true,
        planar_ornaments: true,
        relic_set: true,
        user: true,
      },
    });
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงบันทึกแนะนำ' });
  }
};

const getRecommendationById = async (req, res) => {
  const { id } = req.params;
  try {
    const recommendation = await prisma.recomment_record.findUnique({
      where: { RC_id: parseInt(id) },
      include: {
        character: true,
        lightcone: true,
        planar_ornaments: true,
        relic_set: true,
        user: true,
      },
    });
    if (recommendation) res.json(recommendation);
    else res.status(404).json({ error: 'ไม่พบบันทึกแนะนำ' });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงบันทึกแนะนำ' });
  }
};

const getRecommendationsByCharacter = async (req, res) => {
  const { characterId } = req.params;
  try {
    const recommendations = await prisma.recomment_record.findMany({
      where: { C_id: parseInt(characterId) },
      include: {
        character: true,
        lightcone: true,
        planar_ornaments: true,
        relic_set: true,
        user: true,
      },
    });
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงบันทึกแนะนำสำหรับตัวละคร' });
  }
};

const updateRecommendation = async (req, res) => {
  const { id } = req.params;
  const { RC_name, C_id, R_id, LC_id, PO_id, uid } = req.body;
  try {
    const recommendation = await prisma.recomment_record.update({
      where: { RC_id: parseInt(id) },
      data: { RC_name, C_id, R_id, LC_id, PO_id, uid },
    });
    res.json({ message: 'บันทึกแนะนำถูกอัพเดทเรียบร้อย', recommendation });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัพเดทบันทึกแนะนำ' });
  }
};

const deleteRecommendation = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.recomment_record.delete({
      where: { RC_id: parseInt(id) },
    });
    res.json({ message: 'บันทึกแนะนำถูกลบเรียบร้อย' });
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบบันทึกแนะนำ' });
  }
};

module.exports = {
  createCharacter,
  getAllCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
  createLightcone,
  getAllLightcones,
  getLightconeById,
  updateLightcone,
  deleteLightcone,
  createPlanarOrnament,
  getAllPlanarOrnaments,
  getPlanarOrnamentById,
  updatePlanarOrnament,
  deletePlanarOrnament,
  createRelicSet,
  getAllRelicSets,
  getRelicSetById,
  updateRelicSet,
  deleteRelicSet,
  createRecommendation,
  getAllRecommendations,
  getRecommendationById,
  getRecommendationsByCharacter,
  updateRecommendation,
  deleteRecommendation,
};