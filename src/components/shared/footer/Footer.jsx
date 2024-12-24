import { Box, Typography } from '@mui/material';
import { useCities } from '../../../store/Cities';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Telegram, YouTube } from '@mui/icons-material';


const Footer = () => {
  const { isDarkMode } = useCities();

  return (
    <>
      <Box sx={{
        padding: "10px",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: "20px",
        backgroundImage: "url('/src/components/shared/footer/images/footerbg.webp')",

      }}>
        <Box sx={{ backgroundColor: isDarkMode ? "#00000090" : "#ffffff99", backdropFilter: 'blur(10px)', display: "flex", flexWrap: "wrap", gap: "50px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", padding: "0px", borderRadius: "30px", justifyContent: 'space-evenly' }}>
          <Box sx={{ padding: '20px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: '700',
                  background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontFamily: "'Poppins', sans-serif",
                  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
                }}
              >
                Journey TJ
              </Typography><br />
            </Link>
            <Typography sx={{ fontSize: "18px" }}>Journey Tajikistan - is an interactive <br /> application that opens up all the cities of <br /> Tajikistan, their culture, nature, and history <br /> to you. We aim to inspire travelers to <br /> explore this amazing region.</Typography>
          </Box>
          <Box sx={{ padding: '20px' }}>
            <Typography sx={{ fontWeight: "700", fontSize: "30px" }}>Pages</Typography><br />
            <Link to={"/"} style={{ textDecoration: "none" }}><Typography sx={{ color: isDarkMode ? 'white' : 'black', marginBottom: "5px", fontSize: "18px" }}>Home</Typography></Link>
            <Link to={"/cities"} style={{ textDecoration: "none" }}><Typography sx={{ color: isDarkMode ? 'white' : 'black', marginBottom: "5px", fontSize: "18px" }}>Cities</Typography></Link>
            <Link to={"/about"} style={{ textDecoration: "none" }}><Typography sx={{ color: isDarkMode ? 'white' : 'black', marginBottom: "5px", fontSize: "18px" }}>About</Typography></Link>
          </Box>
          <Box sx={{ padding: '20px' }}>
            <Typography sx={{ fontWeight: "700", fontSize: "30px" }}>Social Medias</Typography><br />
            <Box sx={{ display: "flex", gap: '20px' }}>
              <Link to={"https://telegram.org"} style={{ color: isDarkMode ? 'white' : 'black' }}> <Telegram sx={{ ":hover": { color: "blue" } }}></Telegram> </Link>
              <Link to={"https://www.instagram.com"} style={{ color: isDarkMode ? 'white' : 'black' }}> <Instagram sx={{ ":hover": { color: "red" } }}></Instagram> </Link>
              <Link to={"https://www.youtube.com"} style={{ color: isDarkMode ? 'white' : 'black' }}> <YouTube sx={{ ":hover": { color: "red" } }}></YouTube> </Link>
              <Link to={"https://www.facebook.com"} style={{ color: isDarkMode ? 'white' : 'black' }}> <Facebook sx={{ ":hover": { color: "blue" } }}></Facebook> </Link>
            </Box>
          </Box>
          <Box>
          </Box>
          <img style={{width:'200px', height:'230px'}} src="/src/components/shared/footer/images/footer.png" alt="" />
        </Box>
      </Box>
    </>
  );
};

export default Footer;
