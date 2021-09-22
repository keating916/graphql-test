import Carousel from 'react-simply-carousel';
import Image from 'next/image'
import Link from 'next/link';
import request, { gql } from 'graphql-request'

import styles from '../styles/Home.module.css'
import { Component } from 'react';


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeSlideIndex: 0
        }
        this.setActiveSlideIndex = this.setActiveSlideIndex.bind(this);
    }

    setActiveSlideIndex = (newActiveSlideIndex) => {
        this.setState({
          activeSlideIndex: newActiveSlideIndex,
        });
    };
    render() {
        return(
            <>
                <Link href='/products'>Products</Link>
                <main className={styles.main}>
                    <Carousel
                        activeSlideIndex={this.state.activeSlideIndex}
                        onRequestChange={this.setActiveSlideIndex}
                        itemsToShow={2}
                        itemsToScroll={1}
                        className={styles.grid}>
                        {this.props.products.sawblades.map(product => {
                            let { name, price, description, category } = product;
                            let img = product.images[0].url
                            let url = `/products/${category}/${product.productNumber}`
                            description = description.slice(0, 40)+ "..."
                            return(
                                <Link href={url} key={product.productNumber} passHref>
                                    <div  className={styles.card}>
                                        <Image src={img} alt={description} width={106} height={60} />
                                        <p>{name}</p>
                                        <p>${price}</p>
                                        <p>{description}</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </Carousel>
                </main>
            </>
        )
    }
}

export async function getStaticProps() {
	const query = gql`
        {
            sawblades(where:{featured: true}) {
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

export default Home