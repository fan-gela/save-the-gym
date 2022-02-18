import './App.css';
import Workout from './components/Workout.js'

function App() {

  return (
    <section>
    <div className="title">
      <p>Today's Workout</p>
      {/* <a href="">Workout Complete</a> */}
    </div>
    <section className="grid">
        <div className="box">
        <Workout />
        </div>
      </section>
    </section>
  );
}

export default App;