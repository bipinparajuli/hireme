import {BrowserRouter,Routes,Route} from 'react-router-dom'

import './App.css';
import Login from './pages/login'
import './styles/output.css'
import MainCompoment from './components/Maincomponent/MainComponent'
import JobListing from './pages/JobListing';

function App() {
  return (
    <MainCompoment>
    <Routes>
      <Route path="/" element={<JobListing />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </MainCompoment>

  );
}

export default App;
