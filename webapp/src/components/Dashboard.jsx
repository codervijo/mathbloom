import { Box, Container, Typography, Card, CardContent, Grid, LinearProgress, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data
  const streak = 7;
  const todayProgress = 60; // percentage
  const badges = 12;
  const level = 5;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Welcome Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
            Welcome back, Math Star! 🌟
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ready for today's challenge?
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: '#FFE5E5', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <LocalFireDepartmentIcon sx={{ fontSize: 48, color: '#FF6B6B', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#FF6B6B' }}>
                  {streak} Days
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Current Streak 🔥
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: '#FFF9E5', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <EmojiEventsIcon sx={{ fontSize: 48, color: '#FFD700', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#FFA000' }}>
                  {badges} Badges
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Collected 🏆
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: '#E5F6FF', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <TrendingUpIcon sx={{ fontSize: 48, color: '#2196F3', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#2196F3' }}>
                  Level {level}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Math Master 📈
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Today's Challenge */}
        <Card sx={{ mb: 4, bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>
                Today's Challenge 🎯
              </Typography>
              <Chip
                label={`${todayProgress}%`}
                sx={{ bgcolor: 'rgba(255,255,255,0.3)', color: 'white', fontWeight: 700 }}
              />
            </Box>
            
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.9)' }}>
              Solve 5 multiplication problems to earn the "Multiply Master" badge!
            </Typography>
            
            <LinearProgress
              variant="determinate"
              value={todayProgress}
              sx={{
                height: 12,
                borderRadius: 6,
                bgcolor: 'rgba(255,255,255,0.3)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#FFD700',
                  borderRadius: 6,
                },
                mb: 2,
              }}
            />
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/practice')}
                sx={{
                  bgcolor: 'white',
                  color: '#667eea',
                  '&:hover': { bgcolor: '#FFD700', color: 'white' },
                }}
              >
                Continue Challenge
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': { borderColor: '#FFD700', bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                View Rewards
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          What do you want to practice?
        </Typography>
        
        <Grid container spacing={3}>
          {[
            { title: 'Addition', emoji: '➕', color: '#4CAF50', problems: 25 },
            { title: 'Subtraction', emoji: '➖', color: '#FF9800', problems: 18 },
            { title: 'Multiplication', emoji: '✖️', color: '#9C27B0', problems: 20 },
            { title: 'Division', emoji: '➗', color: '#F44336', problems: 15 },
          ].map((topic) => (
            <Grid item xs={6} md={3} key={topic.title}>
              <Card
                onClick={() => navigate('/practice')}
                sx={{
                  cursor: 'pointer',
                  bgcolor: `${topic.color}15`,
                  borderLeft: `6px solid ${topic.color}`,
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontSize: '3rem', mb: 1 }}>{topic.emoji}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {topic.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {topic.problems} problems
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
