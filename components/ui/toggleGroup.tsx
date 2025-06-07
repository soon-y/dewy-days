import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { Toggle } from './toggle'
import { useState, useEffect } from 'react'

interface Props {
  initialMon: boolean
  initialTue: boolean
  initialWed: boolean
  initialThu: boolean
  initialFri: boolean
  initialSat: boolean
  initialSun: boolean

  setMon: React.Dispatch<React.SetStateAction<boolean>>
  setTue: React.Dispatch<React.SetStateAction<boolean>>
  setWed: React.Dispatch<React.SetStateAction<boolean>>
  setThu: React.Dispatch<React.SetStateAction<boolean>>
  setFri: React.Dispatch<React.SetStateAction<boolean>>
  setSat: React.Dispatch<React.SetStateAction<boolean>>
  setSun: React.Dispatch<React.SetStateAction<boolean>>
  openAlarm: boolean
}

const ToggleGroup: React.FC<Props> = ({
  initialMon, initialTue, initialWed, initialThu, initialFri, initialSat, initialSun,
  setMon, setTue, setWed, setThu, setFri, setSat, setSun, openAlarm
}) => {
  const [selectMon, setSelectMon] = useState<boolean>(initialMon)
  const [selectTue, setSelectTue] = useState<boolean>(initialTue)
  const [selectWed, setSelectWed] = useState<boolean>(initialWed)
  const [selectThu, setSelectThu] = useState<boolean>(initialThu)
  const [selectFri, setSelectFri] = useState<boolean>(initialFri)
  const [selectSat, setSelectSat] = useState<boolean>(initialSat)
  const [selectSun, setSelectSun] = useState<boolean>(initialSun)

  useEffect(() => {
    setSelectMon(initialMon)
    setSelectTue(initialTue)
    setSelectWed(initialWed)
    setSelectThu(initialThu)
    setSelectFri(initialFri)
    setSelectSat(initialSat)
    setSelectSun(initialSun)
  }, [openAlarm])

  return (
    <ToggleButtonGroup
      exclusive
      aria-label="day selection"
      style={{
        width: '100%',
        justifyContent: 'center',
        paddingTop: '1rem',
        paddingBottom: '0.6rem',
      }}
    >
      <Toggle value="monday" aria-label="days" selected={selectMon} onClick={() => {
        setSelectMon(!selectMon)
        setMon(!selectMon)
      }} > Mo
      </Toggle>
      <Toggle value="tuesday" aria-label="days" selected={selectTue} onClick={() => {
        setSelectTue(!selectTue)
        setTue(!selectTue)
      }} > Tu
      </Toggle>
      <Toggle value="wednesday" aria-label="days" selected={selectWed} onClick={() => {
        setSelectWed(!selectWed)
        setWed(!selectWed)
      }} > We
      </Toggle>
      <Toggle value="thursday" aria-label="days" selected={selectThu} onClick={() => {
        setSelectThu(!selectThu)
        setThu(!selectThu)
      }} > Th
      </Toggle>
      <Toggle value="friday" aria-label="days" selected={selectFri} onClick={() => {
        setSelectFri(!selectFri)
        setFri(!selectFri)
      }} > Fr
      </Toggle>
      <Toggle value="saturday" aria-label="days" selected={selectSat} onClick={() => {
        setSelectSat(!selectSat)
        setSat(!selectSat)
      }} > Sa
      </Toggle>
      <Toggle value="sunday" aria-label="days" selected={selectSun} onClick={() => {
        setSelectSun(!selectSun)
        setSun(!selectSun)
      }} > Su
      </Toggle>
    </ToggleButtonGroup>
  )
}

export default ToggleGroup