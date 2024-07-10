import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { imageRoot } from '../config';

const getImages = (req: NextApiRequest, res: NextApiResponse) => {
  const { folderPath } = req.query;
  const fullPath = path.join(imageRoot, folderPath as string);

  const getAllImages = (dir: string, filesList: string[] = []) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        getAllImages(filePath, filesList);
      } else if (file.endsWith('.jpg') || file.endsWith('JPG')) {
        filesList.push(filePath.replace(imageRoot, '').replace(/\\/g, '/'));
      }
    });
    return filesList;
  };

  try {
    console.log(fullPath);
    const images = getAllImages(fullPath);
    console.log(images);
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read directory' });
  }
};

export default getImages;
