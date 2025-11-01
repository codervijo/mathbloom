import { Grid, Container, Typography, Box } from '@mui/material';
import BadgeCard from './BadgeCard';

const RewardsGrid = () => {
  const badges = [
    { id: 1, icon: '🏆', title: 'First Steps', description: 'Complete your first problem', earned: true, earnedDate: 'Oct 24' },
    { id: 2, icon: '⭐', title: 'Math Star', description: 'Get 10 correct answers', earned: true, earnedDate: 'Oct 25' },
    { id: 3, icon: '🔥', title: 'Hot Streak', description: '7 day practice streak', earned: true, earnedDate: 'Oct 30' },
    { id: 4, icon: '🎯', title: 'Perfect Score', description: 'Score 100% on a quiz', earned: true, earnedDate: 'Oct 26' },
    { id: 5, icon: '✖️', title: 'Multiply Master', description: 'Master multiplication', earned: false },
    { id: 6, icon: '➕', title: 'Addition Ace', description: 'Excel at addition', earned: true, earnedDate: 'Oct 23' },
    { id: 7, icon: '➗', title: 'Division Pro', description: 'Complete division course', earned: false },
    { id: 8, icon: '🚀', title: 'Speed Demon', description: 'Complete 20 problems in 5 min', earned: false },
    { id: 9, icon: '💎', title: 'Diamond League', description: 'Reach top 10 leaderboard', earned: false },
    { id: 10, icon: '🎓', title: 'Math Graduate', description: 'Complete all courses', earned: false },
    { id: 11, icon: '🌟', title: 'Superstar', description: 'Earn 20 badges', earned: false },
    { id: 12, icon: '👑', title: 'Math King', description: 'Reach level 10', earned: false },
  ];

  const earnedCount = badges.filter(b => b.earned).length;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
            Your Badges 🏆
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {earnedCount} / {badges.length} Collected
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {badges.map((badge) => (
            <Grid item xs={6} sm={4} md={3} key={badge.id}>
              <BadgeCard badge={badge} earned={badge.earned} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default RewardsGrid;
