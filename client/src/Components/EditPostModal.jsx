import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { getIdeasAsync, editIdeasAsync } from "../Redux/ideaSlice";
import { useDispatch, useSelector } from "react-redux";
import { makeCurrentTitle, makeCurrentText } from "../Redux/generalSlice";
import {
  toggleEditModal,
  makeEditTitle,
  makeEditText,
} from "../Redux/modalSlices";
 
function EditPostModal(props) {
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.modal.edit.status);
  const title = useSelector((state) => state.modal.edit.title);
  const text = useSelector((state) => state.modal.edit.text);
  const id = useSelector((state) => state.modal.edit.id);
  const defaultTitle = useSelector((state) => state.general.default.title);
  const defaultText = useSelector((state) => state.general.default.text);
 
  const handleEditToggle = () => {
    dispatch(toggleEditModal());
  };
 
  const editIdea = () => {
    try {
      dispatch(
        editIdeasAsync({
          id: id,
          title: title,
          text: text,
        })
      ).then(() => {
        handleEditToggle();
        dispatch(getIdeasAsync());
        displayIdea(title, text);
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
 
  const handleTitleEdit = (e) => {
    dispatch(makeEditTitle(e.target.value));
  };
 
  const handleTextEdit = (e) => {
    dispatch(makeEditText(e.target.value));
  };
 
  const displayIdea = (title, text) => {
    dispatch(makeCurrentTitle(title));
    dispatch(makeCurrentText(text));
  };
 
  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={modalStatus}
      onClose={handleEditToggle}
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
        <Button onClick={handleEditToggle}>Cancel</Button>
        <Button onClick={editIdea}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
 
export default EditPostModal;
 

