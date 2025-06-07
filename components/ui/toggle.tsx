import ToggleButton from '@mui/material/ToggleButton';
import { styled } from '@mui/material/styles';
import { colors } from '@/theme';

const Toggle = styled(ToggleButton)(() => ({
  margin: '0',
  width: '14.2%',
  height: '60px',
  fontFamily: 'Nunito',
  fontWeight: 700,
  fontSize: '1rem',
  color: 'white',
  borderColor: 'rgba(255,255,255,0.3)',
  borderWidth: '0.2rem',
  background: 'transparent',
  textTransform: 'capitalize',
  borderRadius: '1rem',
  '&.Mui-selected': {
    backgroundColor: colors.bg.dark,
    color: 'white',
    },
  '&.Mui-selected:hover': {
    backgroundColor: colors.bg.light,
    },
  '&:hover': {
    background: colors.bg.main,
    },
  })
)

export { Toggle }