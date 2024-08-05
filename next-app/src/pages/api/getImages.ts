import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';
import { Image } from '../../models/Image';
import { parseImageResponse } from '../../utils/parseImageResponse';

const handler = async (req: NextApiRequest, res: NextApiResponse<{ data: Image[] | undefined; message?: string }>) => {
  console.log('Request received:', req.method, req.url);
  if (req.method === 'GET') {
    const query = 'SELECT * FROM images';

    try {
      const [rows] = await pool.query(query);
      const images: Image[] = parseImageResponse(rows);
      res.status(200).json({ data: images });
    } catch (error) {
      res.status(500).json({ data: [], message: error.message });
    }
  } else {
    res.status(405).json({ data: [], message: 'Method not allowed' });
  }
};

export default handler;
