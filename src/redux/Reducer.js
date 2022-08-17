const initialStore = [];

const Reducer = (state = initialStore, action)=>{
    switch (action.type) {
        case 'PUSH':
            let newData = [...state];
            newData.push(...action.payload);
            return newData;
            break
        case 'SEARCH':
            return action.payload;
    
        default: return state
    }

}
export default Reducer;