import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../lib/db';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public/uploads');

fs.mkdirSync(uploadDir, { recursive: true });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const file = files.file as formidable.File;
      // TODO
      const metadata = {};

      const query = 'INSERT INTO images (name, path, metadata) VALUES (?, ?, ?)';
      const values = [file.name, file.path, JSON.stringify(metadata)];

      try {
        await pool.query(query, values);
        res.status(201).json({ message: 'File uploaded successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;