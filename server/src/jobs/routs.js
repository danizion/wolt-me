const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get("/getAllJobs", controller.getAllJobs );
router.get("/getAllUncompletedJobs", controller.getAllUncompletedJobs );
router.post("/addNewAlert", controller.addNewAlert);
router.delete("/removeEmail", controller.removeEmail);

module.exports = router;