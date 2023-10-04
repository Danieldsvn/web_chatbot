import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ChatbotApp from './pages/ChatbotApp.jsx';
import ExportCSV from './pages/ExportCSV.jsx';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <ChatbotApp/> } />
          <Route path="/csv" element={ <ExportCSV/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
