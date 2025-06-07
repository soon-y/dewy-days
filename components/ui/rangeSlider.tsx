import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
import { colors } from '@/theme'

const StyledRangeSlider = styled(Slider)(() => ({
  color: 'rgba(255,255,255,0.7)',
  padding: '13px 0',
  width: '94%',
  '& .MuiSlider-thumb': {
    height: '1.5rem',
    width: '1.5rem',
    backgroundColor: '#fff',
    border: 'none',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    }
  },
  '& .MuiSlider-track': {
    height: '0.5rem',
  },
  '& .MuiSlider-rail': {
    color: 'rgba(255,255,255,0.5)',
    opacity: 1,
    height: '0.4rem',
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1,
    fontSize: '1.1rem',
    fontWeight: '400',
    fontFamily: 'Cherry Bomb One',
    background: colors.bg.dark,
    color: 'white',
    padding: 0,
    width: '2.4rem',
    height: '2.4rem',
    borderRadius: '50% 50% 50% 0%',
    borderColor: colors.bg.dark,
    borderWidth: '1rem',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
  '&.Mui-disabled': {
    opacity: 0.5,
    pointerEvents: 'none',
    '& .MuiSlider-thumb': {
      backgroundColor: '#aaa',
    },
    '& .MuiSlider-track': {
      backgroundColor: '#aaa',
    },
    '& .MuiSlider-rail': {
      backgroundColor: '#ccc',
    },
  },
}))

export { StyledRangeSlider }