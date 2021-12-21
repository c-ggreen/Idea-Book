import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
 
import { getIdeasAsync, addIdeasAsync } from "../Redux/ideaSlice";
import { useDispatch, useSelector } from "react-redux";
import { makeCurrentTitle, makeCurrentText, makeCurrentTimestamp } from "../Redux/generalSlice";
import {
  toggleNewModal,
  makeNewText,
  makeNewTitle,
} from "../Redux/modalSlices";
 
function NewPostModal(props) {
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.modal.new.status);
  const title = useSelector((state) => state.modal.new.title);
  const text = useSelector((state) => state.modal.new.text);
  const timestamp = useSelector((state) => state.general.current.timestamp)
 
 
  const handleNewToggle = () => {
    dispatch(toggleNewModal());
  };
 
  const submitIdea = () => {
    try {
      dispatch(
        addIdeasAsync({
          title: title,
          text: text,
        })
      ).then(() => {
        handleNewToggle();
        dispatch(getIdeasAsync());
        displayIdea(title, text, timestamp);
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
 
  const handleNewTitle = (e) => {
    dispatch(makeNewTitle(e.target.value));
  };
 
  const handleNewText = (e) => {
    dispatch(makeNewText(e.target.value));
  };
 
  const displayIdea = (title, text, timestamp) => {
    dispatch(makeCurrentTitle(title));
    dispatch(makeCurrentText(text));
    dispatch(makeCurrentTimestamp(timestamp))
  };
 
  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={modalStatus}
      onClose={handleNewToggle}
    >
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
        <Button onClick={handleNewToggle}>Cancel</Button>
        <Button onClick={submitIdea}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
 
export default NewPostModal;
 

