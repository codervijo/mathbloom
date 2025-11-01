import { Box, Container, Typography, Grid, Card, CardContent, LinearProgress, Chip } from '@mui/material';
import StatCard from './StatCard';

const ParentDashboard = () => {
  // Mock data
  const childStats = {
    totalProblems: 156,
    correctAnswers: 142,
    accuracy: 91,
    streak: 7,
    badges: 12,
    level: 5,
    timeSpent: '12.5 hours',
    averageSpeed: '2.3 min/problem',
  };

  const recentActivity = [
    { date: 'Nov 1', topic: 'Multiplication', problems: 15, accuracy: 93, time: '25 min' },
    { date: 'Oct 31', topic: 'Division', problems: 12, accuracy: 88, time: '30 min' },
    { date: 'Oct 30', topic: 'Addition', problems: 20, accuracy: 95, time: '35 min' },
    { date: 'Oct 29', topic: 'Subtraction', problems: 18, accuracy: 90, time: '28 min' },
  ];

  const skillProgress = [
    { skill: 'Addition', progress: 95, color: '#4CAF50' },
    { skill: 'Subtraction', progress: 88, color: '#FF9800' },
    { skill: 'Multiplication', progress: 75, color: '#9C27B0' },
    { skill: 'Division', progress: 60, color: '#F44336' },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
            Parent Dashboard 👨‍👩‍👧
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your child's learning progress and achievements
          </Typography>
        </Box>

        {/* Overview Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} md={3}>
            <StatCard
              icon="📚"
              label="Problems Solved"
              value={childStats.totalProblems}
              color="#2196F3"
              bgColor="rgba(33, 150, 243, 0.1)"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatCard
              icon="✅"
              label="Accuracy"
              value={`${childStats.accuracy}%`}
              color="#4CAF50"
              bgColor="rgba(76, 175, 80, 0.1)"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatCard
              icon="🔥"
              label="Day Streak"
              value={childStats.streak}
              color="#FF9800"
              bgColor="rgba(255, 152, 0, 0.1)"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatCard
              icon="🏆"
              label="Badges Earned"
              value={childStats.badges}
              color="#FFD700"
              bgColor="rgba(255, 215, 0, 0.1)"
            />
          </Grid>
        </Grid>

        {/* Skill Progress */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
              Skill Progress 📊
            </Typography>
            <Grid container spacing={3}>
              {skillProgress.map((skill) => (
                <Grid item xs={12} sm={6} key={skill.skill}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {skill.skill}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {skill.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={skill.progress}
                      sx={{
                        height: 12,
                        borderRadius: 6,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: skill.color,
                          borderRadius: 6,
                        },
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
              Recent Activity 📈
            </Typography>
            <Grid container spacing={2}>
              {recentActivity.map((activity, index) => (
                <Grid item xs={12} key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      p: 2,
                      bgcolor: 'background.default',
                      borderRadius: 2,
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {activity.date} - {activity.topic}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.problems} problems • {activity.time}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label={`${activity.accuracy}% accuracy`}
                        color={activity.accuracy >= 90 ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Additional Stats */}
        <Grid container spacing={3} sx={{ mt: 0 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Learning Stats 📖
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Total Time</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{childStats.timeSpent}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Avg Speed</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{childStats.averageSpeed}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Current Level</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>Level {childStats.level}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: 'success.light', bgcolor: 'rgba(76, 175, 80, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Strengths 💪
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2">
                    ✓ Excellent at addition problems
                  </Typography>
                  <Typography variant="body2">
                    ✓ Consistently practices every day
                  </Typography>
                  <Typography variant="body2">
                    ✓ Shows improvement in multiplication
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ParentDashboard;
