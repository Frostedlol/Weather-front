import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import cities from "../navbar/cities.json"
import { useState } from "react";
import axios from "axios";

export default function ComboBox({ setSelectedCity }) {
  const locations = cities
  .filter((city, index, self) => 
    index === self.findIndex((c) => c.name === city.name && c.country === city.country)
  )
  .map((city, index) => ({
    label: city.name,
  }));
  const handleCityChange = async (event, value) => {
    setSelectedCity(value);
    console.log(value);
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        options={locations}
        sx={{
          width: 300,
          "& .MuiInputBase-root": {
            backgroundColor: "navy-blue",
            color: "black",
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
        }}
        onChange={handleCityChange} 
        renderInput={(params) => (
          <TextField {...params} label="Hae Sijaintia" />
        )}
      />
    </div>
  );
}
