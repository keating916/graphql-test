import axios from "axios";
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import { Component } from 'react'


class Products extends Component {
	constructor(props) {
		super(props)
		this.state = {
			checked: "all"
		}
		this.handleCheck = this.handleCheck.bind(this);
	}

	handleCheck(evt) {
		//sets state based on which radio button is checked
		let filter = evt.target.value
		this.setState({
			checked: filter
		}) 
	}
	render() {
		let products = {sawblades:[{}]}  //sets products.sawblades as an array of objects
		//sets products as filtered array based on state of radio buttons
		if(this.state.checked === "circular") {
			products.sawblades = this.props.products.sawblades.filter(product => product.category === 'circular')
		}else if(this.state.checked === "band") {
			products.sawblades = this.props.products.sawblades.filter(product => product.category === "band")
		}else if(this.state.checked === "other") {
			products.sawblades = this.props.products.sawblades.filter(product => product.category === "other")
		}else if(this.state.checked === "all") {
			products = this.props.products
		}
		return (
			<div>
				<main className={styles.main}>
					<form>
						<input type="radio" value="all" id="all" name="filter" onChange={this.handleCheck} defaultChecked />
						<label htmlFor="all">All Products</label>
						<input type="radio" value="circular" id="circular" name="filter" onChange={this.handleCheck} />
						<label htmlFor="circular">Circular Blades</label>
						<input type="radio" value="band" id="band" name="filter" onChange={this.handleCheck} />
						<label htmlFor="band">Bandsaw Blades</label>
						<input type="radio" value="other" id="other" name="filter" onChange={this.handleCheck} />
						<label htmlFor="other">Other</label>
					</form>
					<div className={styles.grid}> 
						{/* maps over products set by radio buttons, filter and returns product list */}
						{products.sawblades.map(product => {
							let { name, price, description } = product;
							let img = product.images[0].url
							let url = `/products/${product.productNumber}`
							description = description.slice(0, 40)+ "..."
							return(
								<Link href={url} key={product.productNumber} passHref>
									<div className={styles.card}>
										<Image src={img} alt={description} width={106} height={60} />
										<p>{name}</p>
										<p>${price}</p>
										<p>{description}</p>
									</div>
								</Link>
							)
						})}
					</div>
				</main>
			</div>
		)
	}
	
}

//gets list of all products from products API page, hiding api key
export async function getStaticProps() {
    const response = await axios.get('/api/allProductsAPI')
	const products = await response.data
	return {
		props:{
			products,
		}
	}
}

export default Products

//TODO change host to dynamic host for deployment