import "./App.css";
import { ClassesApp } from "./features/classes-app/classes-app.feature";
import Navbar from "./features/classes-app/components/navbar/navbar.component";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StudentsScreen } from "./features/classes-app/screens/students.screen";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ClassesApp />} />
          <Route path="/class/:classId" element={<StudentsScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
