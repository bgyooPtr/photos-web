import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
    console.log(event.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles) return;

    const formData = new FormData();
    const validExtensions = ['image/jpeg', 'image/png', 'image/gif'];

    Array.from(selectedFiles).forEach(file => {
      if (validExtensions.includes(file.type)) {
        formData.append('file', file);
      }
    });
    for (let value of formData.values()) {
      console.log(value);
    }

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Upload successful');
    } else {
      alert('Upload failed');
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload;