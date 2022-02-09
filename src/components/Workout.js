import axios from "axios";
import {useEffect, useState} from "react";
import Collapsible from 'react-collapsible';

const Workout = () => {

    const [exercises, setExercises] = useState([]);
    const [workoutHistory, setWorkoutHistory] = useState([]);
    
    const shuffle = (exercises) => {
        let currentIndex = exercises.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [exercises[currentIndex], exercises[randomIndex]] = [
                exercises[randomIndex], exercises[currentIndex]
            ];
        }
        return exercises
    }

    const lessThan24Hours = (timeStamp) => {
        const then = new Date(timeStamp);
        const now = new Date();
    
        const msBetweenDates = Math.abs(then.getTime() - now.getTime());
    
        // 👇️ convert ms to hours                  min  sec   ms
        const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
    
        console.log(hoursBetweenDates);
    
        if (hoursBetweenDates < 24) {
            return true
        // console.log('date is within 24 hours');
        } else {
            return false
        // console.log('date is NOT within 24 hours');
        }
    }

    useEffect(() => {
        const fetchExercises = () => {
            var options = {
                method: 'GET',
                url: 'https://exercisedb.p.rapidapi.com/exercises/',
                headers: {
                    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                    'x-rapidapi-key': `${process.env.REACT_APP_KEY}`
                }
            };
            
            axios.request(options).then(function (response) {
                shuffle(response.data);
                const workout = response.data.slice(0,5)
                setExercises(workout);
                // localStorage.setItem('dailyWorkout', JSON.stringify(workout));
                console.log(response.data);
    
            }).catch(function (error) {
                console.error(error);
            });
            // localStorage.setItem('timeStamp', new Date().toLocaleString())
        }
        const timeStamp = localStorage.getItem('timeStamp')
        const dailyWorkout = JSON.parse(localStorage.getItem('dailyWorkout') || "[]")

        if (timeStamp && dailyWorkout.length > 0) {
            if (lessThan24Hours(timeStamp)) {
                setExercises(dailyWorkout)
                console.log('been less than 24 hours')
            }  
            else {
                fetchExercises();
            }
            console.log(timeStamp)
            console.log('dailyWorkout', dailyWorkout)
        }
        else {
            fetchExercises();
        }

    }, []);

    const completeButton = () => {
        // setWorkoutHistory(exercises);
        // save workout to back end
    }

    return (
        <section>
            {exercises.map((exercise) => {
                return (
                    <Collapsible trigger={exercise.name} key={exercise.id}>
                    <img src={exercise.gifUrl} alt=''/>
                    </Collapsible>
                )
            })}

            {/* {exercises.filter(exercise => exercise.includes('abs')).map(absExercise => {
                return (
                <li>{absExercise}</li>)
            })} */}
        <button onClick={completeButton}>Workout Complete!</button>
        </section>
    )
}

export default Workout;