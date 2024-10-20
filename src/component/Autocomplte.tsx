import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import "./auto.css"


import { drug } from "../../src/stores/drug.tsx";
import { useBookStore } from '../stores/rx.tsx';
const filter = createFilterOptions();
interface drug_list{
    id: number;
    name: string;
    isactive: boolean;
    drug_type:"tablet" | "sirap"
  }
 
export default function FreeSoloCreateOption({id}:{id:number}) {
    const [textfiels_value,settextfiels_value]=React.useState("")
    const handletextfieldchange=(event:any)=>{
        settextfiels_value(event.target.value)
    
    }
  const [value, setValue] = React.useState<any>(null);
  setValue(null)
  const drug_data = drug((state) => state.drug_list);
  const add_drug=useBookStore((state)=>state.add_drug)
  const handleSelectionChange = (event:any, value:drug_list) => {
  
    if (value) {
  
      
    }
    add_drug(value,id)
 settextfiels_value("")
 event.target.value=''
  };
  
  return (
    <Autocomplete
  
      value={value}
      onChange={
        handleSelectionChange
        // if (typeof newValue === 'string') {
        //   setValue({
        //     name: newValue,
        //   });
        // } else if (newValue && newValue.inputValue) {
        //   // Create a new value from the user input
        //   setValue({
        //     name: newValue.inputValue,
        //   });
        // } else {
        //   setValue(newValue);
        // }
      }
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
        console
      
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
        <TextField value={textfiels_value} onChange={(e)=>{
            handletextfieldchange(e)
        }} sx={{
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

