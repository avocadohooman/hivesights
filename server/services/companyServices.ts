import { NewCompany } from '../types/company';
import pool from '../db';

const checkDuplicate = async (newCompany: NewCompany, companyTable: string) => {
    const name = newCompany.companyName;
    const duplicate = await pool.query(`SELECT companyname FROM ${companyTable} WHERE LOWER(companyname) = ($1)`, [name.toLocaleLowerCase()]);
    console.log("DUPLOCATE", duplicate);
    if (duplicate.rowCount > 0) {
      if (duplicate.rows[0].companyname.toLowerCase() === name.toLocaleLowerCase()) {
        console.log("Duplicate", duplicate.rowCount > 0);
        return 0;
      }
      console.log("Duplicate", duplicate.rowCount > 0);
      return 0;
    }
    return 1;
};

const checkIfExists = async (id: any, companyTable: string) => {
  console.log("checkIfExists");
  const company = 
    await pool.query(`SELECT companyname FROM ${companyTable} WHERE id = ($1)`, [id])
    .catch((e:any) => {
      if (e) {
        console.log("ERROR");
        return 0;
      }
    });
  if (company.rowCount === 0) {
    return 0;
  }
  return 1;
};

const requestParamsId = (req: any, res: any, next: any) => {
    if (req.params && req.params.id && typeof req.params.id === "string") {
      const num = Number(req.params.id);
      if (!isNaN(num)) {
        req.params.id = Number(req.params.id);
      }
    }
};

export default {
    checkDuplicate,
    requestParamsId,
    checkIfExists
};