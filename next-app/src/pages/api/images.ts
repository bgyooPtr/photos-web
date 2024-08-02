import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Request received:', req.method, req.url);
  if (req.method === 'GET') {
    const query = 'SELECT * FROM images';

    try {
      const [rows] = await pool.query(query);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
