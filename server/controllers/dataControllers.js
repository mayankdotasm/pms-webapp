//dataController.js
// export async function getAllRecords() {
//     const [rows] = await db.query("select * from society");
//     return rows[0];
// }

// export async function getRecordByPId(socid) {
//     // prepared statement
//     const [row] = await db.query(`
//     select * from society
//     where socid=?`, [socid]);
//     return row[0];
// }

// export async function createNewRecord(socid,socname,mentor_name,total_seats){
//     const [result]= await db.query(`
//     insert into 
//     society (socid,socname,mentor_name,total_seats)
//     values (?, ?, ?, ?)`,[socid,socname,mentor_name,total_seats]);
//     return result;
// }


// dataControllers.js
import Record from '../models/Record.js';

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
