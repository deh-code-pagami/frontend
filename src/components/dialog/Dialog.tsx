import MuiDialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Dialog({
  children,
  open,
  handleClose,
}: {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <React.Fragment>
      <MuiDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="transaction-dialog"
      >
        {children}
      </MuiDialog>
    </React.Fragment>
  );
}
