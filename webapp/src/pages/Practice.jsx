import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, LinearProgress, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../components/QuizCard';
import Navbar from '../components/Navbar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { getJson } from '../lib/api';

const Practice = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [startTime] = useState(Date.now());

  // Fallback questions used if questions1.json is not available
  const fallbackQuestions = [
    {
      number: 1,
      question: '6 × 7 = ?',
      type: 'multiple-choice',
      options: [35, 42, 48, 54],
      correctAnswer: 42,
      hint: 'Think of 6 groups of 7, or try counting by 7s six times!',
    },
    {
      number: 2,
      question: '45 ÷ 9 = ?',
      type: 'input',
      correctAnswer: 5,
      hint: 'How many 9s fit into 45?',
    },
    {
      number: 3,
      question: '8 × 8 = ?',
      type: 'multiple-choice',
      options: [56, 64, 72, 80],
      correctAnswer: 64,
      hint: 'This is a perfect square - 8 rows of 8!',
    },
    {
      number: 4,
      question: '12 + 15 = ?',
      type: 'input',
      correctAnswer: 27,
      hint: 'Add the tens first (10 + 10), then the ones (2 + 5).',
    },
    {
      number: 5,
      question: '9 × 6 = ?',
      type: 'multiple-choice',
      options: [45, 54, 63, 72],
      correctAnswer: 54,
      hint: 'Try 10 × 6 and then subtract 6!',
    },
  ];

  // Start with fallback; replace with questions1.json if available
  const [questions, setQuestions] = useState(fallbackQuestions);

  useEffect(() => {
    let isMounted = true;

    async function loadQuestions() {
      // 1) First choice: fetch from the configured API server (VITE_API_BASE)
      try {
        const data = await getJson('/api/v1/demo-practice.json', { cache: 'no-store' });
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setQuestions(data);
          return;
        }
      } catch (_) {
        // ignore and try next strategy
      }

      try {
        // Prefer loading from src via Vite's optional glob import (no build error if missing)
        const modules = import.meta.glob('../data/mock/questions1.json', { eager: true });
        const mod = modules['../data/mock/questions1.json'];
        if (mod && mod.default && Array.isArray(mod.default)) {
          if (isMounted) setQuestions(mod.default);
          return;
        }
      } catch (_) {
        // ignore and try next strategy
      }

      try {
        // Fallback: attempt to load from public/questions1.json at runtime if present
        const res = await fetch('/questions1.json', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data)) setQuestions(data);
        }
      } catch (_) {
        // ignore; keep fallbackQuestions
      }
    }

    loadQuestions();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const accuracy = Math.round((score / (currentQuestion + 1)) * 100);
  const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60);

  if (quizComplete) {
    const finalAccuracy = Math.round((score / questions.length) * 100);
    const earnedBadge = finalAccuracy >= 80;

    return (
      <>
        <Navbar />
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
          <Container maxWidth="sm">
            <Card sx={{ textAlign: 'center' }}>
              <CardContent sx={{ py: 6 }}>
                <Box
                  sx={{
                    fontSize: '6rem',
                    mb: 2,
                    animation: 'bounce 1s ease-in-out infinite',
                  }}
                >
                  {earnedBadge ? '🏆' : '🎯'}
                </Box>

                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                  {earnedBadge ? 'Amazing Work!' : 'Great Effort!'}
                </Typography>

                <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                  You completed the challenge! 🎉
                </Typography>

                {/* Score Summary */}
                <Box sx={{ mb: 4 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 2,
                      bgcolor: 'primary.light',
                      bgcolor: 'rgba(33, 150, 243, 0.1)',
                      borderRadius: 3,
                      p: 3,
                      mb: 3,
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {score}/{questions.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Correct Answers
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Chip label={`${finalAccuracy}% Accuracy`} color="primary" />
                    <Chip label={`${timeSpent} min`} variant="outlined" />
                  </Box>
                </Box>

                {/* Badge Earned */}
                {earnedBadge && (
                  <Card
                    sx={{
                      bgcolor: 'secondary.light',
                      bgcolor: 'rgba(255, 215, 0, 0.15)',
                      mb: 3,
                      animation: 'scaleIn 0.5s ease',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                        <EmojiEventsIcon sx={{ fontSize: 40, color: 'secondary.dark' }} />
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Badge Earned! 🎖️
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Multiplication Master
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                )}

                {/* Skill Progress */}
                <Box sx={{ textAlign: 'left', mb: 4 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                    Skills Improved:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ✓ Multiplication tables<br />
                    ✓ Division basics<br />
                    ✓ Quick mental math
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleRestart}
                    fullWidth
                  >
                    Practice Again
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/dashboard')}
                    fullWidth
                  >
                    Back to Dashboard
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <style>
              {`
                @keyframes scaleIn {
                  from { transform: scale(0.8); opacity: 0; }
                  to { transform: scale(1); opacity: 1; }
                }
              `}
            </style>
          </Container>
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          {/* Progress Header */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Question {currentQuestion + 1} of {questions.length}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label={`${score} correct`} color="success" size="small" />
                <Chip label={`${accuracy}% accuracy`} variant="outlined" size="small" />
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 10,
                borderRadius: 5,
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                },
              }}
            />
          </Box>

          {/* Question Card */}
          <QuizCard
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
          />

          {/* Mascot Encouragement */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>🦉</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              "You're doing great! Keep going!"
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Practice;
