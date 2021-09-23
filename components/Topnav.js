import Link from 'next/link'
import styles from '../styles/NavStyles.module.css';


export default function Topnav() {
    return(
        <div className={styles.navContainer}>
            <nav className={styles.navLinks}>
                <Link href='/'><a className={styles.navButton}>Home</a></Link>
                <Link href='/products'><a className={styles.navButton}>Products</a></Link>
                <Link href="/contact"><a className={styles.navButton}>Contact Us</a></Link>
            </nav>
        </div>
    )
}