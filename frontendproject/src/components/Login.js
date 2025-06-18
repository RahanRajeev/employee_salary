import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [logname, setlogname] = useState('');
  const [logpassword, setlogpassword] = useState('');
  const [googleProfile, setGoogleProfile] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);
  
  const navlog = useNavigate();

  const loginn = async (e) => {
    e.preventDefault();

    if (!logname || !logpassword) {
      alert('Please fill in all fields');
      return;
    }

    const res = await axios.post('https://employee-salary-1.onrender.com/user/login', { logname, logpassword });
    console.log(res.data.uid);
    if (res.data.status === 'ok') {
      sessionStorage.setItem('uid', res.data.uid);
      navlog('/user');
    } else if (res.data.status === 'admin') {
      sessionStorage.setItem('uid', res.data.uid);
      navlog('/admin');
    } else {
      alert('Incorrect username or password');
      navlog('/');
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => setGoogleUser(tokenResponse),
    onError: (error) => console.log('Google Login Failed:', error),
  });

  useEffect(() => {
    if (googleUser) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
          headers: {
            Authorization: `Bearer ${googleUser.access_token}`,
            Accept: 'application/json',
          },
        })
        .then(async (response) => {
          const profile = response.data;

          // Send this profile data to backend to save or authenticate
          const backendResponse = await axios.post('https://employee-salary-1.onrender.com/user/googlelogin', {
            name: profile.name,
            email: profile.email,
            googleId: profile.id,
            picture: profile.picture,
          });

          if (backendResponse.data.status === 'ok') {
            sessionStorage.setItem('uid', backendResponse.data.uid);
            navlog('/user');
          } else {
            alert('Google login failed. Please try again.');
          }
        })
        .catch((err) => console.log('Error fetching profile:', err));
    }
  }, [googleUser]);

  const logOut = () => {
    googleLogout();
    setGoogleUser(null);
  };

  return (
    <>
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh', background: '#f0f4f8' }}>
        <Card
          style={{
            width: '400px',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff',
          }}
        >
          <h3 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#333' }}>
            Welcome Back!
          </h3>

          <Form onSubmit={loginn}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setlogname(e.target.value)}
                value={logname}
                required
                style={{ borderRadius: '8px' }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setlogpassword(e.target.value)}
                value={logpassword}
                required
                style={{ borderRadius: '8px' }}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3" style={{ borderRadius: '8px', fontWeight: 'bold' }}>
              Login
            </Button>
          </Form>

          <div className="text-center text-muted mb-3">Or continue with</div>

          {!googleUser ? (
            <Button variant="outline-success" className="w-100" onClick={loginWithGoogle} style={{ borderRadius: '8px', fontWeight: 'bold' }}>
              Sign in with Google
            </Button>
          ) : (
            <Card className="p-3 text-center" style={{ backgroundColor: '#e9ecef', borderRadius: '12px' }}>
              <img src={googleUser.picture} alt="User " style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
              <h5 className="mt-2 mb-1">{googleUser.name}</h5>
              <p className="text-muted mb-3">{googleUser.email}</p>
              <Button variant="outline-danger" size="sm" onClick={logOut}>
                Log Out
              </Button>
            </Card>
          )}
        </Card>
      </Container>
    </>
  );
};

export default Login;
