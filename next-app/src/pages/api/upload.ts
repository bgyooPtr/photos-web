import path from 'path';
import fs from 'fs';
import * as formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

const uploadDir = path.join(process.cwd(), 'public/uploads');

fs.mkdirSync(uploadDir, { recursive: true });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Request received:', req.method.toLowerCase(), req.url);
  if (req.method.toLowerCase() === 'post') {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

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
        return res.status(500).json({ error: err.message });
      }

      const file = files.file as formidable.File;

      if (!file || !file.originalFilename || !file.filepath) {
        return res.status(400).json({ error: 'File upload failed' });
      }

      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const fileExtension = path.extname(file.originalFilename).toLowerCase();

      if (!validExtensions.includes(fileExtension)) {
        return res.status(400).json({ error: 'Invalid file type' });
      }

      // TODO
      const metadata = {};

      const query = 'INSERT INTO images (name, path, metadata) VALUES (?, ?, ?)';
      const values = [file.originalFilename, file.filepath, JSON.stringify(metadata)];

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
  console.log('done');
};

export default handler;