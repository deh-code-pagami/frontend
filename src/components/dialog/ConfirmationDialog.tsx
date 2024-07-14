import { DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import React from "react";
import Dialog from "./Dialog";

export default function ConfirmationDialog({ children, title, open, handleClose, onConfirm }: { children?: React.ReactNode, title: string, open: boolean, handleClose: () => void, onConfirm: () => void }) {
  return (
    <>
    <Dialog open={open} handleClose={handleClose} >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onConfirm}>Delete</Button>
        </DialogActions>
    </Dialog>
    </>
  )
}