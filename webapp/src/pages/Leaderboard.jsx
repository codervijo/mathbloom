import { Box, Container, Typography, Card, CardContent, Avatar, Chip } from '@mui/material';
import Navbar from '../components/Navbar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Leaderboard = () => {
  const players = [
    { rank: 1, name: 'Emma S.', avatar: '👧', points: 2450, badges: 15, streak: 12 },
    { rank: 2, name: 'Alex K.', avatar: '👦', points: 2380, badges: 14, streak: 10 },
    { rank: 3, name: 'Sophie M.', avatar: '👧', points: 2210, badges: 13, streak: 8 },
    { rank: 4, name: 'You', avatar: '🦉', points: 1890, badges: 12, streak: 7, isCurrentUser: true },
    { rank: 5, name: 'Lucas P.', avatar: '👦', points: 1760, badges: 11, streak: 9 },
    { rank: 6, name: 'Maya R.', avatar: '👧', points: 1650, badges: 10, streak: 6 },
    { rank: 7, name: 'Noah T.', avatar: '👦', points: 1540, badges: 10, streak: 5 },
    { rank: 8, name: 'Olivia W.', avatar: '👧', points: 1420, badges: 9, streak: 7 },
  ];

  const topThree = players.slice(0, 3);
  const restOfPlayers = players.slice(3);

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
              Leaderboard 🏆
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Top math stars this week!
            </Typography>
          </Box>

          {/* Top 3 Podium */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              gap: 2,
              mb: 4,
              flexWrap: 'wrap',
            }}
          >
            {/* 2nd Place */}
            <Card
              sx={{
                width: 140,
                textAlign: 'center',
                bgcolor: 'rgba(192, 192, 192, 0.2)',
                borderTop: '4px solid #C0C0C0',
              }}
            >
              <CardContent>
                <Box sx={{ fontSize: '3rem', mb: 1 }}>{topThree[1].avatar}</Box>
                <Chip label="2nd" size="small" sx={{ mb: 1, bgcolor: '#C0C0C0', color: 'white' }} />
                <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {topThree[1].name}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                  {topThree[1].points}
                </Typography>
              </CardContent>
            </Card>

            {/* 1st Place */}
            <Card
              sx={{
                width: 160,
                textAlign: 'center',
                bgcolor: 'rgba(255, 215, 0, 0.2)',
                borderTop: '6px solid #FFD700',
                transform: 'translateY(-10px)',
              }}
            >
              <CardContent>
                <EmojiEventsIcon sx={{ fontSize: 40, color: '#FFD700', mb: 1 }} />
                <Box sx={{ fontSize: '4rem', mb: 1 }}>{topThree[0].avatar}</Box>
                <Chip label="1st" size="small" sx={{ mb: 1, bgcolor: '#FFD700', color: 'white' }} />
                <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {topThree[0].name}
                </Typography>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                  {topThree[0].points}
                </Typography>
              </CardContent>
            </Card>

            {/* 3rd Place */}
            <Card
              sx={{
                width: 140,
                textAlign: 'center',
                bgcolor: 'rgba(205, 127, 50, 0.2)',
                borderTop: '4px solid #CD7F32',
              }}
            >
              <CardContent>
                <Box sx={{ fontSize: '3rem', mb: 1 }}>{topThree[2].avatar}</Box>
                <Chip label="3rd" size="small" sx={{ mb: 1, bgcolor: '#CD7F32', color: 'white' }} />
                <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {topThree[2].name}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                  {topThree[2].points}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Rest of Rankings */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {restOfPlayers.map((player) => (
              <Card
                key={player.rank}
                sx={{
                  bgcolor: player.isCurrentUser ? 'rgba(33, 150, 243, 0.1)' : 'white',
                  borderLeft: player.isCurrentUser ? '4px solid #2196F3' : 'none',
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          minWidth: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: 'grey.200',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '1.2rem',
                        }}
                      >
                        {player.rank}
                      </Box>
                      <Box sx={{ fontSize: '2rem' }}>{player.avatar}</Box>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                          {player.name}
                          {player.isCurrentUser && (
                            <Chip label="You" size="small" color="primary" sx={{ ml: 1 }} />
                          )}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">
                            🏆 {player.badges} badges
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            🔥 {player.streak} days
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                      {player.points}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Leaderboard;
