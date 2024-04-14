import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner() {
  return <Box sx={{
    backgroundColor: '#ffffff88',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <CircularProgress></CircularProgress>
  </Box>
}