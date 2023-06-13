import './index.scss';
import Calculator from './Components/Calculator/Calculator'
import { useState } from 'react';

function App() {

  const [fNumber, setFNumber] = useState(0);
  const [sNumber, setSNumber] = useState(0);
  const [sign, setSign] = useState('');
  const [result, setResult] = useState(0);

  return (
    <div className="App">
        <Calculator 
          result = {result}
          fNumber={fNumber}
          sNumber={sNumber}
          sign={sign}
          setResult = {setResult}
          setFNumber={setFNumber}
          setSNumber={setSNumber}
          setSign={setSign}
        />
    </div>
  );
}

export default App;
