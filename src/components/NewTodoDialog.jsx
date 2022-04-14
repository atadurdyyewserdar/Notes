import { Button, Dialog, DialogActions, DialogContent, Grid, TextField, Typography } from "@mui/material";
import React from "react";

const NewTodoDialog = ({ open, setOpen, handleSave }) => {
  const [todoText, setTodoText] = React.useState("");

  const resetAndClose = () => {
    setTodoText("");
    setOpen(false);
  };

  const handleAdd = () => {
    const date = new Date();
    const str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDay();
    const newTodo = {
      todo_text: todoText,
      todo_status: false,
      todo_created_date: str,
    };
    handleSave(newTodo);
    resetAndClose();
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth={true} hideBackdrop={false} disableEscapeKeyDown>
      <DialogContent>
        <Typography>New Todo</Typography>
        <Grid container display="flex" flexDirection="column">
          <Grid item alignItems="center" sx={{ mb: 2, mt: 2 }}>
            <Grid item>
              <Typography>Text</Typography>
            </Grid>
            <Grid item>
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                value={todoText}
                inputProps={{ style: { fontSize: 15 } }}
                sx={{ backgroundColor: "#f5f5f5", width: 300 }}
                fullWidth={true}
                onChange={(event) => setTodoText(event.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pt: 3 }}>
        <Button sx={{ width: 70, textTransform: "none" }} variant="outlined" disableElevation onClick={() => resetAndClose()} size="small">
          Cancel
        </Button>
        <Button sx={{ width: 70, textTransform: "none" }} variant="contained" disableElevation size="small" onClick={handleAdd}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTodoDialog;
