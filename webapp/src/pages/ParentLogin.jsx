import { useState } from 'react';
import { Box, Container, Typography, Paper, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import { useApp } from '../context/AppContext';

const ParentLogin = () => {
  const navigate = useNavigate();
  const { unlockParent, enterDemoMode } = useApp();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (unlockParent(pin)) {
      navigate('/parent');
    } else {
      setError('Incorrect PIN. Please try again.');
    }
  };

  const handleDemoMode = () => {
    enterDemoMode();
    navigate('/kid/login');
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              textAlign: 'center',
              mb: 3,
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                p: 2,
                borderRadius: '50%',
                bgcolor: 'rgba(156, 39, 176, 0.1)',
              }}
            >
              <LockIcon sx={{ fontSize: '3rem', color: '#9C27B0' }} />
            </Box>
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              mb: 1,
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            Parent Login
          </Typography>

          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mb: 4,
              color: 'text.secondary',
            }}
          >
            Enter your PIN to access the parent dashboard
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {/* PIN Input */}
          <TextField
            fullWidth
            type="password"
            label="Parent PIN"
            variant="outlined"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleLogin();
            }}
            inputProps={{
              maxLength: 6,
              pattern: '[0-9]*',
            }}
            sx={{ mb: 3 }}
          />

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            disabled={pin.length < 4}
            sx={{
              mb: 2,
              py: 1.5,
              fontSize: '1.1rem',
              bgcolor: '#9C27B0',
              '&:hover': {
                bgcolor: '#7B1FA2',
              },
            }}
          >
            Unlock Parent Mode
          </Button>

          {/* Demo Mode Link */}
          <Button
            fullWidth
            variant="text"
            onClick={handleDemoMode}
            sx={{
              color: 'text.secondary',
            }}
          >
            Use Demo Mode Instead
          </Button>

          {/* Help Text */}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              mt: 3,
              color: 'text.secondary',
            }}
          >
            First time? Default PIN is 1234. Change it in Settings.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default ParentLogin;
