import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './RecentFiles.module.css';

interface File {
  id: string;
  name: string;
  webUrl: string;
  lastModifiedDateTime: string;
}

const RecentFiles: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentFiles = async () => {
      try {
        // Retrieve the access token from localStorage
        const accessToken = localStorage.getItem('access_token');
        
        if (!accessToken) {
          setError('Access token is missing. Please authenticate first.');
          return;
        }

        // Microsoft Graph API endpoint for recent files
        const response = await axios.get('https://graph.microsoft.com/v1.0/me/drive/recent', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Extract the list of recent files
        setFiles(response.data.value);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch recent files');
      }
    };

    // Fetch recent files when the component mounts
    fetchRecentFiles();
  }, []);

  if (error) {
    return <div className={styles.container}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Recent Files</h2>
      {files.length === 0 ? (
        <p>No recent files found.</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              <a href={file.webUrl} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
              <br />
              <small>Last modified: {new Date(file.lastModifiedDateTime).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentFiles;
