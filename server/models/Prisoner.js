import db from '../config/database.js';

class Prisoner {
    static async getAllPrisoners() {
        return db.query("SELECT * FROM Case_Prisoner_Cell_View");
    }

    static async findPrisonerById(id) {
        const numericId = parseInt(id, 10); 
        return db.query("SELECT * FROM Case_Prisoner_Cell_View WHERE Prisoner_ID like'%?%'", [numericId]);
    }

    static async findPrisonersByDetails(details) {
        let sql = "SELECT * FROM Case_Prisoner_Cell_View WHERE";
        const params = [];

        let conditions = [];

        if (details.fname) {
            conditions.push("Fname = ?");
            params.push(details.fname);
        }
        if (details.lname) {
            conditions.push("Lname = ?");
            params.push(details.lname);
        }
        if (details.gender) {
            conditions.push("Gender = ?");
            params.push(details.gender);
        }
        if (details.dob) {
            conditions.push("DOB = ?");
            params.push(details.dob);
        }
        if (details.doi) {
            conditions.push("Date_of_IN = ?");
            params.push(details.doi);
        }
        if (details.caseId) {
            conditions.push("Case_ID = ?");
            params.push(details.caseId);
        }
        if (details.cellNo) {
            conditions.push("CELL = ?");
            params.push(details.cellNo);
        }
        if (details.floorNo) {
            conditions.push("Floor_No = ?");
            params.push(details.floorNo);
        }

        if (conditions.length === 0) {
            // If no conditions are provided, return an empty array
            return [];
        }

        sql += " " + conditions.join(" AND ");

        const result = await db.query(sql, params);

        if (result.length === 0) {
            return -1; // Return -1 if no records are found
        }

        return result;
    }
}

export default Prisoner;
