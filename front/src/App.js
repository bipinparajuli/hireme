import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { NotificationsProvider } from '@mantine/notifications';


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
import Wallet from './pages/Wallet';
import Applications from './pages/Applications';
import Success from './components/Success';
import ResetPasswordEmail from './pages/ResetPasswordEmail';

function App() {
  return (
    <NotificationsProvider>

    <MainCompoment className="prose lg:prose-x">

    <Routes>
      <Route path="/" element={<JobListing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password/:id" element={<ResetPassword />} />
      <Route path="/resetpassword" element={<ResetPasswordEmail />} />

      <Route
          path="/postjob"
          element={
            <Employer>
              <PostJob />
            </Employer>
          }
        />

        <Route
          path="/wallet"
          element={
            // <Employer>
              <Wallet />
            // </Employer>
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
        <Route
          path="/applications"
          element={
            <Employee>
              <Applications />
            </Employee>
          }
        />
      <Route path="/register" element={<Register />} />


    </Routes>

    </MainCompoment>
    </NotificationsProvider>


  );
}

export default App;
