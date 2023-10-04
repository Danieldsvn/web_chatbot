import { useContext } from 'react';
import MyContext from '../context/Context';


function ExportCSV() {
  const {histories} = useContext(MyContext);

  const handleButton = ({target}) => {
    console.log(target.value);
    console.log('button');
  }

  return (
    <div className='csv-page-container'>
      <h1>ExportCSV</h1><div className='csv-buttons'>
        {histories.map((history, index) => (
          <div key={index} className='csv-button'>
            <button onClick={handleButton}>Conversa {index + 1}</button>
          </div>
        ))}
      </div>
    </div>
  );

}

export default ExportCSV;
