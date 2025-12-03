import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useApp } from '../context/AppContext';

const ParentSettings = () => {
  const { family, setFamily, lockParent } = useApp();
  const [pinDialog, setChangePinDialog] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [accessibilityFont, setAccessibilityFont] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChangePIN = () => {
    if (newPin.length < 4) {
      setPinError('PIN must be at least 4 digits');
      return;
    }
    if (newPin !== confirmPin) {
      setPinError('PINs do not match');
      return;
    }

    setFamily(prev => ({ ...prev, parentPIN: newPin }));
    setSuccessMessage('PIN changed successfully!');
    setChangePinDialog(false);
    setNewPin('');
    setConfirmPin('');
    setPinError('');
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(family, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mathbloom-data.json';
    link.click();
    setSuccessMessage('Data exported successfully!');
  };

  const handleImportData = () => {
    setSuccessMessage('Import feature coming soon!');
  };

  const handleLogout = () => {
    lockParent();
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Typography variant="h3" sx={{ mb: 1, fontWeight: 700, color: 'primary.main' }}>
          Parent Settings ⚙️
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your parent account and preferences
        </Typography>

        {/* Success Message */}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMessage('')}>
            {successMessage}
          </Alert>
        )}

        {/* Security Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
              <LockIcon /> Security
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Parent PIN
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Current PIN: {family.parentPIN.replace(/./g, '•')}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                onClick={() => setChangePinDialog(true)}
                sx={{
                  borderColor: '#9C27B0',
                  color: '#9C27B0',
                }}
              >
                Change PIN
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Lock Parent Mode
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign out and return to kid mode
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Data Management Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
              Data Management
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FileDownloadIcon />}
                onClick={handleExportData}
                sx={{
                  flex: 1,
                  borderColor: '#2196F3',
                  color: '#2196F3',
                }}
              >
                Export Data (JSON)
              </Button>
              <Button
                variant="outlined"
                startIcon={<FileUploadIcon />}
                onClick={handleImportData}
                sx={{
                  flex: 1,
                  borderColor: '#2196F3',
                  color: '#2196F3',
                }}
              >
                Import Data
              </Button>
            </Box>

            <Typography variant="caption" color="text.secondary">
              Export your family's data as a JSON file for backup or import data from a previous export.
            </Typography>
          </CardContent>
        </Card>

        {/* Accessibility Section */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
              Accessibility
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={accessibilityFont}
                  onChange={(e) => setAccessibilityFont(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#9C27B0',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      bgcolor: '#9C27B0',
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Use Dyslexia-Friendly Font
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enable OpenDyslexic font for better readability
                  </Typography>
                </Box>
              }
            />
          </CardContent>
        </Card>
      </Container>

      {/* Change PIN Dialog */}
      <Dialog open={pinDialog} onClose={() => setChangePinDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Change Parent PIN</DialogTitle>
        <DialogContent>
          {pinError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {pinError}
            </Alert>
          )}
          <TextField
            autoFocus
            fullWidth
            type="password"
            label="New PIN"
            variant="outlined"
            value={newPin}
            onChange={(e) => {
              setNewPin(e.target.value);
              setPinError('');
            }}
            inputProps={{ maxLength: 6 }}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm New PIN"
            variant="outlined"
            value={confirmPin}
            onChange={(e) => {
              setConfirmPin(e.target.value);
              setPinError('');
            }}
            inputProps={{ maxLength: 6 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setChangePinDialog(false);
            setPinError('');
            setNewPin('');
            setConfirmPin('');
          }}>
            Cancel
          </Button>
          <Button
            onClick={handleChangePIN}
            variant="contained"
            disabled={!newPin || !confirmPin}
            sx={{ bgcolor: '#9C27B0', '&:hover': { bgcolor: '#7B1FA2' } }}
          >
            Change PIN
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ParentSettings;
