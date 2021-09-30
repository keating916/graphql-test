import Image from 'next/image'
import Link from 'next/link';
import axios from 'axios'
import styles from '../../styles/Home.module.css'


export default function productPage({ products }) {
    let { name, price, description } = products.sawblades[0];
    let img = products.sawblades[0].images[0].url
    return(
        <div className={styles.main}>
            <Link href='/products'>Back to Products</Link>

            <Image src={img} alt={description} width={711} height={400} />
            <p>{name}</p>
            <p>${price}</p>
            <p>{description}</p>
        </div>
    )
}

//gets props from product API page, hiding api key
export async function getStaticProps(context) {
    const response = await axios.post(`/api/singleProductAPI`, {product: context.params.productNumber})
	const products = await response.data
	return {
		props:{
			products,
		}
	}
}