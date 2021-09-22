import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import Link from 'next/link'

import request, { gql } from 'graphql-request'


function Products ({products}) {
    if(products.sawblades.length > 0) {
        return(
            <main className={styles.main}>
                <div className={styles.grid}>
                    {products.sawblades.map(product => {
                        let { name, price, description, category } = product;
                        let img = product.images[0].url
                        let url = `/products/${category}/${product.productNumber}`
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
        )
    }else {
        return(
            <div className={styles.main}>No blades found</div>
        )
    }
}

export async function getStaticProps( context ) {
	const query = gql`
        {
            sawblades(where: {category: ${context.params.category}}) {
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

export async function getStaticPaths() {
	const query = gql`
        {
            __type(name: "Category") {
                enumValues {
                  name
                }
              }
        }
    `
    const categories = await request("https://api-us-west-2.graphcms.com/v2/cktls2x2m1dyd01z08hrwa5nt/master", query)
	const paths = categories.__type.enumValues.map((category) => ({
		params: { category: category.name }
	}))
	return { paths, fallback: 'blocking'}
}

export default Products