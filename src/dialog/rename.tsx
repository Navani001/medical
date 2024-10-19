import * as React from 'react';

import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';


import Renamecontent from '../dialogcontent/Renamecontent';


export default function Rename({header,set_show_notu,rename_id,func_tobe_exe}:{header:string,set_show_notu:(value:boolean)=>void,rename_id:number,func_tobe_exe:any}) {
  const [open, setOpen] = React.useState(true);



  

  const handleClose = () => {
    set_show_notu(false)
    setOpen(false);
  };
const h="270px";
  return (
    <React.Fragment>
      <Dialog
       
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'md'}
        sx={{
            "& .MuiDialogContent-root": {
              padding: 0,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            },
            "& .MuiDialogActions-root": {
              padding: 0,
            },
            "& .MuiPaper-root": {
              width: "650px",
              height: h,
            },
          }}        
        aria-labelledby="responsive-dialog-title">
       
        <DialogContent >
        
          <Renamecontent header={header} set_show_notu={set_show_notu} rename_id={rename_id} func_tobe_exe={func_tobe_exe}/>
          
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}