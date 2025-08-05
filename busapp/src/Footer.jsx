import instagram from './assets/insta.svg';
import twitter from './assets/twiter.png';
import whatsapp from './assets/whatsapp.svg';
import styles from './Footer.module.css';


export default function Footer(){


    return(<div className={styles.footer} >
            <a href="https://www.instagram.com/your_username/" target="_blank" rel="noopener noreferrer"><img height={100} src={instagram} href='instagram'></img></a>
            <a href="https://www.instagram.com/your_username/" target="_blank" rel="noopener noreferrer"><img height={100} src={twitter} href="x"></img> </a>
            <a href="https://www.instagram.com/your_username/" target="_blank" rel="noopener noreferrer"><img height={100} src={whatsapp} href="whatsapp"></img></a>

        </div>);
}