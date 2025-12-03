import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { useApp } from '../context/AppContext';
import ChildSummaryCard from '../components/ChildSummaryCard';
import StatCard from '../components/StatCard';

const ParentDashboardNew = () => {
  const navigate = useNavigate();
  const { family, addChild, selectChild } = useApp();
  const [addChildDialog, setAddChildDialog] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [selectedChild, setSelectedChild] = useState(null);

  const totalChildren = family.children.length;
  const totalSessions = family.children.reduce((sum, child) => sum + child.sessions.length, 0);
  const avgAccuracy = family.children.length > 0
    ? Math.round(family.children.reduce((sum, child) => sum + child.accuracy, 0) / family.children.length)
    : 0;

  // Get recent activities from all children
  const recentActivities = family.children
    .flatMap(child =>
      child.sessions.map(session => ({
        ...session,
        childName: child.name,
        childAvatar: child.avatar,
      }))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  const handleAddChild = () => {
    if (newChildName.trim()) {
      const avatars = ['👦', '👧', '🧒', '👶', '🧑'];
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
      
      addChild({
        name: newChildName,
        avatar: randomAvatar,
      });
      
      setNewChildName('');
      setAddChildDialog(false);
    }
  };

  const handleViewDetails = (child) => {
    setSelectedChild(child);
  };

  const handleCloseDetails = () => {
    setSelectedChild(null);
  };

  const handleLoginAsKid = (child) => {
    selectChild(child.id);
    navigate('/kid');
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h3" sx={{ mb: 1, fontWeight: 700, color: 'primary.main' }}>
              Parent Dashboard 👨‍👩‍👧‍👦
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track your family's learning progress
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            onClick={() => navigate('/parent/settings')}
            sx={{ borderColor: '#9C27B0', color: '#9C27B0' }}
          >
            Settings
          </Button>
        </Box>

        {/* Overview Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} md={3}>
            <StatCard
              icon="👨‍👩‍👧‍👦"
              label="Total Kids"
              value={totalChildren}
              color="#9C27B0"
              bgColor="rgba(156, 39, 176, 0.1)"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatCard
              icon="📚"
              label="Sessions This Week"
              value={totalSessions}
              color="#2196F3"
              bgColor="rgba(33, 150, 243, 0.1)"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatCard
              icon="✅"
              label="Avg Accuracy"
              value={`${avgAccuracy}%`}
              color="#4CAF50"
              bgColor="rgba(76, 175, 80, 0.1)"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              onClick={() => setAddChildDialog(true)}
              sx={{
                cursor: 'pointer',
                bgcolor: 'rgba(255, 215, 0, 0.1)',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <AddIcon sx={{ fontSize: '2.5rem', color: '#FFA000', mb: 1 }} />
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#FFA000' }}>
                  Add Child
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* All Kids */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          All Kids
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {family.children.map((child) => (
            <Grid item xs={12} sm={6} md={4} key={child.id}>
              <ChildSummaryCard 
                child={child} 
                onViewDetails={handleViewDetails}
                onLoginAsKid={handleLoginAsKid}
              />
            </Grid>
          ))}
        </Grid>

        {/* Recent Activity Feed */}
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
              Recent Activity 📈
            </Typography>
            {recentActivities.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Child</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Topic</TableCell>
                      <TableCell align="center">Problems</TableCell>
                      <TableCell align="center">Accuracy</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentActivities.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ fontSize: '1.5rem' }}>{activity.childAvatar}</Typography>
                            <Typography variant="body2">{activity.childName}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                        <TableCell>{activity.topic}</TableCell>
                        <TableCell align="center">{activity.problems}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={`${activity.accuracy}%`}
                            size="small"
                            color={activity.accuracy >= 90 ? 'success' : activity.accuracy >= 70 ? 'warning' : 'error'}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={activity.status}
                            size="small"
                            sx={{
                              bgcolor: activity.status === 'Mastered' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                              color: activity.status === 'Mastered' ? '#4CAF50' : '#FF9800',
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No activity yet. Kids can start practicing!
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>

      {/* Add Child Dialog */}
      <Dialog open={addChildDialog} onClose={() => setAddChildDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add Child</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Child's Name"
            variant="outlined"
            value={newChildName}
            onChange={(e) => setNewChildName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleAddChild();
            }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddChildDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddChild}
            variant="contained"
            disabled={!newChildName.trim()}
            sx={{ bgcolor: '#9C27B0', '&:hover': { bgcolor: '#7B1FA2' } }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Child Details Dialog */}
      <Dialog open={!!selectedChild} onClose={handleCloseDetails} maxWidth="md" fullWidth>
        {selectedChild && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ fontSize: '2rem' }}>{selectedChild.avatar}</Typography>
                <Box>
                  <Typography variant="h6">{selectedChild.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Level {selectedChild.level} • {selectedChild.streak} day streak
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Recent Sessions
              </Typography>
              {selectedChild.sessions.length > 0 ? (
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Topic</TableCell>
                        <TableCell align="center">Problems</TableCell>
                        <TableCell align="center">Accuracy</TableCell>
                        <TableCell align="center">Avg Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedChild.sessions.map((session, index) => (
                        <TableRow key={index}>
                          <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                          <TableCell>{session.topic}</TableCell>
                          <TableCell align="center">{session.problems}</TableCell>
                          <TableCell align="center">{session.accuracy}%</TableCell>
                          <TableCell align="center">{session.avgTime}s</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                  No sessions yet
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ParentDashboardNew;
