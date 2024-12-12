import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainComponent from './components/MainComponent';
import AsideComponent from './components/AsideComponent';
import ChatComponent from './components/ChatComponent';
import ResirvationComponent from './components/ResirvationComponent';


function App() {
  return (
    <div>
      <Router>
          <HeaderComponent/>
          <AsideComponent/>
            <Routes>
              <Route path='/'  element={<MainComponent/>}></Route>
              <Route path='/chat'  element={<ChatComponent/>}></Route>
              <Route path='/resirvation'  element={<ResirvationComponent/>}></Route>

            </Routes>
          <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;
