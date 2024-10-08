import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelectedFiles(event.target.files);

  const handleUpload = async () => {
    if (!selectedFiles) return;

    const formData = new FormData();
    // const validExtensions = ["image/jpeg", "image/png", "image/gif"];

    Array.from(selectedFiles).forEach((file) => {
      // if (validExtensions.includes(file.type)) {
      formData.append('file', file as Blob);
      // }
    });

    const response = await fetch('/api/uploadImages', {
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
