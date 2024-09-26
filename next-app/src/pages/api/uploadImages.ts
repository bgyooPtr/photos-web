import { NextApiRequest, NextApiResponse } from 'next';
import { ExifTool } from 'exiftool-vendored';
import * as formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import pool from '../../lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

let exiftool = new ExifTool({ taskTimeoutMillis: 5000 });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  if (req.method.toLowerCase() === 'post') {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
      multiples: true,
      uploadDir: uploadsDir,
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
      if (err) {
        console.error('Parse error:', err);
        return res.status(500).json({ error: err.message });
      }

      const uploadedFiles = Array.isArray(files.file) ? files.file : [files.file];

      for (const file of uploadedFiles) {
        if (!file || !file.originalFilename || !file.filepath) {
          continue;
        }

        try {
          if (exiftool.ended) {
            exiftool = new ExifTool({ taskTimeoutMillis: 5000 });
          }

          const thumbnailsDir = path.join(uploadsDir, 'thumbnails');

          // Ensure the directories exist
          // name: file.originalFilename
          // path: file.filepath
          // "/home/bgyoo/workspace/photos-web/next-app/public/uploads/ba80ffdb52272749401e66500.png"

          if (!fs.existsSync(thumbnailsDir)) {
            fs.mkdirSync(thumbnailsDir, { recursive: true });
          }

          const name = file.originalFilename;

          let fileName = path.basename(file.newFilename); // <hashed-filename>.<ext>
          let filePath = path.join(uploadsDir, fileName); // /uploads/<hashed-filename>.<ext>

          const thumbnailFilePath = path.join(
            thumbnailsDir,
            `${path.basename(fileName, path.extname(fileName))}.jpg`, // /uploads/thumbnails/<hashed-filename>.jpg
          );
          fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
              console.error('File does not exist:', filePath);
              return res.status(404).json({ error: 'File does not exist' });
            } else {
              console.log('File exists:', filePath);
            }
          });

          // Extract metadata using exiftool
          const metadata = await exiftool.read(file.filepath);

          let angle = 0;
          switch (metadata.Orientation) {
            case 3:
              angle = 180;
              break;
            case 6:
              angle = 90;
              break;
            case 8:
              angle = -90;
              break;
            default:
              angle = 0;
          }

          // Temporary file path for raw files, rotation, etc.
          const _tmpFilePath = path.join(uploadsDir, 'tmp.jpg');

          const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
          const fileExtension = path.extname(filePath).toLowerCase();

          if (!validExtensions.includes(fileExtension)) {
            await exiftool.extractJpgFromRaw(filePath, _tmpFilePath);

            // Rename the temporary file
            fileName = `${path.parse(fileName).name}.jpg`;
            filePath = path.join(uploadsDir, fileName);
          } else {
            fs.renameSync(filePath, _tmpFilePath);
          }
          await sharp(_tmpFilePath).rotate(angle).toFile(filePath);
          await sharp(_tmpFilePath).resize({ width: 300 }).rotate(angle).toFile(thumbnailFilePath);

          fs.unlinkSync(_tmpFilePath);

          // Save file information to the database
          const query = 'INSERT INTO images (name, path, metadata) VALUES (?, ?, ?)';
          const values = [name, `/uploads/${fileName}`, JSON.stringify(metadata)];
          await pool.query(query, values);

          console.debug('Files saved:', { originalFilePath: filePath, thumbnailFilePath });
        } catch (error) {
          console.error('Error processing file:', error);
          return res.status(500).json({ error: 'Error processing file' });
        }
      }
      res.status(200).json({ message: 'File uploaded successfully' });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
