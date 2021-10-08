import React, { useState, useEffect } from "react";
import IdeaServices from "../Services/IdeaServices";
import { Button, Stack, Grid, Typography } from "@mui/material";

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
  const[newTitle, setNewTitle]=useState("")
  const[newText, setNewText]=useState("")
  const submitIdea = () =>{
      IdeaServices.postIdea({
        title: newTitle,
        text: newText
      }).then((res)=>{
          console.log(res.data);
          getIdeas();
      })
  }

  // Function that will display the current Idea on button click
    // For some reason when I use this it causes a multiple render issue
        // So I'm setting the values directly in the onClick function in the Button
  const displayIdea = (title, text) =>{
    setCurrentIdeaTitle(title);
    setCurrentIdeaText(text);
  }

  // Makes the GET call on render
  useEffect(() => {
    getIdeas();
  }, []);

  return (
    
      <Grid container height="100vh">
        <Grid item xs={3}>
          <Stack spacing={2} height="90%">
            {/* Displays the titles each idea item as a button */}
            {/* Need to make it so that clicking on the button displays text */}
            {allIdeas.map((item, i) => {
              return (
                <Button
                  key={i}
                  id={item.id}
                  title={item.title}
                  text={item.text}
                  onClick={()=>{
                      setCurrentIdeaTitle(item.title)
                      setCurrentIdeaText(item.text)
                  }}
                >
                  {item.title}
                </Button>
              );
            })}
          </Stack>
          {/* This button will need to display an input area where the user can create their idea entry */}
          <Button>
              Add
          </Button>
        </Grid>
        {/* This will be the space where the idea title and text display when the button is clicked */}
        <Grid item xs={9} textAlign="center">
            
                <Typography variant="h2" mb={4}>{currentIdeaTitle}</Typography>
                <Typography variant="body1">{currentIdeaText}</Typography>
       
        </Grid>

        {/* <h1>Hello</h1> */}
      </Grid>

    
  );
}

export default Page;
