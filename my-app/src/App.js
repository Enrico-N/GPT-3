
import './App.css';
import InputBox from './components/InputBox'
import PreviousResults from './components/PreviousResults';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <InputBox />
        <PreviousResults/>
      </header>
    </div>
  );
}

export default App;
