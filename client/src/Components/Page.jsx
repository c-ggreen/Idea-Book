import React, { useState, useEffect } from "react";
import IdeaServices from "../Services/IdeaServices";
import {
  Button,
  Stack,
  Grid,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";

function Page() {
  // This hook array will hold the ideas in the database
  const [allIdeas, setAllIdeas] = useState([]);

  // Will hold the current idea you want to display
  const [currentIdeaTitle, setCurrentIdeaTitle] = useState("");
  const [currentIdeaText, setCurrentIdeaText] = useState("");

  // Function to make the GET API request
  const getIdeas = () => {
    IdeaServices.getIdea().then((res) => {
      setAllIdeas(res.data);
      console.log(res.data);
    });
  };

  // Function and Hooks to make POST API request
  // onClick of the add button a Dialog Modal appears where the user can add their inputs
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const submitIdea = () => {
    IdeaServices.postIdea({
      title: newTitle,
      text: newText,
    }).then((res) => {
      handleClose();
      console.log(res.data);
      getIdeas();
      displayIdea(newTitle, newText);
    });
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
    IdeaServices.deleteIdea(id).then((res) => {
      // This clears the screen on the right side as to show the delete effect.
      setCurrentIdeaTitle("");
      setCurrentIdeaText("");
      console.log(res.data);
      getIdeas();
    });
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

  return (
    <Grid container height="100vh">
      <Grid item xs={4}>
        <Stack spacing={2} height="90%" alignItems="center">
          <Typography variant="h5">Idea Book</Typography>
          {/* Displays the title of each idea item as a button */}
          {/* Also contains the Edit and Delete buttons for each post */}
          {allIdeas.map((item, i) => {
            return (
              <Grid container key={i}>
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
                  <Button
                    color="inherit"
                    onClick={() => {
                      setEditId(item.id);
                      defaultValue(item.title, item.text);
                      handleClickOpenEdit();
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    color="error"
                    onClick={() => {
                      deleteIdea(item.id);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </Grid>
              </Grid>
            );
          })}
        </Stack>
        {/* This button displays Dialog Modal where the user can create their idea entry */}
        <Button color="info" onClick={handleClickOpen}>
          <AddCircleIcon />
        </Button>
      </Grid>

      {/* This will be the space where the idea title and text display when the corresponding button is clicked */}
      <Grid item xs={7} textAlign="center">
        <Typography variant="h2" mb={4}>
          {currentIdeaTitle}
        </Typography>
        <Typography variant="body1">{currentIdeaText}</Typography>
      </Grid>

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
