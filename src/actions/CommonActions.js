export const fetchingData = () => dispatch => {
    dispatch({
        type: 'LOADING_ACTION',
        isLoading: true
    })
}
export const fetchingDataFinished = () => dispatch => {    
    dispatch({
        type: 'LOADING_ACTION',
        isLoading: false
    })
}

export const alert = (text) => dispatch => {
    dispatch({
        type: "ALERT",
        alert: {text}
    })

}