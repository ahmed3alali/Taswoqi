export const calculateOrderCost =(cartItems) =>{

const itemPrice = cartItems?.reduce(


(acc,item)=> acc + item.price * item.quantity,0


);

const shippingPrice = itemPrice>200 ? 0:25;
const taxPrice =    (0.15*itemPrice).toFixed(2);
const totalPrice = (itemPrice + shippingPrice + taxPrice.toFixed(2));

return{

itemPrice,
shippingPrice,
taxPrice,
totalPrice,


}


}


export const getPriceQueryParams = (searchParams, key,value) => {

const hasValueInParam = searchParams.has(key);

if (value&& hasValueInParam) { // update
    searchParams.set(key,value);
} else if (value) {
    searchParams.append(key,value); //add
}else if (hasValueInParam) { //delele
    searchParams.delete(key);
}


return searchParams;





};
