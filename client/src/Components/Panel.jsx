import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  Tooltip,
  Switch,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import UndoIcon from "@mui/icons-material/Undo";
import CancelIcon from "@mui/icons-material/Cancel";
import LogoutIcon from "@mui/icons-material/Logout";
// import Styling from "../Styles/PageStyles";
 
import { useDispatch, useSelector } from "react-redux";
import {
  getIdeasAsync,
  editIdeasAsync,
  deleteIdeasAsync,
} from "../Redux/ideaSlice";
import {
  toggleNewModal,
  toggleEditModal,
  makeEditId,
  makeEditTitle,
  makeEditText,
} from "../Redux/modalSlices";
import {
  makeCurrentTitle,
  makeCurrentText,
  makeCurrentTimestamp,
  makeDefaultTitle,
  makeDefaultText,
} from "../Redux/generalSlice";
import { makeUserEmail, makeLoggedIn } from "../Redux/userSlice";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
 
function Panel(props) {
  const dispatch = useDispatch();
  const allIdeas = useSelector((state) => state.ideas);
  const currentUser = useSelector((state) => state.user.email);
  const userInfo = useSelector((state) => state.user.userInfo)
// console.log("THIS IS THE USER INFO" + userInfo.email + userInfo.ideas);

  const signOut = () =>{
    auth.signOut().then(()=>{
      dispatch(makeUserEmail(""));
      dispatch(makeLoggedIn(false))
      alert("User signed out")
    })
  }
 
  const setEdit = (id, title, text, timestamp) => {
    dispatch(makeEditId(id));
    dispatch(makeEditTitle(title));
    dispatch(makeEditText(text));
    dispatch(makeCurrentTimestamp(timestamp));
  };
 
  // Function is important for grabbing information from API to use in codebase elsewhere ***************
  const displayIdea = (title, text, timestamp) => {
    dispatch(makeCurrentTitle(title));
    dispatch(makeCurrentText(text));
    dispatch(makeCurrentTimestamp(timestamp));
  };
 
  const defaultValue = (title, text) => {
    dispatch(makeDefaultTitle(title));
    dispatch(makeDefaultText(text));
  };
 
  // MODAL TOGGLES
  const handleNewToggle = () => {
    dispatch(toggleNewModal());
  };
  const handleEditToggle = () => {
    dispatch(toggleEditModal());
  };
 
  // DELETION HANDLING
  const [deletedSwitch, setDeletedSwitch] = useState(false);
  const handleSwitch = (e) => {
    setDeletedSwitch(e.target.checked);
  };
  const softDeleteIdea = (id, title, text, timestamp) => {
    try {
      dispatch(
        editIdeasAsync({
          id: id,
          title: title,
          text: text,
          timestamp: timestamp,
          active: false,
        })
      ).then(() => {
        console.log("Soft Delete");
        dispatch(makeCurrentTitle(""));
        dispatch(makeCurrentText(""));
        dispatch(makeCurrentTimestamp(""));
        dispatch(getIdeasAsync());
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };
  const undoDelete = (id, title, text, timestamp) => {
    try {
      dispatch(
        editIdeasAsync({
          id: id,
          title: title,
          text: text,
          timestamp: timestamp,
          active: true,
        })
      ).then(() => {
        console.log("Soft Undo");
        dispatch(makeCurrentTitle(""));
        dispatch(makeCurrentText(""));
        dispatch(makeCurrentTimestamp(""));
        dispatch(getIdeasAsync());
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };
  const deleteIdea = (id) => {
    try {
      dispatch(deleteIdeasAsync(id)).then(() => {
        // This clears the screen on the right side as to show the delete effect.
        dispatch(makeCurrentTitle(""));
        dispatch(makeCurrentText(""));
        dispatch(makeCurrentTimestamp(""));
        dispatch(getIdeasAsync());
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };
 
  // SEARCH HANDLING
  const [search, setSearch] = useState("");
  // Tracking user input
  const handleSearch = (e) => {
    // Have to make sure input is uniform, so I'm using .toLowerCase
    setSearch(e.target.value.toLowerCase());
  };
 


  return (
    <Grid item xs={4}>
      <Stack spacing={1} height="90%" alignItems="center">
        <Typography variant="h5">
          Idea Book
        </Typography>
        <Typography variant="caption">By Chadwick Green &copy;</Typography>
        <Typography variant="caption">Logged in as: {currentUser} </Typography>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          onChange={handleSearch}
        />
        {/* Conditional that displays Recently Deleted title when the switch is on */}
        {deletedSwitch && (
          <Typography variant="h6" color="red">
            RECENTLY DELETED
          </Typography>
        )}
        {/* Displays the title of each idea item as a button */}
        {/* Also contains the Edit and Delete buttons for each post */}
        {allIdeas?.map((item, i) => {
          // Conditional that only renders items that have been marked for deletion when switch is on
          if (!item.active && deletedSwitch) {
            return (
              <Grid
                container
                key={i}
                style={{
                  display:
                    item.title.toLowerCase().includes(search) ||
                    item.text.toLowerCase().includes(search)
                      ? "inherit"
                      : "none",
                }}
              >
                <Grid item xs={8}>
                  <Button
                    color="inherit"
                    fullWidth={true}
                    key={i}
                    id={item.id}
                    title={item.title}
                    text={item.text}
                    onClick={() => {
                      displayIdea(item.title, item.text, item.timestamp);
                    }}
                  >
                    {item.title}
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Tooltip title="Undo">
                    <Button
                      color="inherit"
                      onClick={() => {
                        undoDelete(item.id, item.title, item.text, item.timestamp);
                      }}
                    >
                      <UndoIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Button
                      color="error"
                      onClick={() => {
                        deleteIdea(item.id);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            );
          }
          // SHOWS THE ACTIVE, NOT DELETED IDEAS WHEN SWITCH IS OFF
          else if (item.active && !deletedSwitch) {
            return (
              <Grid
                container
                key={i}
                style={{
                  display:
                    item.title.toLowerCase().includes(search) ||
                    item.text.toLowerCase().includes(search)
                      ? "inherit"
                      : "none",
                }}
              >
                <Grid item xs={8}>
                  <Button
                    color="inherit"
                    fullWidth={true}
                    key={i}
                    id={item.id}
                    title={item.title}
                    text={item.text}
                    onClick={() => {
                      displayIdea(item.title, item.text, item.timestamp);
                    }}
                  >
                    {item.title}
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Tooltip title="Edit">
                    <Button
                      color="inherit"
                      onClick={() => {
                        // Setting the Edit title and text here fixes a bug that would occur when edits weren't made to both the title and text
                        // New posts were most affected because making an edit to one of them without changing both fields would result in one of the fields reverting to a previous posts title
                        // This is because the state of the editTitle and editText values will only update when the text in the inputs when they are CHANGED, not just because they load up
                        // Therefore, the state of those variables needs to be updated whenever the Edit button is clicked
                        setEdit(item.id, item.title, item.text, item.timestamp);
                        defaultValue(item.title, item.text);
                        handleEditToggle();
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Move to Trash">
                    <Button
                      color="error"
                      onClick={() => {
                        softDeleteIdea(item.id, item.title, item.text, item.timestamp);
                      }}
                    >
                      <CancelIcon />
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            );
          } else {
            return null;
          }
        })}
      </Stack>
      <Stack direction="row" justifyContent="space-around">
        {/* This button displays Dialog Modal where the user can create their idea entry */}
        <Button color="info" onClick={handleNewToggle}>
          <AddCircleIcon />
        </Button>
 
        {/* This button displays the Dialog Model where the user can see all their deleted ideas */}
        <FormControlLabel
          value="start"
          control={
            <Switch
              color="error"
              checked={deletedSwitch}
              onChange={handleSwitch}
            />
          }
          label="Recently Deleted"
          labelPlacement="start"
        />
        <Tooltip title="Log Out">
          <Link to="/">
            <Button color="error" onClick={() => signOut()}>
              <LogoutIcon />
            </Button>
          </Link>
        </Tooltip>
      </Stack>
    </Grid>
  );
}
 
export default Panel;
 

