import React, {createContext, useReducer, useEffect} from 'react';
import AppReducer from "./AppReducer";
import axios from 'axios';
//intial state
const initialState = {
    watchlist: localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist'))
     : [],
     watched: localStorage.getItem('watched') ? JSON.parse(localStorage.getItem('watched'))
     : [],
};

// create context object
export const GlobalContext = createContext(initialState);

//provider -- allows us to access the global context from other variables
export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
     
    useEffect(()=> {
        localStorage.setItem('watchlist', JSON.stringify(state.watchlist))

        localStorage.setItem('watched', JSON.stringify(state.watched))
    }, [state])

    //actions 
    const addMovieToWatchlist = async (filmId) => {
        try{
            const response = await axios.post('http://localhost:4000/addMovieToWatchlist', {filmId});
            console.log(response.data);
        }catch(error) {
            console.log('error adding movie to watchlist', error);
        }
        dispatch({type: "ADD_MOVIE_TO_WATCHLIST", payload: filmId})
    }

    return (
        <GlobalContext.Provider 
        value={{
             watchlist: state.watchlist,
            watched: state.watched, 
            addMovieToWatchlist }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

