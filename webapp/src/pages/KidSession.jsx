import { useState } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, TextField, LinearProgress, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useApp } from '../context/AppContext';

// Mock questions
const generateQuestions = () => {
  const questions = [];
  for (let i = 0; i < 10; i++) {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    questions.push({
      question: `${a} + ${b}`,
      answer: a + b,
    });
  }
  return questions;
};

const KidSession = () => {
  const navigate = useNavigate();
  const { currentChild, updateChildSession } = useApp();
  const [questions] = useState(generateQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);

  if (!currentChild) {
    navigate('/kid/login');
    return null;
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSubmit = () => {
    const isCorrect = parseInt(userAnswer) === currentQuestion.answer;
    
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setUserAnswer('');
        setFeedback(null);
      } else {
        // Session complete
        const accuracy = Math.round((score / questions.length) * 100);
        updateChildSession(currentChild.id, {
          date: new Date().toISOString(),
          topic: 'Addition',
          problems: questions.length,
          accuracy,
          avgTime: 2.5,
          status: accuracy >= 80 ? 'Mastered' : 'Needs Review',
        });
        setSessionComplete(true);
      }
    }, 1500);
  };

  if (sessionComplete) {
    const accuracy = Math.round((score / questions.length) * 100);
    
    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', alignItems: 'center', py: 4 }}>
        <Container maxWidth="sm">
          <Card sx={{ textAlign: 'center', p: 4 }}>
            <Typography sx={{ fontSize: '5rem', mb: 2 }}>
              {accuracy >= 80 ? '🎉' : '💪'}
            </Typography>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
              {accuracy >= 80 ? 'Amazing Work!' : 'Great Effort!'}
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
              You got {score} out of {questions.length} correct!
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Chip
                label={`${accuracy}% Accuracy`}
                color={accuracy >= 80 ? 'success' : 'warning'}
                sx={{ fontSize: '1.2rem', py: 3, px: 2 }}
              />
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => navigate('/kid')}
              sx={{
                bgcolor: '#9C27B0',
                fontSize: '1.1rem',
                py: 2,
                '&:hover': { bgcolor: '#7B1FA2' },
              }}
            >
              Back to Home
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="sm">
        {/* Progress */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Question {currentIndex + 1} of {questions.length}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Score: {score}/{currentIndex + (feedback ? 1 : 0)}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: 'rgba(156, 39, 176, 0.1)',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#9C27B0',
                borderRadius: 5,
              },
            }}
          />
        </Box>

        {/* Question Card */}
        <Card
          sx={{
            p: 4,
            textAlign: 'center',
            bgcolor: feedback === 'correct' ? 'rgba(76, 175, 80, 0.1)' : feedback === 'incorrect' ? 'rgba(244, 67, 54, 0.1)' : 'white',
            transition: 'all 0.3s ease',
          }}
        >
          <CardContent>
            <Typography variant="h2" sx={{ mb: 4, fontWeight: 700, fontSize: { xs: '3rem', md: '4rem' } }}>
              {currentQuestion.question} = ?
            </Typography>

            {!feedback && (
              <>
                <TextField
                  fullWidth
                  type="number"
                  variant="outlined"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && userAnswer) handleSubmit();
                  }}
                  placeholder="Your answer"
                  autoFocus
                  sx={{
                    mb: 3,
                    '& input': {
                      textAlign: 'center',
                      fontSize: '2rem',
                      fontWeight: 600,
                    },
                  }}
                />

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={!userAnswer}
                  sx={{
                    bgcolor: '#2196F3',
                    fontSize: '1.2rem',
                    py: 2,
                    '&:hover': { bgcolor: '#1976D2' },
                  }}
                >
                  Check Answer
                </Button>
              </>
            )}

            {feedback === 'correct' && (
              <Box>
                <CheckCircleIcon sx={{ fontSize: '5rem', color: '#4CAF50', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#4CAF50' }}>
                  Correct! 🎉
                </Typography>
              </Box>
            )}

            {feedback === 'incorrect' && (
              <Box>
                <CancelIcon sx={{ fontSize: '5rem', color: '#F44336', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#F44336', mb: 1 }}>
                  Not quite! 💪
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  The answer is {currentQuestion.answer}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default KidSession;
