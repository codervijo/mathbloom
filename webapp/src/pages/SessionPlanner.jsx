import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Slider,
  TextField,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useApp } from '../context/AppContext';

const topics = [
  { id: 'addition', label: 'Addition', emoji: '➕' },
  { id: 'subtraction', label: 'Subtraction', emoji: '➖' },
  { id: 'multiplication', label: 'Multiplication', emoji: '✖️' },
  { id: 'division', label: 'Division', emoji: '➗' },
  { id: 'fractions', label: 'Fractions', emoji: '🧩' },
  { id: 'decimals', label: 'Decimals', emoji: '💯' },
  { id: 'word-problems', label: 'Word Problems', emoji: '📝' },
];

const SessionPlanner = () => {
  const { family } = useApp();
  const [selectedChildId, setSelectedChildId] = useState(family.children[0]?.id || '');
  const [selectedTopics, setSelectedTopics] = useState(['addition', 'subtraction']);
  const [numQuestions, setNumQuestions] = useState(10);
  const [targetTime, setTargetTime] = useState(15);
  const [difficulty, setDifficulty] = useState(2);

  const selectedChild = family.children.find(c => c.id === selectedChildId);

  const handleTopicToggle = (topicId) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(t => t !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSave = () => {
    // Mock save - in real app would save to backend
    alert('Session plan saved!');
  };

  const handleReset = () => {
    setSelectedTopics(['addition', 'subtraction']);
    setNumQuestions(10);
    setTargetTime(15);
    setDifficulty(2);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Typography variant="h3" sx={{ mb: 1, fontWeight: 700, color: 'primary.main' }}>
          Session Planner 📅
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Customize daily practice sessions for each child
        </Typography>

        <Grid container spacing={4}>
          {/* Configuration Panel */}
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent>
                {/* Child Selector */}
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Select Child</InputLabel>
                  <Select
                    value={selectedChildId}
                    onChange={(e) => setSelectedChildId(e.target.value)}
                    label="Select Child"
                  >
                    {family.children.map((child) => (
                      <MenuItem key={child.id} value={child.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography sx={{ fontSize: '1.5rem' }}>{child.avatar}</Typography>
                          <Typography>{child.name}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Topics */}
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Topics to Practice
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                  {topics.map((topic) => (
                    <Chip
                      key={topic.id}
                      label={`${topic.emoji} ${topic.label}`}
                      onClick={() => handleTopicToggle(topic.id)}
                      color={selectedTopics.includes(topic.id) ? 'primary' : 'default'}
                      sx={{
                        bgcolor: selectedTopics.includes(topic.id) ? '#9C27B0' : 'default',
                        color: selectedTopics.includes(topic.id) ? 'white' : 'default',
                        '&:hover': {
                          bgcolor: selectedTopics.includes(topic.id) ? '#7B1FA2' : 'default',
                        },
                      }}
                    />
                  ))}
                </Box>

                {/* Number of Questions */}
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Questions per Session
                </Typography>
                <Box sx={{ px: 2, mb: 4 }}>
                  <Slider
                    value={numQuestions}
                    onChange={(e, val) => setNumQuestions(val)}
                    min={5}
                    max={30}
                    step={5}
                    marks
                    valueLabelDisplay="on"
                    sx={{
                      '& .MuiSlider-thumb': { bgcolor: '#9C27B0' },
                      '& .MuiSlider-track': { bgcolor: '#9C27B0' },
                      '& .MuiSlider-rail': { bgcolor: 'rgba(156, 39, 176, 0.3)' },
                    }}
                  />
                </Box>

                {/* Target Time */}
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Target Time (minutes)
                </Typography>
                <Box sx={{ px: 2, mb: 4 }}>
                  <Slider
                    value={targetTime}
                    onChange={(e, val) => setTargetTime(val)}
                    min={5}
                    max={30}
                    step={5}
                    marks
                    valueLabelDisplay="on"
                    sx={{
                      '& .MuiSlider-thumb': { bgcolor: '#2196F3' },
                      '& .MuiSlider-track': { bgcolor: '#2196F3' },
                      '& .MuiSlider-rail': { bgcolor: 'rgba(33, 150, 243, 0.3)' },
                    }}
                  />
                </Box>

                {/* Difficulty */}
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Difficulty Level
                </Typography>
                <Box sx={{ px: 2, mb: 4 }}>
                  <Slider
                    value={difficulty}
                    onChange={(e, val) => setDifficulty(val)}
                    min={1}
                    max={5}
                    step={1}
                    marks={[
                      { value: 1, label: 'Easy' },
                      { value: 3, label: 'Medium' },
                      { value: 5, label: 'Hard' },
                    ]}
                    valueLabelDisplay="on"
                    sx={{
                      '& .MuiSlider-thumb': { bgcolor: '#4CAF50' },
                      '& .MuiSlider-track': { bgcolor: '#4CAF50' },
                      '& .MuiSlider-rail': { bgcolor: 'rgba(76, 175, 80, 0.3)' },
                    }}
                  />
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    sx={{
                      flex: 1,
                      bgcolor: '#9C27B0',
                      '&:hover': { bgcolor: '#7B1FA2' },
                    }}
                  >
                    Save Plan
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    onClick={handleReset}
                    sx={{
                      borderColor: '#9C27B0',
                      color: '#9C27B0',
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Preview Panel */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                bgcolor: 'rgba(156, 39, 176, 0.05)',
                borderLeft: '4px solid #9C27B0',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Session Preview
              </Typography>

              {selectedChild && (
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Typography sx={{ fontSize: '2rem' }}>{selectedChild.avatar}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedChild.name}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body2">
                      <strong>Topics:</strong> {selectedTopics.map(id => topics.find(t => t.id === id)?.label).join(', ')}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Questions:</strong> {numQuestions}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Target Time:</strong> {targetTime} minutes
                    </Typography>
                    <Typography variant="body2">
                      <strong>Difficulty:</strong> Level {difficulty}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Box
                sx={{
                  bgcolor: 'white',
                  p: 2,
                  borderRadius: 2,
                  border: '1px dashed',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Example Problems:
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  • 15 + 23 = ?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  • 45 - 18 = ?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • 7 × 8 = ?
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SessionPlanner;
