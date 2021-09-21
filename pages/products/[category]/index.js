import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import Link from 'next/link'

import request, { gql } from 'graphql-request'


function Products ({ category }) {
		return(<p>category page</p>)
	
}

export async function getStaticProps({ context }) {
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
            sawblades {
                category
            }
        }
    `
    const products = await request("https://api-us-west-2.graphcms.com/v2/cktls2x2m1dyd01z08hrwa5nt/master", query)
	const paths = products.sawblades.map((product) => ({
		params: { category: product.category }
	}))
	return { paths, fallback: 'blocking'}
}

export default Products