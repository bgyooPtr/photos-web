import { exiftool } from 'exiftool-vendored';
import * as formidable from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import sharp from 'sharp';
import pool from '../../lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Request received:', req.method.toLowerCase(), req.url);

  if (req.method.toLowerCase() === 'post') {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
      multiples: true,
      createDirsFromUploads: true,
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
          console.error('File upload failed:', file);
          return res.status(400).json({ error: 'File upload failed' });
        }

        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        const thumbnailsDir = path.join(uploadsDir, 'thumbnails');

        // Ensure the directories exist
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        if (!fs.existsSync(thumbnailsDir)) {
          fs.mkdirSync(thumbnailsDir, { recursive: true });
        }

        let fileName = file.originalFilename;
        let filePath = path.join(uploadsDir, file.originalFilename);
        const thumbnailFilePath = path.join(
          thumbnailsDir,
          `${path.basename(file.originalFilename, path.extname(file.originalFilename))}.jpg`,
        );
        const _tmpFilePath = path.join(uploadsDir, 'tmp.jpg');

        try {
          // Extract metadata using exiftool
          const metadata = await exiftool.read(file.filepath);

          // Read the orientation
          const orientation = metadata.Orientation;

          // Rotate the image based on the orientation
          let angle = 0;
          switch (orientation) {
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

          // Create and save the thumbnail
          fs.renameSync(file.filepath, _tmpFilePath);

          // await exiftool.extractThumbnail(originalFilePath, _tmpFilePath);
          await sharp(_tmpFilePath)
            // .resize({ width: 300 }) // Change the width as per your configuration
            .rotate(angle)
            .toFile(thumbnailFilePath);

          // Check if the file is in raw format
          const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
          const fileExtension = path.extname(_tmpFilePath).toLowerCase();

          if (!validExtensions.includes(fileExtension)) {
            // Load the raw file and extract the jpg
            await exiftool.extractJpgFromRaw(file.filepath, _tmpFilePath);

            // Rename the temporary file
            fileName = `${path.parse(fileName).name}.jpg`;
            filePath = path.join(uploadsDir, fileName);

            // Save the jpg file as original file
            await sharp(_tmpFilePath).rotate(angle).toFile(filePath);
          }
          // Delete the temporary file
          fs.unlinkSync(_tmpFilePath);

          // Save file information to the database
          const query = 'INSERT INTO images (name, path, metadata) VALUES (?, ?, ?)';
          const values = [fileName, `/uploads/${fileName}`, JSON.stringify(metadata)];
          await pool.query(query, values);

          console.log('Files saved:', { originalFilePath: filePath, thumbnailFilePath });
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
