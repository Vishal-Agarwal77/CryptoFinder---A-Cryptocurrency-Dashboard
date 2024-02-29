const Modefn = (newMode) => {
    return (dispatch) => {
        dispatch(
            {
                type: "Mode",
                payload: newMode
            }
        )
    }
}
export const Pagefn=(newPage)=>{
    return (dispatch)=>{
        dispatch(
            {
                type:"Page",
                payload:newPage
            }
        )
    }
}

export default Modefn;