import "./App.css";
import Page from "./Components/Page";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";


 
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/page" element={<Page/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
 
export default App;
 

