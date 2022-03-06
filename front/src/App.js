import {BrowserRouter,Routes,Route} from 'react-router-dom'

import './App.css';
import Login from './pages/login'
import './styles/output.css'
import MainCompoment from './components/Maincomponent/MainComponent'
import JobListing from './pages/JobListing';
import Register from './pages/Register'
import Employee from './routes/Employee';
import Employer from './routes/Employer';
import PostJob from './pages/PostJob';
import Jobs from './pages/Jobs';
import ResetPassword from './pages/ResetPassword';
import Purposal from './pages/Purposal';
import Profile from './pages/Profile';

function App() {
  return (
    <MainCompoment>
    <Routes>
      <Route path="/" element={<JobListing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/resetpassword" element={<ResetPassword />} />

      <Route
          path="/postjob"
          element={
            <Employer>
              <PostJob />
            </Employer>
          }
        />
        <Route
          path="/projects"
          element={
            <Employer>
              <Jobs />
            </Employer>
          }
        />
        <Route
          path="/purposal/:id"
          element={
            <Employer>
              <Purposal />
            </Employer>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <Employer>
              <Profile />
            </Employer>
          }
        />

        <Route
          path="/applyjob"
          element={
            <Employee>
              <Jobs />
            </Employee>
          }
        />
      <Route path="/register" element={<Register />} />


    </Routes>
    </MainCompoment>

  );
}

export default App;
