import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

import request, { gql } from 'graphql-request'


function Products ({ products }) {

		if(products){
			return (
				<div className={styles.container}>
					<Head>
						<title>Create Next App</title>
						<meta name="description" content="Generated by create next app" />
						<link rel="icon" href="/favicon.ico" />
					</Head>

					<main className={styles.main}>
						<div className={styles.grid}>
							{products.sawblades.map(product => {
								let { name, price, description, category } = product;
								let img = product.images[0].url
								let url = `/products/${category}/${product.productNumber}`
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
				<div>Loading</div>
			)
		}
	
}

export async function getStaticProps() {
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
    const products = await request("https://api-us-west-2.graphcms.com/v2/cktls2x2m1dyd01z08hrwa5nt/master", query)
	return {
		props:{
			products,
		}
	}
}

export default Products