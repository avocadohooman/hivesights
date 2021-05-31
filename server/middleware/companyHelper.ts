import { NewCompany } from '../types/company';
import pool from '../db';

const checkDuplicate = async () => {
    const duplicate = await pool.query('SELECT companyname,count(*) FROM company_test GROUP BY companyname HAVING count(*) > 1');
    if (duplicate.rows[0] && duplicate.rows[0].count > 1) {
      console.log("Duplicate", duplicate.rows[0].count > 1);
      return 0;
    }
    return 1;
}

const requestParamsId = (req: any, res: any, next: any) => {
    if (req.params && req.params.id && typeof req.params.id === "string") {
      let num = Number(req.params.id);
      if (!isNaN(num)) {
        req.params.id = Number(req.params.id);
      }
    }
}

export default {
    checkDuplicate,
    requestParamsId
}