import React, {createContext, useReducer, useEffect} from 'react';
import AppReducer from "./AppReducer"
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
    const addMovieToWatchlist = (film) => {
        dispatch({type: "ADD_MOVIE_TO_WATCHLIST", payload: film})
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

