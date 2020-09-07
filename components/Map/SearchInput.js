/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function SearchInput({ options, cbChange, cbInputChange }) {
  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={options}
      onChange={cbChange}
      onInputChange={cbInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search input"
          margin="normal"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
    />
  );
}
