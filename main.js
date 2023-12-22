
console.log(Redux); 
console.log(ReduxThunk); 

// constant

const WITHDRAW_MONEY = "WITHDRAW_MONEY";
const DEPOSITE_MONEY = "DEPOSITE_MONEY";
const ADD_PRODUCT = "ADD_PRODUCT";
const GET_PRODUCTS = " GET_PRODUCTS";


const withdraw = (amount) => {
    return{
        type : WITHDRAW_MONEY,
        payload : amount
    }
} 

const  getproducts =  (products) => {
    return {
        type : GET_PRODUCTS , 
        payload : products
    }
}

const  fetchproduct =   () => {

    return  async (dispatch) => {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        console.log(data);
        dispatch(getproducts(data));
    }
}

const depoist = function (amount) {
    return {
        type : DEPOSITE_MONEY ,
        payload: amount
    }
}

const addproduct = function (product) {
    return {
        type : ADD_PRODUCT, 
        payload : product
    }
} 

const bankreducer = (state = 1000 , action ) => {
    switch (action.type) {
        case "WITHDRAW_MONEY" :
        return  state - action.payload ;

        case "DEPOSITE_MONEY" :
            return  state + action.payload ;

        default: 
        return state;
    }
}

const productReducer = (state = [] , action ) => {
    switch(action.type) {
        case GET_PRODUCTS: 
            return [...state , ...action.payload] ;

        case ADD_PRODUCT: 
            return [...state , action.payload];

        default :
            return state;
    }
}

// create more than one redux store
const appReducer= Redux.combineReducers({
    bank : bankreducer,
    products : productReducer
});

//  create redux
const store = Redux.createStore(appReducer ,Redux.applyMiddleware(ReduxThunk));

console.log(store.getState());

store.dispatch(addproduct({id: 1 , title : 'product-1'}))
console.log(store.dispatch(addproduct({id: 2 , title : 'product-2'})));

console.log(appReducer.products);

console.log(store.getState());


let amountValue = document.querySelector("#value");

let amountInput = document.querySelector("#amount");

document.querySelector("#Withdraw").addEventListener("click", () => {
    store.dispatch(withdraw(+amountInput.value));
});

document.querySelector("#Depoist").addEventListener("click", () => {
    store.dispatch(depoist(+amountInput.value));
})


store.subscribe(() => {
    console.log("CURRENT STATE" , store.getState()) ;
    amountValue.innerHTML = store.getState().bank;
})

store.dispatch(fetchproduct());

