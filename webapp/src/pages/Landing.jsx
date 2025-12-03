import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Landing = () => {
  const navigate = useNavigate();
  const { enterDemoMode } = useApp();

  const handleTryDemo = () => {
    enterDemoMode();
    navigate('/kid/login');
  };

  const handleParentLogin = () => {
    navigate('/parent/login');
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #9C27B0 0%, #E1BEE7 50%, #FFD700 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating math symbols */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          fontSize: '4rem',
          opacity: 0.3,
          animation: 'float 6s ease-in-out infinite',
        }}
      >
        +
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          fontSize: '5rem',
          opacity: 0.3,
          animation: 'float 8s ease-in-out infinite',
        }}
      >
        ×
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '20%',
          fontSize: '4.5rem',
          opacity: 0.3,
          animation: 'float 7s ease-in-out infinite',
        }}
      >
        ÷
      </Box>

      <Container maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            borderRadius: 4,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Logo/Icon */}
          <Box
            sx={{
              fontSize: '5rem',
              mb: 2,
              animation: 'bounce 2s ease-in-out infinite',
            }}
          >
            🦉
          </Box>

          {/* Title */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              color: '#9C27B0',
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            MathBloom
          </Typography>

          {/* Tagline */}
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.3rem' },
            }}
          >
            Daily math practice that actually sticks! ✨
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleTryDemo}
              sx={{
                bgcolor: '#2196F3',
                fontSize: '1.2rem',
                py: 2,
                '&:hover': {
                  bgcolor: '#1976D2',
                },
              }}
            >
              Try Demo
            </Button>

            <Button
              variant="contained"
              size="large"
              onClick={handleParentLogin}
              sx={{
                bgcolor: '#9C27B0',
                fontSize: '1.2rem',
                py: 2,
                '&:hover': {
                  bgcolor: '#7B1FA2',
                },
              }}
            >
              Parent Login
            </Button>
          </Box>

          {/* Info Text */}
          <Typography
            variant="body2"
            sx={{
              mt: 3,
              color: 'text.secondary',
              fontSize: '0.9rem',
            }}
          >
            Demo uses sample data only. Parent login stores your family setup on this device.
          </Typography>
        </Paper>
      </Container>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </Box>
  );
};

export default Landing;
