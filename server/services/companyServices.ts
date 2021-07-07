/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NewCompany } from '../types/company';
import pool from '../db';

// checking if company already exists in DB and returning true if yes, else false
const checkDuplicate = async (newCompany: NewCompany, companyTable: string) => {
    const name = newCompany.companyName;
    const duplicate = await pool.query(`SELECT companyname FROM ${companyTable} WHERE LOWER(companyname) = ($1)`, [name.toLocaleLowerCase()]);
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

// checking if company exsists
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

// getting ID from request for reviews and parsing it
const requestParamsId = (req: any, res: any, next: any) => {
    if (req.params && req.params.id && typeof req.params.id === "string") {
      const num = Number(req.params.id);
      if (!isNaN(num)) {
        req.params.id = Number(req.params.id);
      }
    }
};

// adding a new company to DB
const addCompany = async (newCompany: NewCompany, companyTable: string) => {
  await pool.query(`INSERT INTO ${companyTable} 
  (companyName, companyDescription, logoURL, companyURL, companyLocation)
  VALUES
  ($1, $2, $3, $4, $5)
  RETURNING *`, 
  [
      newCompany.companyName,
      newCompany.companyDescription,
      newCompany.logoURL,
      newCompany.companyURL,
      newCompany.companyLocation
  ]);
};

export default {
    checkDuplicate,
    requestParamsId,
    checkIfExists,
    addCompany
};