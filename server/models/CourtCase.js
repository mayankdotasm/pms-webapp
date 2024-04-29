// Import the database connection
import db from '../config/database.js';

class CourtCase {
    static async getAllCases() {
        return db.query("SELECT * FROM court_case");
    }

    // Add more methods as needed
}

export default CourtCase;
