import { Grid, Container, Typography, Box } from '@mui/material';
import BadgeCard from './BadgeCard';

const RewardsGrid = ({ badges = [] }) => {
  const earnedCount = badges.filter((b) => b.earned).length;

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
