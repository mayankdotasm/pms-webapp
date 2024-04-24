// Record.js
import db from '../config/database.js';

class Record {
    constructor(rollno, student_name, course, dob, mobile_no) {
        this.rollno = rollno;
        this.student_name = student_name;
        this.course = course;
        this.dob = dob;
        this.mobile_no = mobile_no;
    }

    async save() {
        let sql = `
        INSERT INTO 
        student (rollno, student_name, course, dob, mobile_no)
        VALUES (?, ?, ?, ?, ?)
        `;
        const newRecord = await db.query(sql, [this.rollno, this.student_name, this.course, this.dob, this.mobile_no]);
        return newRecord;
    }

    static findALL() {
        const sql = "SELECT * FROM Student";

        return db.query(sql);
    }

    static findById(rollno) {
        let sql = "SELECT * FROM student WHERE rollno = ?";

        return db.query(sql, [rollno]);
    }
}

export default Record;
// Record.findALL();