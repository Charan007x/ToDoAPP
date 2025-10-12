import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from './AuthContext';

function OAuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Save token
      login(token);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      // If no token, redirect to login
      navigate('/login');
    }
  }, [searchParams, navigate, login]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#000',
      color: '#00ffff',
      fontFamily: "'Orbitron', sans-serif"
    }}>
      <div>
        <h2>Authenticating...</h2>
        <p>Please wait while we log you in</p>
      </div>
    </div>
  );
}

export default OAuthSuccess;
