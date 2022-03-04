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

function AirbnbThumbComponent(props) {
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

function AmountPicker(props) {
  const prevAmount = props.amount
  const [value, setValue] = React.useState(prevAmount)
  const [min, setMin] = React.useState(prevAmount[0])
  const [max, setMax] = React.useState(prevAmount[1])

  const amountRangeHandler = (event) => {
    const newValue = event.target.value

    setValue(newValue)
    setMin(newValue[0])
    setMax(newValue[1])
  }

  const handleMinInputChange = (event) => {
    const intNum = parseInt(event.target.value)
    setMin(event.target.value === "" ? 0 : intNum)

    setValue((prev) => [intNum, prev[1]])
  }

  const handleMaxInputChange = (event) => {
    const intNum = parseInt(event.target.value)
    setMax(event.target.value === "" ? 0 : intNum)

    setValue((prev) => [prev[0], intNum])
  }

  props.onPickAmount(value)

  return (
    <Box
      sx={{
        display: "flex",
        width: "45%",
        flexDirection: "column",
        justifyContent: "start",
      }}
    >
      <Box
        sx={{
          py: 1.3,
          px: 2,
          borderRadius: 5,
          width: 150,
          "&:hover": {
            background: "#a42d2d23",
            transition: "all ease-in-out 300ms",
            cursor: "pointer",
          },
        }}
      >
        By Amount
      </Box>
      <Box
        sx={{
          my: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        From
        <MyTextField
          size="small"
          onChange={handleMinInputChange}
          inputProps={{
            step: 100000,
            min: 0,
            max: 10000000,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
          value={min}
          sx={{ width: 150, mx: 2 }}
        />
        To
        <MyTextField
          onChange={handleMaxInputChange}
          inputProps={{
            step: 100000,
            min: 0,
            max: 10000000,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
          size="small"
          value={max}
          sx={{ width: 150, mx: 2 }}
        />
      </Box>

      <AirbnbSlider
        components={{ Thumb: AirbnbThumbComponent }}
        sx={{ width: 400 }}
        getAriaLabel={() => "Minimum distance shift"}
        value={value}
        onChange={amountRangeHandler}
        min={0}
        valueLabelDisplay="auto"
        max={10000000}
      />
    </Box>
  )
}

export default AmountPicker
