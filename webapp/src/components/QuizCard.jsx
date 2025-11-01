import { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, Grid, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const QuizCard = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCheckAnswer = () => {
    const isCorrect = question.type === 'multiple-choice'
      ? selectedAnswer === question.correctAnswer
      : parseInt(inputValue) === question.correctAnswer;
    
    setShowFeedback(true);
    
    setTimeout(() => {
      onAnswer(isCorrect);
      setShowFeedback(false);
      setSelectedAnswer(null);
      setInputValue('');
      setShowHint(false);
    }, 1500);
  };

  const isCorrect = question.type === 'multiple-choice'
    ? selectedAnswer === question.correctAnswer
    : parseInt(inputValue) === question.correctAnswer;

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto' }}>
      <CardContent>
        {/* Question */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Chip
            label={`Question ${question.number}`}
            color="primary"
            sx={{ mb: 2 }}
          />
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            {question.question}
          </Typography>
        </Box>

        {/* Multiple Choice Options */}
        {question.type === 'multiple-choice' && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {question.options.map((option, index) => (
              <Grid item xs={6} key={index}>
                <Button
                  fullWidth
                  variant={selectedAnswer === option ? 'contained' : 'outlined'}
                  size="large"
                  onClick={() => setSelectedAnswer(option)}
                  disabled={showFeedback}
                  sx={{
                    py: 3,
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                    },
                  }}
                >
                  {option}
                </Button>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Input Field */}
        {question.type === 'input' && (
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your answer..."
              disabled={showFeedback}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '2rem',
                  fontWeight: 700,
                  textAlign: 'center',
                },
                '& input': {
                  textAlign: 'center',
                },
              }}
            />
          </Box>
        )}

        {/* Hint Button */}
        {!showFeedback && (
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Button
              variant="text"
              startIcon={<HelpOutlineIcon />}
              onClick={() => setShowHint(!showHint)}
              sx={{ color: 'text.secondary' }}
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>
            {showHint && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: 'info.light',
                  bgcolor: 'rgba(33, 150, 243, 0.1)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  💡 {question.hint}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Check Answer Button */}
        {!showFeedback && (
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleCheckAnswer}
            disabled={
              (question.type === 'multiple-choice' && !selectedAnswer) ||
              (question.type === 'input' && !inputValue)
            }
            sx={{ py: 2, fontSize: '1.2rem' }}
          >
            Check Answer
          </Button>
        )}

        {/* Feedback */}
        {showFeedback && (
          <Box
            sx={{
              textAlign: 'center',
              py: 3,
              bgcolor: isCorrect ? '#E8F5E9' : '#FFEBEE',
              borderRadius: 2,
              animation: 'fadeIn 0.3s ease',
            }}
          >
            {isCorrect ? (
              <>
                <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                  Correct! 🎉
                </Typography>
              </>
            ) : (
              <>
                <CancelIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                  Not quite! 😅
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  The correct answer is {question.correctAnswer}
                </Typography>
              </>
            )}
          </Box>
        )}
      </CardContent>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </Card>
  );
};

export default QuizCard;
