import db from '../config/database.js';

class anyQuery {
  static async retrievalQuery(query) {
    return db.query(query);
  }

//    Personnel
//    Prisoners
//    Personnel Manages
//    Visitor log
//    Prisoner Jobs
//    Prisoner Court Cases
  static async tablesRetrieval(table) {
    let query;
    switch (table) {
      case 'personnel':
        query = "SELECT * FROM personnel";
        break;
      case 'prisoners':
        query = "SELECT * FROM prisoner";
        break;
        case 'manages':
        query = "SELECT * FROM manages";
        break;
        case 'visitor':
        query = "SELECT * FROM visitor";
        break;
        case 'work':
        query = "SELECT * FROM work";
        break;
        case 'courtcase':
        query = "SELECT * FROM court_case";
        break;

      default:
        query = '';
    }
    if (query) {
      return db.query(query);
    } else {
      return Promise.reject('Invalid table name.');
    }
  }
}

export default anyQuery;
