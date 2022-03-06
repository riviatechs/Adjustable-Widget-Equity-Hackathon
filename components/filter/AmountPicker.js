import { Slider, SliderThumb, styled, TextField } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import PropTypes from "prop-types"

const AirbnbSlider = styled(Slider)(() => ({
  color: "#a42d2d",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px #a42d2d16",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: "#d8d8d8",
    height: 3,
  },
}))

const AirbnbThumbComponent = (props) => {
  const { children, ...other } = props
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  )
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
}

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

const pickerContainer = {
  display: "flex",
  width: "45%",
  flexDirection: "column",
  justifyContent: "start",
}

const amountButton = {
  py: 1.3,
  px: 2,
  borderRadius: 5,
  width: 150,
  "&:hover": {
    background: "#a42d2d23",
    transition: "all ease-in-out 300ms",
    cursor: "pointer",
  },
}

const allTextFieldsBox = {
  my: 5,
  mx: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}

const minAmountTextFieldProps = {
  step: 100000,
  min: 0,
  max: 100000000,
  type: "number",
  "aria-labelledby": "input-slider",
}

const maxAmountTextFieldProps = {
  step: 100000,
  min: 100000,
  max: 100000000,
  type: "number",
  "aria-labelledby": "input-slider",
}

const amountTextFieldStyle = { width: 150, mx: 2 }

const airBNBInput = { width: 400, mx: 2 }

function AmountPicker(props) {
  const prevAmount = props.filterAmount
  const [value, setValue] = React.useState(prevAmount)
  const [min, setMin] = React.useState(prevAmount[0])
  const [max, setMax] = React.useState(prevAmount[1])
  const [minErr, setMinError] = React.useState(null)
  const [maxErr, setMaxError] = React.useState(null)

  const amountRangeHandler = (event) => {
    const newValue = event.target.value

    setValue(newValue)
    setMin(newValue[0])
    setMax(newValue[1])
  }

  const handleMinInputChange = (event) => {
    const intNum = parseInt(event.target.value)

    if (intNum > 100000000 || intNum < 0) {
      setMinError(
        <Box sx={{ color: "darkred", py: 1 }}>
          The range should be between 1 and 100000000
        </Box>
      )
    } else if (intNum > max) {
      setMinError(
        <Box sx={{ color: "darkred", py: 1 }}>
          The minum amount should be larger than the maximum!
        </Box>
      )
    } else if (intNum === max) {
      setMinError(
        <Box sx={{ color: "darkred", py: 1 }}>
          The minimum amount should be the same than the maximum!
        </Box>
      )
    } else {
      setMinError("")
      setMin(event.target.value)
      setValue((prev) => [intNum, prev[1]])
    }
  }

  const handleMaxInputChange = (event) => {
    const intNum = parseInt(event.target.value)

    if (intNum > 100000000 || intNum <= 0) {
      setMaxError(
        <Box sx={{ color: "darkred", py: 1 }}>
          The range should be between 1 and 100000000!
        </Box>
      )
    } else if (intNum < min) {
      setMaxError(
        <Box sx={{ color: "darkred", py: 1 }}>
          The maximum amount should be smaller than the minimum!
        </Box>
      )
    } else if (intNum === min) {
      setMaxError(
        <Box sx={{ color: "darkred", py: 1 }}>
          The maximum amount should be the same than the minimum!
        </Box>
      )
    } else {
      setMaxError("")
      setMax(event.target.value)
      setValue((prev) => [prev[0], intNum])
    }
  }

  props.onPickAmount(value)

  return (
    <Box sx={pickerContainer}>
      <Box sx={amountButton}>By Amount</Box>

      <Box sx={allTextFieldsBox}>
        From
        <MyTextField
          size="small"
          onChange={handleMinInputChange}
          inputProps={minAmountTextFieldProps}
          value={min}
          sx={amountTextFieldStyle}
        />
        To
        <MyTextField
          onChange={handleMaxInputChange}
          inputProps={maxAmountTextFieldProps}
          size="small"
          value={max}
          min={1000}
          max={100000000}
          sx={amountTextFieldStyle}
        />
      </Box>

      <AirbnbSlider
        components={{ Thumb: AirbnbThumbComponent }}
        sx={airBNBInput}
        value={value}
        onChange={amountRangeHandler}
        valueLabelDisplay="auto"
        min={0}
        max={100000000}
      />

      <Box sx={{ py: 2 }}>
        {minErr}
        {maxErr}
      </Box>
    </Box>
  )
}

export default AmountPicker
