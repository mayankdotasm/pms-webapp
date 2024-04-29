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

    static findByDetails(criteria) {
        let sql = "SELECT * FROM student WHERE";
        const params = [];
        const conditions = [];
    
        if (criteria.name) {
            conditions.push("student_name = ?");
            params.push(criteria.name);
        }
        if (criteria.course) {
            conditions.push("course = ?");
            params.push(criteria.course);
        }
        if (criteria.dob) {
            conditions.push("dob = ?");
            params.push(criteria.dob);
        }
        if (criteria.mobileNo) {
            conditions.push("mobile_no = ?");
            params.push(criteria.mobileNo);
        }
    
        sql += " " + conditions.join(" AND ");
    
        return db.query(sql, params);
    }
    

}

export default Record;
// Record.findALL();