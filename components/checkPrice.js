export default function checkPrice(price) {
    price = parseFloat(price);
    const priceTest = /\d+.\d{2}/
    const decTest = /\./g
    if(!decTest.test(price)) {
        price = price + ".00"
    }
    else if(!priceTest.test(price)) {
        price = price + "0"
    }
    return(price)
}