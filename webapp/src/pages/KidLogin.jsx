import { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Card, CardContent, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const KidLogin = () => {
  const navigate = useNavigate();
  const { family, selectChild, addChild, mode } = useApp();
  const [newName, setNewName] = useState('');

  const handleSelectChild = (child) => {
    selectChild(child.id);
    navigate('/kid');
  };

  const handleAddChild = () => {
    if (newName.trim()) {
      const avatars = ['👦', '👧', '🧒', '👶', '🧑'];
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
      
      const newChild = addChild({
        name: mode === 'demo' ? `${newName} (Demo)` : newName,
        avatar: randomAvatar,
      });
      
      selectChild(newChild.id);
      navigate('/kid');
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 50%, #FFD700 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              mb: 1,
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            Who's Learning Today? 🌟
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mb: 4,
              color: 'text.secondary',
            }}
          >
            Pick your name to start!
          </Typography>

          {/* Existing Children */}
          {family.children.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Choose Your Name:
              </Typography>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                {family.children.map((child) => (
                  <Grid item xs={6} sm={4} key={child.id}>
                    <Card
                      onClick={() => handleSelectChild(child)}
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontSize: '3rem', mb: 1 }}>
                          {child.avatar}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {child.name}
                        </Typography>
                        {child.streak > 0 && (
                          <Typography variant="body2" color="text.secondary">
                            🔥 {child.streak} day streak
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {/* Add New Child */}
          <Box
            sx={{
              bgcolor: 'rgba(156, 39, 176, 0.05)',
              borderRadius: 3,
              p: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Or Add Your Name:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField
                fullWidth
                label="What's your name?"
                variant="outlined"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleAddChild();
                }}
                sx={{ bgcolor: 'white' }}
              />
              <Button
                variant="contained"
                size="large"
                onClick={handleAddChild}
                disabled={!newName.trim()}
                sx={{
                  minWidth: { xs: '100%', sm: 120 },
                  bgcolor: '#9C27B0',
                  '&:hover': {
                    bgcolor: '#7B1FA2',
                  },
                }}
              >
                Continue
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default KidLogin;
