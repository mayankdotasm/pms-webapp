//viewRecordsRoutes.js

import express from'express';
import { getAllRecords, getRecordByPId, createNewRecord } from '../controllers/dataControllers.js';;
const router = express.Router();

// route GET && POST -/viewRecords
router.route("/").get(getAllRecords).post(createNewRecord);

router.route("/:id").get(getRecordByPId);
export default router;