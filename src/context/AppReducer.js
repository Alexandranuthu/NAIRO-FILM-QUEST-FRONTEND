//function that returns state data
//state is an object containing information about the current game state. It includes properties for player turn
export default(state, action) => {
    switch(action.type) {
        case "ADD_MOVIE_TO_WATCHLIST":
            return {
                ...state,
                watchlist: [action.payload, ...state.watchlist],
            }
        default: 
        return state;
    }
}