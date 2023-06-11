import Navbar from "../components/Header/Navbar";
import Logo from '../images/logo_transparent.png'
import { Link } from "react-router-dom";
import GetHelp from "./GetHelp";
import FAQ from "./FAQ";
import Footer from './Footer'

const Home = () => {
  return (
    <div className="homepage">
      <Navbar />

      <div>
        <img src={Logo} alt='logo' />
        <p><span>Ghana</span> Victim Support</p>
      </div>
      
      <div className="part-1">
        <h1>You have rights as a victim of crime.</h1>
        <p>
          If you have experienced a violent crime in Queensland at some point in
          your life, VictimConnect can help. 
          
          <br/>
          <br/>
          We are a free and confidential
          service that aim to contribute to a more victim-centric approach to crime management in Ghana, empowering victims and ensuring their rights are protected.
        </p>

        <span>
            <Link to='tel:18555'>
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" ><path d="m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"></path></svg>
            <p>18555</p>
            </Link>
          </span>
      </div>

      <GetHelp />
      <FAQ />
      <Footer />
    </div>
  );
};
export default Home;
