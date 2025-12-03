import { Chip, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useApp } from '../context/AppContext';

const ModeBadge = () => {
  const { mode } = useApp();

  if (mode === 'demo') {
    return (
      <Tooltip title="Practice here uses sample data only. Parent login stores your family setup on this device.">
        <Chip
          icon={<InfoIcon />}
          label="Demo Mode"
          size="small"
          sx={{
            bgcolor: 'rgba(33, 150, 243, 0.15)',
            color: '#2196F3',
            fontWeight: 600,
            '& .MuiChip-icon': {
              color: '#2196F3',
            },
          }}
        />
      </Tooltip>
    );
  }

  return (
    <Chip
      label="Family Mode"
      size="small"
      sx={{
        bgcolor: 'rgba(76, 175, 80, 0.15)',
        color: '#4CAF50',
        fontWeight: 600,
      }}
    />
  );
};

export default ModeBadge;
