import { Box, Container, Typography, Button, Card, CardContent, Grid, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SchoolIcon from '@mui/icons-material/School';
import LockIcon from '@mui/icons-material/Lock';
import { useApp } from '../context/AppContext';

const KidHome = () => {
  const navigate = useNavigate();
  const { currentChild, isParentUnlocked } = useApp();

  if (!currentChild) {
    navigate('/kid/login');
    return null;
  }

  const handleBackToParent = () => {
    if (isParentUnlocked) {
      navigate('/parent');
    } else {
      navigate('/parent/login');
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        {/* Greeting */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography sx={{ fontSize: '5rem', mb: 2 }}>
            {currentChild.avatar}
          </Typography>
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 700, color: 'primary.main' }}>
            Hi, {currentChild.name.replace(' (Demo)', '')}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ready to practice some math?
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={4}>
            <Card sx={{ bgcolor: '#FFE5E5', textAlign: 'center' }}>
              <CardContent>
                <Typography sx={{ fontSize: '2rem', mb: 0.5 }}>🔥</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#FF6B6B' }}>
                  {currentChild.streak}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Day Streak
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ bgcolor: '#E5F6FF', textAlign: 'center' }}>
              <CardContent>
                <Typography sx={{ fontSize: '2rem', mb: 0.5 }}>✅</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#2196F3' }}>
                  {currentChild.accuracy}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Accuracy
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ bgcolor: '#FFF9E5', textAlign: 'center' }}>
              <CardContent>
                <Typography sx={{ fontSize: '2rem', mb: 0.5 }}>⭐</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#FFA000' }}>
                  {currentChild.level}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Level
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Actions */}
        <Card
          sx={{
            mb: 3,
            background: 'linear-gradient(135deg, #9C27B0 0%, #E1BEE7 100%)',
            color: 'white',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
              Today's Practice 🎯
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.95 }}>
              Complete 10 problems to keep your streak going!
            </Typography>
            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<PlayArrowIcon />}
              onClick={() => navigate('/kid/session')}
              sx={{
                bgcolor: 'white',
                color: '#9C27B0',
                fontSize: '1.2rem',
                py: 2,
                '&:hover': {
                  bgcolor: '#FFD700',
                  color: 'white',
                },
              }}
            >
              Start Today's Session
            </Button>
          </CardContent>
        </Card>

        {/* Practice Free Play */}
        <Button
          variant="outlined"
          size="large"
          fullWidth
          startIcon={<SchoolIcon />}
          onClick={() => navigate('/practice')}
          sx={{
            mb: 4,
            py: 1.5,
            borderColor: '#9C27B0',
            color: '#9C27B0',
            '&:hover': {
              borderColor: '#7B1FA2',
              bgcolor: 'rgba(156, 39, 176, 0.05)',
            },
          }}
        >
          Practice Free Play
        </Button>

        {/* Back to Parent Button */}
        <Box sx={{ textAlign: 'center', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            variant="text"
            size="small"
            startIcon={<LockIcon />}
            onClick={handleBackToParent}
            sx={{
              color: 'text.secondary',
              fontSize: '0.9rem',
            }}
          >
            Parent? Tap here
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default KidHome;
