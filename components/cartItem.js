import { Component } from "react"
import Cart from "../pages/cart";
import checkPrice from "./checkPrice";

class CartItem extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log("cartItem: ", this.props)
        let { name, price, description, productNumber } = this.props.product[0]
        price = checkPrice(price)
        let quantity = this.props.quantity
        let totalPrice = price * quantity;
        totalPrice = checkPrice(totalPrice)
        return(
            <div className="cartCard">
                <p>{name}</p>
                <p>{price}</p>
                <p>{quantity}</p>
                <p>{totalPrice}</p>
            </div>
        )
    }
}

export default CartItem