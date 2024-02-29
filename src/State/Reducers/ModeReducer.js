
// let data={
//     primarybox:"bg-white text-black",
//     btn:"text-black hover:bg-gray-200",
//     active_btn:"Active-btn-dark",
//     secondarybox:"bg-gray-200",
//     container:"bg-white text-black"
// }
let data = {
    primarybox: "bg-white text-black",
    btn: "text-black hover:bg-gray-200",
    active_btn: "Active-btn-dark",
    secondarybox: "bg-gray-200",
    container: "bg-white text-black",
    container_item_hover: "hover:bg-gray-100",
    border_color: "border-gray-200",
    dialog_box:"bg-gray-200 text-black"
}
const ModeReducer = (state = { data }, action) => {
    if (action.type === "Mode") {
        state = action.payload;
        return state;
    }
    else {
        state = data;
        return state;
    }
}
export const Curr_Page = (state = "Overview", action) => {
    if (action.type === "Page") {
        state = action.payload;
        return state;
    }
    else {
        return state;
    }
}
export default ModeReducer;
