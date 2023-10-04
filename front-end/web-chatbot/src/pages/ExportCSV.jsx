import { useContext } from 'react';
import MyContext from '../context/Context';
import { useNavigate } from 'react-router-dom';

function ExportCSV() {
  const {histories} = useContext(MyContext);  
  const navigate = useNavigate();
  
  return (
    <div className='csv-page-container'>
      <h1>ExportCSV</h1>
      <div className='csv-all-conversations'>
        {histories.map((history, index) => (
          <div key={index} className='csv-conversation'>
            <h2>Conversation {index + 1}</h2>
            <p>{history}</p>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/')}>Go to Chatbot</button>
    </div>
  );

}

export default ExportCSV;
