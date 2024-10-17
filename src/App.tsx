import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Rxtable from "./Rxtable";
import Add_drugs from "./add_drugs/Add_drugs";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="font-bold h-full w-full">
              <Rxtable />
            </div>
          } 
        />
         <Route 
          path="/add_drugs" 
          element={
            <div className="font-bold h-full w-full">
            <Add_drugs/>
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
