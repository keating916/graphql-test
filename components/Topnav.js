import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/NavStyles.module.css';


export default function Topnav() {
    return(
        <div className={styles.navContainer}>
            <nav className={styles.navLinks}>
                <Link href='/'><a className={styles.navButton}>Home</a></Link>
                <Link href='/products'><a className={styles.navButton}>Products</a></Link>
                <Link href='/products/circular'><a className={styles.navButton}>Circular Saw Blades</a></Link>
                <Link href='/products/band'><a className={styles.navButton}>Band Saw Blades</a></Link>
                <Link href="/contact"><a className={styles.navButton}>Contact Us</a></Link>
            </nav>
            <div className={styles.navPhone}>
                <p>Call us: <a id={styles.phoneLink} href="tel:9163661111"><Image src={'/images/smartphone-call.png'} width={16} height={16} className="icon" alt="phone icon" />916-366-1111</a></p>
            </div>
        </div>
    )
}