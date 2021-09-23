import axios from "axios";
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

import request, { gql } from 'graphql-request'
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
		let filter = evt.target.value
		this.setState({
			checked: filter
		}) 
	}
	render() {
		console.log(this.state)
		let products = {sawblades:[{}]}
		if(this.state.checked === "circular") {
			products.sawblades = this.props.products.sawblades.filter(product => product.price === 7.75)
		}else if(this.state.checked === "band") {
			products.sawblades = this.props.products.sawblades.filter(product => product.price === 9.25)
		}else if(this.state.checked === "all") {
			products = this.props.products
		}
		if(products.sawblades[0].name !== undefined){
			return (
				<div>
					<main className={styles.main}>
						<form>
							<input type="radio" value="all" id="all" name="filter" onChange={this.handleCheck} defaultChecked />
							<label htmlFor="all">All Blades</label>
							<input type="radio" value="circular" id="circular" name="filter" onChange={this.handleCheck} />
							<label htmlFor="circular">Circular Blades</label>
							<input type="radio" value="band" id="band" name="filter" onChange={this.handleCheck} />
							<label htmlFor="band">Bandsaw Blades</label>
						</form>
						<div className={styles.grid}>
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
		}else {
			return(
				<div>
					<main className={styles.main}>
						<form>
							<input type="radio" value="all" id="all" name="filter" onChange={this.handleCheck} defaultChecked />
							<label htmlFor="all">All</label>
							<input type="radio" value="circular" id="circular" name="filter" onChange={this.handleCheck} />
							<label htmlFor="circular">circular</label>
							<input type="radio" value="band" id="band" name="filter" onChange={this.handleCheck} />
							<label htmlFor="band">band</label>
						</form>
						<h2>Please select at least one type of blade!</h2>
					</main>
				</div>
			)
		}
	}
	
}

export async function getStaticProps() {
	/*const query = gql`
        {
            sawblades {
                name
                productNumber
                images {
                    url
                }
                description
                price
				category
            }
        }
    `
	*/
    const products = await axios.get('http:localhost:3000/api/products')
	console.log(products)
	return {
		props:{
			products,
		}
	}
}

export default Products