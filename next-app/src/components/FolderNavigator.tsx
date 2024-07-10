import { useEffect, useState } from 'react';

const FolderNavigator = ({ onSelect }: { onSelect: (folder: string) => void }) => {
  const [folders, setFolders] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/getFolders')
      .then(response => response.json())
      .then(data => setFolders(data));
  }, []);

  return (
    <select onChange={(e) => onSelect(e.target.value)} className="p-2 border rounded">
      <option value="">Select a folder</option>
      {folders.map(folder => (
        <option key={folder} value={folder}>{folder}</option>
      ))}
    </select>
  );
};

export default FolderNavigator;
