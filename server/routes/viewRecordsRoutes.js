// viewRecordsRoutes.js

import express from 'express';
import {  getAllPrisoners,  findPrisonerById, createNewRecord, findPrisonersByDetails, getAllPersonnels,findPersonnelById,findPersonnelsByDetails} from '../controllers/basicData.js';
import {getResponse, getTable} from '../controllers/anyData.js'

const router = express.Router();

// GET all records and POST a new record
router.route('/')
    .get(getAllPrisoners)
    .post(createNewRecord);


router.get('/prisoners', getAllPrisoners);
router.get('/prisoners/:id', findPrisonerById);
router.post('/prisoners/search', findPrisonersByDetails);
router.get('/personnels', getAllPersonnels);
router.get('/personnels/:id', findPersonnelById);
router.post('/personnels/search', findPersonnelsByDetails);
router.post('/warden/query', getResponse);
router.post('/tables/:table', getTable);

export default router;