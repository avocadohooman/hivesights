import { NewCompany } from '../types/company';
import pool from '../db';

const checkDuplicate = async (newCompany: NewCompany, companyTable: string) => {
    const name = newCompany.companyName;
    const duplicate = await pool.query(`SELECT companyname FROM ${companyTable} WHERE companyname = ($1)`, [name]);
    if (duplicate.rowCount > 0) {
      console.log("Duplicate", duplicate.rowCount > 0);
      return 0;
    }
    return 1;
}

const checkIfExists = async (id: any, companyTable: string) => {
  console.log("checkIfExists");
  const company = 
    await pool.query(`SELECT companyname FROM ${companyTable} WHERE id = ($1)`, [id])
    .catch((e:any) => {
      if (e) {
        console.log("ERROR");
        return 0;
      }
    })
  if (!company) {
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
    requestParamsId,
    checkIfExists
}