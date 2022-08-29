const initialStore = { MainArray : [] , BasketArray: [] };

const Reducer = (state = initialStore, action)=>{
    switch (action.type) {
        case 'PUSH':
            let newData = {...state};
            newData.MainArray = [...action.payload];
            return newData;

        case 'SEARCH':
            let search_data = {...state};
            search_data.MainArray = [...action.payload];
            return search_data;

        case 'BASKET':
            let basketdata = { ...state}
            basketdata.BasketArray = [...basketdata.BasketArray, basketdata.MainArray[action.payload] ]; 
            return basketdata;

        case 'DEL':
            let delData = {...state};
            delData.BasketArray = [...delData.BasketArray];
            delData.BasketArray.splice(action.payload, 1);
            return delData;

        default: return state
    }
}
export default Reducer;