import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ModeBadge from './ModeBadge';
import { useApp } from '../context/AppContext';

const AppShell = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentChild } = useApp();

  const showChildInfo = currentChild && location.pathname.startsWith('/kid');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" sx={{ bgcolor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => navigate('/')}>
            <Typography variant="h5">🦉</Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              MathBloom
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {showChildInfo && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: '1.5rem' }}>{currentChild.avatar}</Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  {currentChild.name}
                </Typography>
              </Box>
            )}
            <ModeBadge />
          </Box>
        </Toolbar>
      </AppBar>

      <Box>{children}</Box>
    </Box>
  );
};

export default AppShell;
