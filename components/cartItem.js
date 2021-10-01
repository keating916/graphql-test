import { Component } from "react"
import Cart from "../pages/cart";

class CartItem extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props)
        let { name, price, description, productNumber } = this.props.product[0]
        let quantity = this.props.quantity
        let totalPrice = price * quantity;

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