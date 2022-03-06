import { DatePicker, DateRangePicker, LocalizationProvider } from "@mui/lab"
import { Box, styled, TextField } from "@mui/material"
import * as React from "react"
import AdapterDateFns from "@mui/lab/AdapterDateFns"

import SelectUnstyled, { selectUnstyledClasses } from "@mui/base/SelectUnstyled"
import OptionUnstyled, { optionUnstyledClasses } from "@mui/base/OptionUnstyled"
import PopperUnstyled from "@mui/base/PopperUnstyled"

import styles from "../../styles/components/PickDate.module.css"

const grey = {
  100: "#E7EBF0",
  300: "#CDD2D7",
  900: "#1A2027",
}

const StyledButton = styled("button")(
  () => `
  font-family: inherit;
  font-size: inherit;
  box-sizing: border-box;
  min-height: calc(1.5em + 15px);
  width: 110px;
  background:  #ffffff00;
  // border: 1px solid ${grey[300]};
  // border-radius: 25px;
  padding: 10px 0;
  text-align: left;
  line-height: 1.5;
  color: inherit;
  diplay: flex;
  justify-content: space-between;

  &:hover {
    color: #a42d2df0;
    background: none;
    // border: 1px solid #a42d2d;
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${grey[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: "▲";
    }
  }

  &::after {
    content: " ▼";
  }
  `
)

const StyledListbox = styled("ul")(
  () => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 200px;
  background: #f7f7f7;
  border: 1px solid #00000030;
  border-radius: 20px;
  color: ${grey[900]};
  overflow: auto;
  outline: 0px;
  `
)

const StyledOption = styled(OptionUnstyled)(
  () => `
  list-style: none;
  padding: 8px;
  border-radius: 20px;
  cursor: pointer;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: #a42d2d33;
    color: #a42d2d;
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: #a42d2d33;
    color: #a42d2d;
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: #a42d2d33;
    color: #a42d2d;
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: #00000010;
    color: ${grey[900]};
  }
  `
)

const StyledPopper = styled(PopperUnstyled)`
  z-index: 2;
`

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  }

  return <SelectUnstyled {...props} ref={ref} components={components} />
})

const MyTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#a42d2d",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#a42d2d",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#00000033",
      borderRadius: 50,
    },
    "&:hover fieldset": {
      borderColor: "#000000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#a42d2d",
    },
  },
})

function PickDate(props) {
  const todayDate = new Date().toISOString()
  const [value1, setValue1] = React.useState(null)
  const [value2, setValue2] = React.useState([
    "2012-01-01T00:00:00.000Z",
    todayDate,
  ])
  const [viewPeriod, setViewPeriod] = React.useState(true)

  const setNewPeriodHandler = (newValue) => {
    const startDate = new Date(newValue[0]).toISOString()
    const endDate = new Date(newValue[1]).toISOString()
    setValue2([startDate, endDate])
  }

  // console.log(value2)
  props.onFilterDateRange(value2)

  return (
    <Box className={styles.pickDateContainer}>
      <CustomSelect
        defaultValue={1}
        onChange={(e) => {
          console.log(e)
          e === 0 ? setViewPeriod(false) : setViewPeriod(true)
        }}
      >
        <StyledOption value={0}>By Date</StyledOption>
        <StyledOption value={1}>By Period</StyledOption>
      </CustomSelect>
      <Box className={styles.datePeriodContainer}>
        <Box display={viewPeriod ? "none" : "flex"}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={value1}
              label="Date"
              cancelText="Back"
              okText="Choose"
              onChange={(newValue) => {
                setValue1(newValue)
              }}
              renderInput={(params) => (
                <MyTextField
                  className={styles.dateTextField}
                  size="small"
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box display={viewPeriod ? "flex" : "none"}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="From"
              endText="To"
              value={value2}
              onChange={setNewPeriodHandler}
              renderInput={(startProps, endProps) => (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <MyTextField
                    className={styles.periodTextField}
                    size="small"
                    {...startProps}
                  />
                  <MyTextField
                    className={styles.periodTextField}
                    size="small"
                    {...endProps}
                  />
                </Box>
              )}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </Box>
  )
}

export default PickDate
