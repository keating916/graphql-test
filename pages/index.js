import Carousel from 'react-simply-carousel';
import Image from 'next/image'
import Link from 'next/link';
import axios from 'axios'
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
        if(this.props.products) {
            return(
                    <main className={styles.main}>
                        
                        <div>
                            <p>Featured Products</p>
                            <Carousel
                                activeSlideIndex={this.state.activeSlideIndex}
                                onRequestChange={this.setActiveSlideIndex}
                                itemsToShow={2}
                                itemsToScroll={1}
                                className={styles.grid}>
                                {this.props.products.sawblades.map(product => {
                                    let { name, price, description, category } = product;
                                    let img = product.images[0].url
                                    let url = `/products/${product.productNumber}`
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
                        </div>
                    </main>
            )

        }else{
            return(
                <main className={styles.main}>
                    <div>Loading</div>
                </main>
            )
        }
    }
}

//gets featured products list from featured API page
export async function getStaticProps() {
    const response = await axios.get('http://localhost:3000/api/featuredAPI')
    const products = await response.data
    return {
		props:{
			products,
		}
	}
}

export default Home

//TODO change host to dynamic host for deployment