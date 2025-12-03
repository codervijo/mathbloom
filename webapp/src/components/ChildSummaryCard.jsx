import { Card, CardContent, Box, Typography, Button, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LoginIcon from '@mui/icons-material/Login';

const ChildSummaryCard = ({ child, onViewDetails, onLoginAsKid }) => {
  const lastSession = child.sessions[0];
  const lastSessionDate = lastSession ? new Date(lastSession.date).toLocaleDateString() : 'No sessions yet';

  return (
    <Card
      sx={{
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ fontSize: '3rem' }}>{child.avatar}</Typography>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {child.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Level {child.level}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip
            label={`${child.streak} day streak 🔥`}
            size="small"
            sx={{ bgcolor: '#FFE5E5', color: '#FF6B6B', fontWeight: 600 }}
          />
          <Chip
            label={`${child.accuracy}% accuracy`}
            size="small"
            sx={{ bgcolor: '#E5F6FF', color: '#2196F3', fontWeight: 600 }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Last session: {lastSessionDate}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={() => onLoginAsKid(child)}
            sx={{
              bgcolor: '#2196F3',
              '&:hover': {
                bgcolor: '#1976D2',
              },
            }}
          >
            Login as Kid
          </Button>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            startIcon={<TrendingUpIcon />}
            onClick={() => onViewDetails(child)}
            sx={{
              borderColor: '#9C27B0',
              color: '#9C27B0',
              '&:hover': {
                borderColor: '#7B1FA2',
                bgcolor: 'rgba(156, 39, 176, 0.05)',
              },
            }}
          >
            Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChildSummaryCard;
