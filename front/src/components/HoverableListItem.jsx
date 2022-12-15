import { Grid, IconButton, LinearProgress, ListItem, Typography } from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import TodoModifyDialog from "./TodoModifyDialog";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

const HoverableListItem = ({ todo, handleDelete, handleStatusChange, snack }) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const { updateStatus } = useSelector((state) => state.todo);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const toggleStatus = () => {
    const todoUpdated = {
      todo_text: todo.todo_text,
      todo_status: !todo.todo_status,
      todo_created_date: todo.created_date,
      id: todo.id,
      author: todo.author,
    };
    handleStatusChange(todoUpdated);
    snack("Task was updated successfully", "success");
  };

  const [open, setOpen] = React.useState(false);

  return (
    <ListItem
      sx={{
        width: "600px",
        backgroundColor: "white",
        boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        mb: 0.3,
        borderRadius: 1,
        cursor: "pointer",
        height: 50,
      }}
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
    >
      <Grid container display="flex" justifyContent="space-between" alignItems="center">
        <Grid item display="flex" alignItems="center" onClick={toggleStatus} width={450}>
          {todo.todo_status ? <CheckBoxIcon sx={{ mr: 3 }} color="success" /> : <CheckBoxOutlineBlankIcon sx={{ mr: 3 }} />}
          <Typography sx={{ textDecoration: todo.todo_status ? "line-through" : "none" }}>{todo.todo_text}</Typography>
        </Grid>
        {isHovering && (
          <Grid item>
            <IconButton onClick={() => setOpen(true)} sx={{ mr: 1, color: "#303030" }}>
              <ModeEditOutlineIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton onClick={() => handleDelete(todo.id)} sx={{ color: "#d11a2a" }}>
              <DeleteIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Grid>
        )}
      </Grid>
      {open && <TodoModifyDialog open={open} setOpen={setOpen} todo={todo} handleSave={handleStatusChange} snack={snack} />}
    </ListItem>
  );
};

export default HoverableListItem;
