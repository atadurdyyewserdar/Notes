import { Box, Button, CircularProgress, Grid, IconButton, LinearProgress, Pagination, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import HoverableListItem from "../components/HoverableListItem";
import { addNewTodo, changeStatus, deleteTodo, fetchTodos, pageUpdate } from "../redux/todoSlice";
import NewTodoDialog from "../components/NewTodoDialog";
import { useSnackbar } from "notistack";
import SearchIcon from "@mui/icons-material/Search";

export default function HomePage() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { todos, status, updateStatus, page, count } = useSelector((state) => state.todo);
  const [open, setOpen] = React.useState(false);

  const handleDelete = (id) => {
    dispatch(deleteTodo({ id }));
    const variant = "error";
    enqueueSnackbar("Task deleted successfully", { variant });
  };

  const handleStatusChange = (todo) => {
    console.log("dispatching", todo);
    dispatch(changeStatus(todo));
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
    dispatch(fetchTodos({ page }));
  }, [dispatch, navigate, isAuth, page, count]);

  const add = (todoM) => {
    dispatch(addNewTodo(todoM));
    const variant = "success";
    enqueueSnackbar("Task addedd", { variant });
  };

  const addSnack = (message, variant) => {
    setTimeout(() => {
      enqueueSnackbar(message, { variant });
    }, 500);
  };

  const setOpenF = () => {
    setOpen(false);
  };

  const handlePageSelection = (event, pg) => {
    dispatch(pageUpdate(pg));
  };

  const handleSearch = () => {
      
  }

  const [searchText, setSearchText] = React.useState("")

  return status === "loading" ? (
    <CircularProgress />
  ) : (
    <Box width="100%" display="flex" alignItems="center" marginTop={6} justifyContent="center" flexDirection="column">
      <Grid
        sx={{
          width: "600px",
          height: "50px",
          mb: 1.5
        }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid>
          <Button onClick={() => setOpen(true)} sx={{ borderRadius: 4 }} variant="contained">
            New
          </Button>
        </Grid>
        <Grid>
          <TextField
            hiddenLabel
            variant="outlined"
            size="small"
            value={searchText}
            inputProps={{ style: { fontSize: 15 } }}
            sx={{
              backgroundColor: "#f5f5f5",
              width: 300,
              ".MuiOutlinedInput-root": { borderRadius: 5 },
            }}
            fullWidth={true}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Type to search..."
          />
          <IconButton
            sx={{ borderRadius: 4, backgroundColor: "royalblue", color: "white", ml: 2, ":hover": { backgroundColor: "#186ec4" } }}
            onClick={handleSearch}
          >
            <SearchIcon color="white" />
          </IconButton>
        </Grid>
      </Grid>
      {updateStatus === "loading" && (
        <Box sx={{ width: "600px" }}>
          <LinearProgress />
        </Box>
      )}
      <Grid>
        {todos.map((item, index) => (
          <HoverableListItem key={index} todo={item} handleDelete={handleDelete} handleStatusChange={handleStatusChange} snack={addSnack} />
        ))}
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <Pagination page={page} count={count} color="primary" onChange={handlePageSelection} />
      </Grid>
      <NewTodoDialog open={open} setOpen={setOpenF} handleSave={add} />
    </Box>
  );
}
