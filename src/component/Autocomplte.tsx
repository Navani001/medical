import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import "./auto.css"
import { NoEncryption } from '@mui/icons-material';
import "./auto.css"
import { drug } from "../../src/stores/drug.tsx";
const filter = createFilterOptions();
interface drug_list{
    id: number;
    name: string;
    isactive: boolean;
    drug_type:"tablet" | "sirap"
  }
  interface entire_drug_data {
    drug_list: drug_list[];
    add_drug: () =>void;
    
  }
export default function FreeSoloCreateOption() {
  const [value, setValue] = React.useState<any>(null);
  const drug_data = drug((state) => state.drug_list);
  console.log(drug_data)
  
  return (
    <Autocomplete
  
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            name: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            name: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={drug_data}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
      
        return (
          <li key={key} {...optionProps} className='p-5 border-b-2 border-gr'>
            {option.drug_type}-{option.name}
          </li>
        );
      }}
      sx={{
        width: "100%",
        height: "100%",
        padding: "0px",
        border: "0px",
        '& .MuiOutlinedInput-root': {
          padding: "7px",  // Set padding here
        },
       
      }}
      freeSolo
      renderInput={(params) => (
        
        <div  className="w-[90%] h-full pl-4 font-[500] focus:outline-0">
        <TextField sx={{
            padding: "0",
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none', // Removes the default outline
              },
              padding: "7px",  // Add padding here for the TextField
            },
          }}  {...params} placeholder='Search a drug'  />
             </div>
      )
    }
 
    />
  );
}

