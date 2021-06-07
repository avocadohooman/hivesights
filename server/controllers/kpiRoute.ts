import express from 'express';
import pool from '../db';
import { KPI } from '../types/kpis';

const kpiRouter = express.Router();

// Setting tables depending on NODE_ENV

// Get all key kpis
