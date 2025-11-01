import { Card, CardContent, Typography, Box } from '@mui/material';

const BadgeCard = ({ badge, earned = false }) => {
  return (
    <Card
      sx={{
        textAlign: 'center',
        opacity: earned ? 1 : 0.4,
        transform: earned ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <CardContent>
        {earned && (
          <Box
            sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              bgcolor: 'success.main',
              color: 'white',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
            }}
          >
            ✓
          </Box>
        )}
        
        <Box
          sx={{
            fontSize: '4rem',
            mb: 1,
            filter: earned ? 'none' : 'grayscale(100%)',
          }}
        >
          {badge.icon}
        </Box>
        
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
          {badge.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          {badge.description}
        </Typography>
        
        {earned && (
          <Typography
            variant="caption"
            sx={{
              mt: 1,
              display: 'block',
              color: 'success.main',
              fontWeight: 600,
            }}
          >
            Earned {badge.earnedDate}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default BadgeCard;
