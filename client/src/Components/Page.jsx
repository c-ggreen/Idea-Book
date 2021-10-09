import React, { useState, useEffect } from "react";
import IdeaServices from "../Services/IdeaServices";
import {
  Button,
  ButtonGroup,
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
  // onClick of the add button a Modal or Text Area needs to appear where the user can add their inputs
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
    });
  };

  const handleNewTitle = (e) => {
    setNewTitle(e.target.value);
  };
  const handleNewText = (e) => {
    setNewText(e.target.value);
  };

  // Function to make DELETE API request
  const deleteIdea = (id) => {
    IdeaServices.deleteIdea(id).then((res) => {
      console.log(res.data);
      getIdeas();
    });
  };

  // Function that will display the current Idea on button click
  // For some reason when I use this it causes a multiple render issue
  // So I'm setting the values directly in the onClick function in the Button
  const displayIdea = (title, text) => {
    setCurrentIdeaTitle(title);
    setCurrentIdeaText(text);
  };

  // Makes the GET call on render
  useEffect(() => {
    getIdeas();
  }, []);

  // Handles the Dialog modal that appears onscreen for post creation
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container height="100vh">
      <Grid item xs={4}>
        <Stack spacing={2} height="90%">
          {/* Displays the titles each idea item as a button */}
          {/* Need to make it so that clicking on the button displays text */}
          {allIdeas.map((item, i) => {
            return (
              <Grid container>
                <Grid item xs={8}>
                  <Button
                    fullWidth={true}
                    key={i}
                    id={item.id}
                    title={item.title}
                    text={item.text}
                    onClick={() => {
                      setCurrentIdeaTitle(item.title);
                      setCurrentIdeaText(item.text);
                    }}
                  >
                    {item.title}
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    endIcon
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
        {/* This button displays an input area where the user can create their idea entry */}
        <Button onClick={handleClickOpen}>Add</Button>
      </Grid>
      {/* This will be the space where the idea title and text display when the button is clicked */}
      <Grid item xs={8} textAlign="center">
        <Typography variant="h2" mb={4}>
          {currentIdeaTitle}
        </Typography>
        <Typography variant="body1">{currentIdeaText}</Typography>
      </Grid>

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
    </Grid>
  );
}

export default Page;
