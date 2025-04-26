import { TextField } from '@mui/material'
import React from 'react'

function Search({xs,md}) {
  return (
    <TextField 
                  id="outlined-search"
                  label="Search field"
                  type="search"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{
                    width: { md: 'auto' },
                    margin:"6px",
                    display:{xs:xs ,md:md},
                    backgroundColor: "white",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      }
                    },
                    "& .MuiInputLabel-root": {
                      color: "black",
                    },
                    "& .Mui-focused .MuiInputLabel-root": {
                      color: "black",
                    }
                  }}
                />
)
}

export default Search