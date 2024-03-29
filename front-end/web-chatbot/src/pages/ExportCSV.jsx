import { useContext } from 'react';
import MyContext from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import '../styles/ExportCSV.css';

function ExportCSV() {
  const {histories} = useContext(MyContext);  
  const navigate = useNavigate();
  
  const exportToCSV = (csvString, fileName) => {      
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });  
    
    saveAs(blob, fileName);
  }

  const handleSaveCSV = ({target}) => {    
    const {name} = JSON.parse(localStorage.getItem('user'));
    
    const conversationNumber = parseInt(target.id) + 1;
    
    exportToCSV(histories[target.id], `${name}-conversation-${conversationNumber}.csv` );
  }

  return (
    <div className='csv-page-container'>
      <h1>ExportCSV</h1>
      <div className='csv-all-conversations'>
        {histories.length > 0 ? histories.map((history, index) => (
          <div key={index} className='csv-conversation'>
            <h2>Conversation {index + 1}</h2>
            <p>{history}</p>
            <button
              id={index}
              onClick={handleSaveCSV}
              className="export-button"
            >
              Exports to CSV
            </button>
          </div>
        )) : <h2>historic not found</h2> }
      </div>      
      <button
       onClick={() => navigate('/')}
       className="chatbot-button"
      >
        Go to Chatbot
      </button>
    </div>
  );

}

export default ExportCSV;
