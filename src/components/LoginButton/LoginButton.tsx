import styles from './LoginButton.module.css';

const LoginButton: React.FC = () => {
  const handleLogin = () => {
    const redirectUri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI); // Define your redirect URI here, should match what is in your backend
    const clientId = import.meta.env.VITE_CLIENT_ID; // Your client ID here
    const tenantId = import.meta.env.VITE_TENANT_ID; // Your tenant ID here
    //const scope = encodeURIComponent(import.meta.env.VITE_SCOPE); // Your tenant ID here
    const scope = 'https://graph.microsoft.com/.default';

    // Construct the authorization URL
    const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;

    console.log('Redirecting to authorization URL', authUrl);

    // Redirect to the authorization URL
    window.location.href = authUrl;
  };

  return (
    <div className={styles.container}>
      <button onClick={handleLogin}>Login with Microsoft</button>
    </div>
  );
};

export default LoginButton;
