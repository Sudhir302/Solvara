import "../../Styles/Footer.css";

function Footer(){
    return(
        <footer className="footer-container">
            <p className="copyright">Solvara © 2025 </p>
            <p className="policy">
                Privacy Policy | Terms of Service
            </p>
            <div className="footer-links">
                <a href="#"><i className="fa-brands fa-x-twitter neon-btn"></i></a>
                <a href="https://www.linkedin.com/in/sudhir-chaudhary-1b968a2bb/" target="_blank"><i className="fa-brands fa-linkedin neon-btn"></i></a>
                <a href="https://www.instagram.com/sudhirchaudhary03/?next=%2F" target="_blank"><i className="fa-brands fa-instagram neon-btn"></i></a>
                <a href="https://github.com/Sudhir302" target="_blank"><i className="fa-brands fa-github neon-btn"></i></a>
            </div>
        </footer>
    )
}

export default Footer;