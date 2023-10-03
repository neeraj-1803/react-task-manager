import {Link} from 'react-router-dom'

const Footer = () => {
    const d = new Date();
    let year = d.getFullYear();
    return (
        <footer>
            <p> Copyright &copy; {year}</p>
            <Link to="/about">About</Link>
        </footer>
    )
}

export default Footer
