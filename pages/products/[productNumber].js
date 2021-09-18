import Image from 'next/image'
import request, { gql } from 'graphql-request'

export default function productPage({ products }) {
    let { name, price, description } = products.sawblades[0];
    let img = products.sawblades[0].images[0].url
    return(
        <div>
            <Image src={img} alt={description} width={711} height={400} />
            <p>{name}</p>
            <p>${price}</p>
            <p>{description}</p>
        </div>
    )
}

export async function getStaticProps(context) {
    console.log(context.params.productNumber)
	const query = gql`
        {
            sawblades(where: {productNumber: "${context.params.productNumber}"}) {
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
	const paths = products.sawblades.map((product) => ({
		params: { productNumber: product.productNumber}
	}))

	return { paths, fallback: 'blocking'}
}