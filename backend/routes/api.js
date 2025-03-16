const express = require('express');
const rateLimit = require('express-rate-limit');

// กำหนด rate limit: 100 คำขอใน 3 นาที
const apiLimit = rateLimit({
  windowMs: 1000 * 60 * 3, // 3 นาที
  max: 100,
  message: 'คุณส่งคำขอมากเกินไปจาก IP นี้ กรุณาลองใหม่หลังจาก 3 นาที',
});

const router = express.Router();

// นำเข้า controllers (แค่ 2 ไฟล์)
const AuthController = require('../controllers/AuthController');
const GameController = require('../controllers/GameController');

// Routes สำหรับการตรวจสอบสิทธิ์ (AuthController)
router.post('/admin/register', apiLimit, AuthController.registerAdmin);
router.post('/admin/login', apiLimit, AuthController.loginAdmin);
router.get('/admin/:id', AuthController.getAdminProfile);
router.put('/admin/:id', AuthController.updateAdmin);
router.delete('/admin/:id', AuthController.deleteAdmin);

router.post('/user/register', apiLimit, AuthController.registerUser);
router.post('/user/login', apiLimit, AuthController.loginUser);
router.get('/user/:id', AuthController.getUserProfile);
router.put('/user/:id', AuthController.updateUser);
router.delete('/user/:id', AuthController.deleteUser);

// Routes สำหรับข้อมูลเกม (GameController)
router.post('/character', apiLimit, GameController.createCharacter);
router.get('/characters', GameController.getAllCharacters);
router.get('/character/:id', GameController.getCharacterById);
router.put('/character/:id', GameController.updateCharacter);
router.delete('/character/:id', GameController.deleteCharacter);

router.post('/lightcone', apiLimit, GameController.createLightcone);
router.get('/lightcones', GameController.getAllLightcones);
router.get('/lightcone/:id', GameController.getLightconeById);
router.put('/lightcone/:id', GameController.updateLightcone);
router.delete('/lightcone/:id', GameController.deleteLightcone);

router.post('/planar-ornament', apiLimit, GameController.createPlanarOrnament);
router.get('/planar-ornaments', GameController.getAllPlanarOrnaments);
router.get('/planar-ornament/:id', GameController.getPlanarOrnamentById);
router.put('/planar-ornament/:id', GameController.updatePlanarOrnament);
router.delete('/planar-ornament/:id', GameController.deletePlanarOrnament);

router.post('/relic', apiLimit, GameController.createRelicSet);
router.get('/relics', GameController.getAllRelicSets);
router.get('/relic/:id', GameController.getRelicSetById);
router.put('/relic/:id', GameController.updateRelicSet);
router.delete('/relic/:id', GameController.deleteRelicSet);

router.post('/recommendation', apiLimit, GameController.createRecommendation);
router.get('/recommendations', GameController.getAllRecommendations);
router.get('/recommendation/:id', GameController.getRecommendationById);
router.get('/recommendations/character/:characterId', GameController.getRecommendationsByCharacter);
router.put('/recommendation/:id', GameController.updateRecommendation);
router.delete('/recommendation/:id', GameController.deleteRecommendation);

module.exports = router;