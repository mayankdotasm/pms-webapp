// dataControllers.js
import Record from '../models/Record.js';
import Prisoner from '../models/Prisoner.js';
import CourtCase from '../models/CourtCase.js';
import Personnel from '../models/Personnel.js';



// prisoner functions
export const getAllPrisoners = async (req, res, next) => {
    try {
        const [prisoners, _] = await Prisoner.getAllPrisoners();
        res.status(200).json({ prisoners });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export const findPrisonerById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [prisoner, _] = await Prisoner.findPrisonerById(id);
        res.status(200).json({ prisoner });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export const findPrisonersByDetails = async (req, res, next) => {
    try {
        const details = req.body;
        const [prisoners, _] = await Prisoner.findPrisonersByDetails(details);
        console.log(details);
        res.status(200).json({ prisoners });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export const getAllPersonnels = async (req, res, next) => {
    try {
        const [personnels, _] = await Personnel.getAllPersonnel();
        res.status(200).json({ personnels });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export const findPersonnelById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [personnel, _] = await Personnel.findPersonnelById(id);
        res.status(200).json({ personnel});
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export const findPersonnelsByDetails = async (req, res, next) => {
    try {
        const details = req.body;
        const [personnels, _] = await Personnel.findPersonnelByDetails(details);
        console.log(details);
        res.status(200).json({ personnels});
        console.log(personnels)
    } catch (error) {
        console.error(error);
        next(error);
    }
}

//student database functions for reference
export const getAllRecords = async (req, res, next) => {
    try {
        const [records,_] = await Record.findALL();
        res.status(200).json({ records });
    } catch (error) {
        console.log(error);
        next(error);
    }
    // res.send('Get all Records');
}

export const getRecordByPId = async (req, res, next) => {
    try {
        let rollno = req.params.id;
        const [records,_] = await Record.findById(rollno);
        res.status(200).json({ records });
    } catch (error) {
        console.log(error);
        next(error);
    }
    // res.send('Get all Records');
}
export const searchRecords = async (req, res, next) => {
    try {
        const { name, course, dob, mobileNo } = req.body;
        const criteria = {};
        if (name) criteria.name = name;
        if (course) criteria.course = course;
        if (dob) criteria.dob = dob;
        if (mobileNo) criteria.mobileNo = mobileNo;
        
        const [records, _] = await Record.findByDetails(criteria);
        res.status(200).json({ records });
    } catch (error) {
        console.error(error);
        next(error);
    }
}
export const createNewRecord = async (req, res, next) => {
    // constructor(rollno,student_name,course,dob,mobile_no)

    try {
        const { rollno, student_name, course, dob, mobile_no } = req.body;
        const record = new Record(rollno, student_name, course, dob, mobile_no);
        const result = await record.save();
        console.log(result);
        res.status(201).json({ message: "Record created successfully", insertedId: result.insertId });
    } catch (error) {
        console.error(error);
        next(error);
    }
}
