import { GraphQLClient, gql } from 'graphql-request'
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
    const endpoint = "https://api-us-west-2.graphcms.com/v2/cktls2x2m1dyd01z08hrwa5nt/master"
    
    const API_KEY = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MzIzNzA3NjEsImF1ZCI6WyJodHRwczovL2FwaS11cy13ZXN0LTIuZ3JhcGhjbXMuY29tL3YyL2NrdGxzMngybTFkeWQwMXowOGhyd2E1bnQvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYmU5ZGUwYjgtNDMzMS00N2ZiLTk3MWUtYWFkMTUyNTAyYTA4IiwianRpIjoiY2t0d2Zla2s4MHFlZzAxejA5bjBhaDh1NiJ9.gCWsQd2wOEsq5N8oFKZ_1uQBtpn90mvnOGkNQRFaq5F8TgyPQczYJS5YONT4rfpAtiHzAk61-avc3TCXuC5n8a_ioiIykEvPUMyEed3yIZ4eUbJDsqnx7SlxZjxP9YwNgbFsQ8eyuXZbIZl4hvvC61nX_fIzwHazzRCiCB9lLLkmP1JUqTwWZAsCVd0hzrL3QERuTnpxEemzZS-2CWOC3Np-g8pmvVqbMAb01fw5UQJYGTMdzoBT74-nnmU1HhBgR7PZh8zta7ewOppbhRO-odD0cnvszPmWGKiEP81dGFF1QcC3vnw34Lv9FT_jXUMhK7Ytl7Rhvq7mn87z6uozcmrQMAGRdIFQQVdc5GvLsXIsuOczCqAX0UwIJ2mwEN0RQypdjOmfInbPRykGdNRoSChoxv-v7-QVmhCvd3mLRIPrzR59IXsJPlQwrIxE6dIsBHUISewQU1CMW5oVj-zlf-Iai5jYaMuPGn6a92vLpH3eUENqp9OUERR5qi0ppTVFyDsKlQvpP9PP3UCPGHtHpSX9zj6jO0s1SssRbVMjH14nLJbZTGaA449PktvG6iGAZZpY4k2GHAeKxVIn_ax4IV5JaKwiiCGdiiW9eW5ygjmYUAXE1qdhP6z9LFC5t-eeKg0W0eByJpIUafJzjJNUn8sKoV6KPtQ7EHpedEg7ndY'

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
          authorization: `Bearer ${API_KEY}`,
        },
    })

    const query = gql`
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
    //returns all products. sawblades is the name of the db
    const products = await graphQLClient.request(query)
	return {
		props:{
			products,
		}
	}
}

export default Products

//TODO change host to dynamic host for deployment