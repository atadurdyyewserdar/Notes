import { Button, Checkbox, Dialog, DialogActions, DialogContent, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";

const TodoModifyDialog = ({ open, setOpen, todo, handleSave, snack }) => {
  const [todoText, setTodoText] = React.useState("");
  const [createdDate, setCreatedDate] = React.useState(todo.todo_created_date);
  const [todoStatus, setTodoStatus] = React.useState(todo.todo_status);
  const resetAndClose = () => {
    setTodoText("");
    setCreatedDate("");
    setOpen(false);
  };

  const handleUpdate = () => {
    const todoUpdated = {
      todo_text: todoText,
      todo_status: todoStatus,
      todo_created_date: createdDate,
      id: todo.id,
      author: todo.author,
    };
    console.log("updated", todoUpdated);
    handleSave(todoUpdated);
    snack("Task was updated successfully", "success");
    resetAndClose();
  };

  useEffect(() => {
    setTodoText(todo.todo_text);
    // setCreatedDate(todo.todo_created_date);
  }, [open]);

  return (
    <Dialog open={open} maxWidth="xs" fullWidth={true} hideBackdrop={false} disableEscapeKeyDown>
      <DialogContent>
        <Typography>Modify</Typography>
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
          <Grid item alignItems="center" sx={{ mb: 2, mt: 2 }}>
            <Grid item>
              <Typography>Created on:</Typography>
            </Grid>
            <Grid item>
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                value={createdDate}
                inputProps={{ style: { fontSize: 15 } }}
                sx={{ backgroundColor: "#f5f5f5", width: 300 }}
                fullWidth={true}
                // onChange={(event) => setCreatedDate(event.target.value)}
                disabled
              />
            </Grid>
          </Grid>
          <Grid item alignItems="center" sx={{ mb: 2, mt: 2 }} display="flex">
            <Grid item>
              <Typography>Status:</Typography>
            </Grid>
            <Grid item display="flex" alignItems="center">
              <Checkbox color="success" checked={todoStatus} onChange={(e) => setTodoStatus(e.target.checked)} />
              {todoStatus && <Typography>Done</Typography>}
              {!todoStatus && <Typography>In progress</Typography>}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pt: 3 }}>
        <Button sx={{ width: 70, textTransform: "none" }} variant="outlined" disableElevation onClick={() => resetAndClose()} size="small">
          Cancel
        </Button>
        <Button sx={{ width: 70, textTransform: "none" }} variant="contained" disableElevation size="small" onClick={handleUpdate}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoModifyDialog;
