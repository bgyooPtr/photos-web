import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';

const getImageMetadata = (req: NextApiRequest, res: NextApiResponse) => {
  const { imagePath } = req.query;
  const fullPath = path.join('.', imagePath as string);

  fs.stat(fullPath, (err, stats) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read file' });
      return;
    }
    const dimensions = sizeOf(fullPath);
    res.status(200).json({
      size: stats.size,
      dimensions: dimensions
    });
  });
};

export default getImageMetadata;
