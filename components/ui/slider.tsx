import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'

const StyledSlider = styled(Slider)({
  color: 'rgba(255,255,255,0.8)',
  height: '0.4rem',
  width: '100%',
  '& .MuiSlider-markLabel': {
    color: 'rgba(255,255,255,1)',
    fontSize: '1rem',
    right: '-7rem',
    top: '2rem',
    fontFamily: 'Nunito',
    fontWeight: 700,
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: '1.4rem',
    width: '1.4rem',
    backgroundColor: 'rgba(255,255,255,1)',
    border: 'none',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    fontFamily: 'Nunito',
    lineHeight: 1.2,
    fontSize: '1rem',
    background: 'unset',
    padding: 0,
    width: '3rem',
    height: '3rem',
    borderRadius: '50% 50% 50% 0',
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    fontWeight: 700,
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
})

export { StyledSlider }