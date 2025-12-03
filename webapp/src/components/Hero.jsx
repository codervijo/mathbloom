import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 50%, #FFD700 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating circles decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255, 215, 0, 0.3)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            color: 'white',
            py: 8,
          }}
        >
          {/* Mascot Owl */}
          <Box
            sx={{
              fontSize: '8rem',
              mb: 2,
              animation: 'bounce 2s ease-in-out infinite',
            }}
          >
            🦉
          </Box>
          
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 800,
              mb: 2,
              color: 'white',
              textShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            Turn Numbers into Adventures!
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              color: 'rgba(255,255,255,0.95)',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Learn math through fun games, earn badges, and become a math hero! 🌟
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<RocketLaunchIcon />}
              onClick={() => navigate('/dashboard')}
              sx={{
                bgcolor: 'white',
                color: '#2196F3',
                fontSize: '1.3rem',
                py: 2,
                px: 5,
                '&:hover': {
                  bgcolor: '#FFD700',
                  color: 'white',
                },
              }}
            >
              Start Learning
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/parent-login')}
              sx={{
                borderColor: 'white',
                color: 'white',
                fontSize: '1.3rem',
                py: 2,
                px: 5,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white',
                },
              }}
            >
              Parent Login
            </Button>
          </Box>
          
          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
            {['🎯 Fun Challenges', '⭐ Earn Badges', '📊 Track Progress'].map((feature, index) => (
              <Box
                key={index}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  p: 2,
                  px: 3,
                }}
              >
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                  {feature}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
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

export default Hero;
