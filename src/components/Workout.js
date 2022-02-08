import axios from "axios";
import {useEffect, useState} from "react";
import Collapsible from 'react-collapsible';

const Workout = () => {

    const [exercises, setExercises] = useState([]);
    const [workoutHistory, setWorkoutHistory] = useState([]);
    const [bodyPartList, setBodyPartList] = useState([]);
    
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

// make ENV file for this?????
    useEffect(() => {
        // const allExercises = () => {

        const bodyPartList = () => {
            var options = {
                method: 'GET',
                url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
                headers: {
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                'x-rapidapi-key': `${process.env.KEY}`
                }
            };
            axios.request(options).then(function (response) {
                setBodyPartList(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        }

        const fetchExercises = () => {
            // const target = 'abs'
            var options = {
                method: 'GET',
                url: 'https://exercisedb.p.rapidapi.com/exercises',
                headers: {
                    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                    'x-rapidapi-key': `${process.env.KEY}`
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


    // const random = Math.floor(Math.random() * exercises.length);
    // // console.log(random, exercises[random])

    // const shuffled = exercises.sort(() => Math.random());

    // let selected = shuffled.slice(0, 6);


    return (
        <section>

            {exercises.map((exercise) => {
                return (

                    <Collapsible trigger={exercise.name} key={exercise.id}>
                    {/* <p key={exercise.id} onClick={exercise.gifUrl}>{exercise.name}</p> */}
                    <img src={exercise.gifUrl} alt=''/>
                    </Collapsible>
                )
            })}
        <button onClick={completeButton}>Workout Complete!</button>

            {/* // Shuffle array
const shuffled = array.sort(() => 0.5 - Math.random());

// Get sub-array of first n elements after shuffled
let selected = shuffled.slice(0, n);
image of a turtle and couch

build helperf unction, slice them, then use in return function 
     */}

{/* {
        "bodyPart": "waist",
        "equipment": "body weight",
        "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0001.gif",
        "id": "0001",
        "name": "3/4 sit-up",
        "target": "abs"
    }, */}
        </section>
    )
}

export default Workout;