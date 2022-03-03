import {
  Autocomplete,
  InputBase,
  Slider,
  SliderThumb,
  styled,
  TextField,
} from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import PropTypes from "prop-types"
import { priceSeparator } from "../../util/util"

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

// const MyTextField = styled(TextField)({
//   "& label.Mui-focused": {
//     color: "#a42d2d",
//   },
//   "& .MuiInput-underline:after": {
//     borderBottomColor: "#a42d2d",
//   },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "#00000033",
//       borderRadius: 50,
//     },
//     "&:hover fieldset": {
//       borderColor: "#000000",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#a42d2d",
//     },
//   },
// });

function AmountPicker(props) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "30%",
        py: 5,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <label>Amount</label>
      <AirbnbSlider
        components={{ Thumb: AirbnbThumbComponent }}
        sx={{ width: 200 }}
        getAriaLabel={(index) =>
          index === 0 ? "Minimum amount" : "Maximum amount"
        }
        defaultValue={[20, 40]}
      />
    </Box>
  )
}

export default AmountPicker
