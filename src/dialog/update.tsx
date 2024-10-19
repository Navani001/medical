import * as React from "react";

import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";



import CloseIcon from "@mui/icons-material/Close";

export default function Update({
  set_show_notu,header,h
}: {
  set_show_notu: (value: boolean) => void,
  header:string,h:string
}) {
  const [open, setOpen] = React.useState(true);
  




  const handleClose = () => {
    set_show_notu(false);
    setOpen(false);
  };
 
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
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
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <div className="h-full w-full flex flex-col justify-between items-start">
            <div className="w-full h-16 flex justify-between items-center border-b-2 border-gr">
              <div className="h-full w-[90%] flex justify-start items-center font-bold pl-6">
                {header}
              </div>
              <div className="h-full w-[10%] flex justify-center items-center">
                <CloseIcon />
              </div>
            </div>

            <div className="w-full h-[70%] flex">{
              //body
              }</div>
            <div className="w-full h-16 flex justify-center items-center justify-items-end">
              <div className="h-full w-[93%] flex justify-end">
                <div className="h-full w-2/6 flex justify-between items-center">
                  <div
                    className="h-full w-[50%] flex justify-center items-center border-2 rounded-lg border-p_green text-p_green"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Cancel
                  </div>
                  <div className="h-full w-[40%] flex justify-center items-center border-2 bg-p_green rounded-lg text-white">
                    Save
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
