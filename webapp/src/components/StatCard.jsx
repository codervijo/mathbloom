import { Card, CardContent, Typography, Box } from '@mui/material';

const StatCard = ({ icon, label, value, color = 'primary.main', bgColor = 'rgba(33, 150, 243, 0.1)' }) => {
  return (
    <Card sx={{ bgcolor: bgColor, height: '100%' }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Box sx={{ fontSize: '2.5rem', mb: 1 }}>{icon}</Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color, mb: 0.5 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
