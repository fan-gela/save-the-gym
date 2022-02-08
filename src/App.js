import logo from './logo.svg';
import './App.css';
import Workout from './components/Workout.js'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Turtle</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <Workout />
      </header>
      {/* <section>
        <Workout />
      </section> */}
    </div>
  );
}

export default App;