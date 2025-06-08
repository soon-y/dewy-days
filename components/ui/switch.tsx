import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import { colors } from '@/theme'

interface Props {
  svg: string
}

const ToggleSwitch = styled(Switch)<Props>(({ svg }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    transform: 'translateX(6px)',

    '&.Mui-checked': {
      color: '#7ED1FF',
      transform: 'translateX(24px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="${encodeURIComponent(
          colors.bg.dark,
        )}" d="${svg}"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: colors.bg.dark,
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: ' #e6f7ff'
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#C4C4C4',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="${encodeURIComponent(
        '#eaeaea',
      )}" d="${svg}"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 1,
  },
}))

export { ToggleSwitch }