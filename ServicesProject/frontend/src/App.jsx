import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CleaningForm from "./components/forms/CleaningForm";
import WorkerRegister from "./components/WorkerRegister";
import WorkerLogin from "./components/WorkerLogin";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import PlumbingForm from "./components/forms/PlumbingForm";
import ElectricalForm from "./components/forms/ElectricalForm"
import PaintingForm from "./components/forms/PaintingForm";
import CarpentryForm from "./components/forms/CarpentryForm";
import AdminDashboard from "./components/AdminDashboard"
import WorkerDashboard from "./components/WorkerDashboard"
import CustomerDashboard from "./components/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cleaning" element={<CleaningForm />} />
        <Route path="/workerregister" element={<WorkerRegister />} />
         <Route path="/workerlogin" element={<WorkerLogin />} />
          <Route path="/adminlogin" element={<AdminLogin/>} />
           <Route path="/adminsignup" element={<AdminSignup />} />


           <Route path="/plumbing" element={<PlumbingForm />} />
        
        <Route path="/electrical" element={<ElectricalForm />} />
       
        <Route path="/painting" element={<PaintingForm />} />
           <Route path="/carpentry" element={<CarpentryForm/>} />
           <Route path="/worker-dashboard" element={<WorkerDashboard/>} />
           <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

           <Route path="/admin/dashboard" element={<AdminDashboard/>} />




        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
