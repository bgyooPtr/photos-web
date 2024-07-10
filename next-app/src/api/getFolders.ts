import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { imageRoot } from '../config';

const getFolders = (req: NextApiRequest, res: NextApiResponse) => {
  fs.readdir(imageRoot, (err, files) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read directory' });
      return;
    }
    const folders = files.filter(file => fs.statSync(path.join(imageRoot, file)).isDirectory());
    res.status(200).json(folders);
  });
};

export default getFolders;
