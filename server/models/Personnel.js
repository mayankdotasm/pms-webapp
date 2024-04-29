// Import the database connection
import db from '../config/database.js';

class Personnel {
    static async getAllPersonnel() {
        return db.query("SELECT * FROM personnel");
    }

    static async findPersonnelById(id) {
        return db.query("SELECT * FROM personnel WHERE Officer_ID = ?", [id]);
    }

    static async findPersonnelByDetails(details) {
        
        let sql = "SELECT * FROM personnel WHERE 1 = 1";
        const params = [];

        if (details.fname) {
            sql += " AND Fname = ?";
            params.push(details.fname);
        }
        if (details.lname) {
            sql += " AND Lname = ?";
            params.push(details.lname);
        }
        if (details.dob) {
            sql += " AND DOB = ?";
            params.push(details.dob);
        }
        if (details.ssn) {
            sql += " AND SSN = ?";
            params.push(details.doi);
        }
        if (details.title) {
            sql += " AND Title = ?";
            params.push(details.title);
        }
        if (details.supid) {
            sql += " AND Supervisor_ID = ?";
            params.push(details.supid);
        }
        
        return db.query(sql, params);
    }

}

export default Personnel;
