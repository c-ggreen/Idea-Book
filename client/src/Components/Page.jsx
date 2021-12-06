import React, { useState, useEffect } from "react";
import IdeaServices from "../Services/IdeaServices";
import Styling from "../Styles/PageStyle";
import {
  Button,
  Stack,
  Grid,
  Typography,
  TextField,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import UndoIcon from "@mui/icons-material/Undo";
import CancelIcon from "@mui/icons-material/Cancel";
import View from "./View";
 
function Page() {
  // This hook array will hold the ideas in the database
  const [allIdeas, setAllIdeas] = useState([]);
 
  // DELETION HANDLING
  const [deletedSwitch, setDeletedSwitch] = useState(false);
  const handleSwitch = (e) => {
    setDeletedSwitch(e.target.checked);
  };
  const softDeleteIdea = (id, title, text) => {
    try {
      IdeaServices.patchIdea({
        id: id,
        title: title,
        text: text,
        active: false,
      }).then((res) => {
        console.log(res.data + "Soft Delete");
        getIdeas();
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
  const undoDelete = (id, title, text) => {
    try {
      IdeaServices.patchIdea({
        id: id,
        title: title,
        text: text,
        active: true,
      }).then((res) => {
        console.log(res.data + "Soft Undo");
        getIdeas();
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
 
  // Will hold the current idea you want to display
  const [currentIdeaTitle, setCurrentIdeaTitle] = useState("");
  const [currentIdeaText, setCurrentIdeaText] = useState("");
 
  // Function to make the GET API request
  const getIdeas = () => {
    try {
      IdeaServices.getIdea().then((res) => {
        setAllIdeas(res.data);
        console.log(res.data);
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
 
  // Function and Hooks to make POST API request
  // onClick of the add button a Dialog Modal appears where the user can add their inputs
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const submitIdea = () => {
    try {
      IdeaServices.postIdea({
        title: newTitle,
        text: newText,
      }).then((res) => {
        handleClose();
        console.log(res.data);
        getIdeas();
        displayIdea(newTitle, newText);
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
 
  // Handlers for the input values entered into the Dialog Model when making a new post
  const handleNewTitle = (e) => {
    setNewTitle(e.target.value);
  };
  const handleNewText = (e) => {
    setNewText(e.target.value);
  };
 
  // Function and Hooks to make PATCH API request
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");
  // Takes in item ID as an identifier when edit button is clicked
  const [editId, setEditId] = useState("");
  const editIdea = () => {
    try {
      IdeaServices.patchIdea({
        id: editId,
        title: editTitle,
        text: editText,
      }).then((res) => {
        handleCloseEdit();
        console.log(res.data);
        getIdeas();
        displayIdea(editTitle, editText);
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
 
  // Handlers for the input values entered into the Dialog Model when making an EDIT
  const handleTitleEdit = (e) => {
    setEditTitle(e.target.value);
  };
  const handleTextEdit = (e) => {
    setEditText(e.target.value);
  };
 
  // Will hold the default values of the EDIT dialog modal when edit button is clicked so the text and title of the post selected appears in input fields
  const [defaultTitle, setDefaultTitle] = useState("");
  const [defaultText, setDefaultText] = useState("");
  const defaultValue = (title, text) => {
    setDefaultTitle(title);
    setDefaultText(text);
  };
 
  // Function to make DELETE API request
  const deleteIdea = (id) => {
    try {
      IdeaServices.deleteIdea(id).then((res) => {
        // This clears the screen on the right side as to show the delete effect.
        setCurrentIdeaTitle("");
        setCurrentIdeaText("");
        console.log(res.data);
        getIdeas();
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
 
  // Function that will display the current Idea on button click
  const displayIdea = (title, text) => {
    setCurrentIdeaTitle(title);
    setCurrentIdeaText(text);
  };
 
  // Makes the GET call on render
  useEffect(() => {
    getIdeas();
  }, []);
 
  // Handles the Dialog modal that appears onscreen for POST creation
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // Handles the Dialog modal that appears onscreen for PATCH creation
  const [openEdit, setOpenEdit] = useState(false);
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
 
  // SEARCH FUNCTIONALITY
  const [search, setSearch] = useState("");
  // Tracking user input
    // Have to make sure input is uniform, so I'm using .toLowerCase
  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
   
  };
 
  return (
    <Grid container height="100vh">
      <Grid item xs={4}>
        <Stack spacing={1} height="90%" alignItems="center">
          <Typography variant={Styling.typography.variant.h5}>Idea Book</Typography>
          <Typography variant="caption">By Chadwick Green &copy;</Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Search"
            variant="outlined"
            size="small"
            onChange={handleSearch}
          />
          {/* Conditional that displays recently deleted items when the switch is on */}
          {deletedSwitch && (
            <Typography variant="h6" color="red">
              RECENTLY DELETED
            </Typography>
          )}
          {/* Displays the title of each idea item as a button */}
          {/* Also contains the Edit and Delete buttons for each post */}
          {allIdeas.map((item, i) => {
            // Conditional that only renders items that have been marked for deletion when switch is on
            if (!item.active && deletedSwitch) {
              return (
                <Grid container key={i} style={{
                  display: item.title.toLowerCase().includes(search) || item.text.toLowerCase().includes(search) ? 'inherit' : 'none'
                }}>
                  <Grid item xs={8}>
                    <Button
                      color="inherit"
                      fullWidth={true}
                      key={i}
                      id={item.id}
                      title={item.title}
                      text={item.text}
                      onClick={() => {
                        displayIdea(item.title, item.text);
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
                          undoDelete(item.id, item.title, item.text);
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
                <Grid container key={i} style={{
                  display: item.title.toLowerCase().includes(search) || item.text.toLowerCase().includes(search) ? 'inherit' : 'none'
                }}>
                  <Grid item xs={8}>
                    <Button
                      color="inherit"
                      fullWidth={true}
                      key={i}
                      id={item.id}
                      title={item.title}
                      text={item.text}
                      onClick={() => {
                        displayIdea(item.title, item.text);
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
                          setEditId(item.id);
                          // Setting the Edit title and text here fixes a bug that would occur when edits weren't made to both the title and text
                          // New posts were most affected because making an edit to one of them without changing both fields would result in one of the fields reverting to a previous posts title
                          // This is because the state of the editTitle and editText values will only update when the text in the inputs when they are CHANGED, not just because they load up
                          // Therefore, the state of those variables needs to be updated whenever the Edit button is clicked
                          setEditTitle(item.title);
                          setEditText(item.text);
                          defaultValue(item.title, item.text);
                          handleClickOpenEdit();
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Move to Trash">
                      <Button
                        color="error"
                        onClick={() => {
                          softDeleteIdea(item.id, item.title, item.text);
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
        {/* This button displays Dialog Modal where the user can create their idea entry */}
        <Button color="info" onClick={handleClickOpen}>
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
      </Grid>
 
      {/* This will be the space where the idea title and text display when the corresponding button is clicked */}
      <View currentIdeaTitle={currentIdeaTitle}
        currentIdeaText={currentIdeaText}
      />
 
      {/* The Dialog Modal that will handle new posts */}
      <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNewTitle}
          />
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Text"
            multiline
            rows={12}
            margin="normal"
            onChange={handleNewText}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitIdea}>Submit</Button>
        </DialogActions>
      </Dialog>
 
      {/* The Dialog Modal that will handle EDIT posts */}
      {/* When modal appears it should already have text in the input fields */}
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={defaultTitle}
            onChange={handleTitleEdit}
          />
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Text"
            multiline
            rows={12}
            margin="normal"
            defaultValue={defaultText}
            onChange={handleTextEdit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={editIdea}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
 
export default Page;
 

