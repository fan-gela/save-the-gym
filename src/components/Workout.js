// import axios from "axios";
import {useEffect, useState} from "react";
import Collapsible from 'react-collapsible';
import turtle from '../giphy.gif';
// import firebase from "./Firebase";

const Workout = () => {

    const [exercises, setExercises] = useState([]);
    // const [absExercise, setAbsExercise] = useState([]);
    // const [glutesExercise, setGlutesExercise] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [workoutHistory, setWorkoutHistory] = useState([]);
    // const [currentWorkout, setCurrentWorkout] = useState([]);

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
// const ref = firebase.firestore().collection("workouts")
        
    useEffect(() => {
        setLoading(true);

        // const fetchAbsExercise = () => {
        //     var axios = require("axios").default;
        //     var options = {
        //         method: 'GET',
        //         url: 'https://exercisedb.p.rapidapi.com/exercises/target/abs',
        //         headers: {
        //         'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        //         'x-rapidapi-key': '4a767cae3amsh9d88b09eecd14a1p163fa3jsnf735746c1732'
        //     }
        //     };
            
        //     axios.request(options).then(function (response) {
        //         shuffle(response.data);
        //         const absExercise = response.data.slice(0, 1);
        //         setAbsExercise(absExercise);
        //         // console.log(response.data);
        //     }).catch(function (error) {
        //         console.error(error);
        //     });
        // }

        // const fetchGlutesExercise = async () => {
        //     var axios = require("axios").default;
        //     var options = {
        //     method: 'GET',
        //     url: 'https://exercisedb.p.rapidapi.com/exercises/target/glutes',
        //     headers: {
        //         'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        //         'x-rapidapi-key': '4a767cae3amsh9d88b09eecd14a1p163fa3jsnf735746c1732'
        //     }
        //     };

        //     await axios.request(options).then(function (response) {
        //         shuffle(response.data);
        //         const glutesExercise = response.data.slice(0,1);
        //         setGlutesExercise(glutesExercise);
        //         // console.log(response.data);
        //     }).catch(function (error) {
        //         console.error(error);
        //     });
        // }
        
        const fetchExercises = () => {
            var axios = require("axios").default;

            var options = {
                method: 'GET',
                url: 'https://exercisedb.p.rapidapi.com/exercises',
                headers: {
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                'x-rapidapi-key': '4a767cae3amsh9d88b09eecd14a1p163fa3jsnf735746c1732'
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
                // fetchAbsExercise();
                // fetchGlutesExercise();
            }
            console.log(timeStamp)
            console.log('dailyWorkout', dailyWorkout)
        }
        else {
            fetchExercises();
            // fetchAbsExercise();
            // fetchGlutesExercise();
        }

        setTimeout(() => {
            setLoading(false);
        }, 1000);

    }, []);

    if (loading) {
        return <img src={turtle} alt="turtle on skateboard"/>
    }

    // const completeButton = () => {
    //     setWorkoutHistory(exercises);
    //     // save workout to back end
    // }

    return (
        <section>
            {exercises.map((exercise) => {
                return (
                    <section>
                        <p className="exercise">
                            <Collapsible trigger={exercise.name} key={exercise.id}>
                            {/* <br /> */}
                            <img src={exercise.gifUrl} alt='' className="exercise-gif"/>
                            </Collapsible>
                        </p>
                    </section>
                )
            })}

        {/* <button onClick={completeButton}>Workout Complete!</button> */}
        </section>
    )
}

export default Workout;