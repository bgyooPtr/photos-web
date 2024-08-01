import path from 'path';
import fs from 'fs';
import * as formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public/uploads');

fs.mkdirSync(uploadDir, { recursive: true });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Request received:', req.method.toLowerCase(), req.url);

  if (req.method.toLowerCase() === 'post') {
    const form = new formidable.IncomingForm({
      uploadDir,
      keepExtensions: true,
    });

    form.on('fileBegin', (name, file) => {
      console.log('File upload started:', name, file);
    });

    form.on('file', (name, file) => {
      console.log('File uploaded:', name, file);
    });

    form.on('error', (err) => {
      console.error('Formidable error:', err);
    });

    form.parse(req, async (err, fields, files) => {
      console.log('in parse');
      if (err) {
        console.error('Parse error:', err);
        return res.status(500).json({ error: err.message });
      }

      files.file.forEach(async (file) => {
        if (!file || !file.originalFilename || !file.filepath) {
          console.error('File upload failed:', file);
          return res.status(400).json({ error: 'File upload failed' });
        }

        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const fileExtension = path.extname(file.originalFilename).toLowerCase();

        if (!validExtensions.includes(fileExtension)) {
          console.error('Invalid file type:', fileExtension);
          return res.status(400).json({ error: 'Invalid file type' });
        }

        // TODO
        const metadata = {};

        const query = 'INSERT INTO images (name, path, metadata) VALUES (?, ?, ?)';
        const values = [file.originalFilename, file.filepath, JSON.stringify(metadata)];

        try {
          await pool.query(query, values);
          console.log('File successfully processed:', file.originalFilename);
          res.status(200).json({ message: 'File uploaded successfully' });
        } catch (dbError) {
          console.error('Database error:', dbError);
          res.status(500).json({ error: 'Database error' });
        }
      });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;