import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Paper, styled, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Container from "../../components/container/Container"
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCities } from '../../store/Cities';
import Aos from 'aos';
import { ArrowRightOutlined, ExpandMore } from '@mui/icons-material';

const Home = () => {
  let api = "http://localhost:3000/cities"
  const [cities, setCities] = useState([])
  const [search, setSearch] = useState("")
  const { isDarkMode } = useCities()
  const navigate = useNavigate()

  const StyledButton = styled(Button)({
    fontWeight: '600',
    width: 'fit-content',
    alignSelf: 'center',
    margin: '20px 0',
    fontSize: '18px',
    textTransform: 'none',
    padding: '6px 14px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    background: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: isDarkMode ? 'rgba(40, 40, 40, 1)' : 'rgba(240, 240, 240, 1)',
      transform: 'translateY(-2px)',
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.15)',
    },
  });

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, [isDarkMode]);

  useEffect(() => {
    get()
  }, [])


  async function get() {
    try {
      const { data } = await axios.get(api)
      setCities(data)
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <Container>
        <Box sx={{ marginTop: "30px", display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              position: 'relative',
              padding: '270px 0px',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              borderRadius: "20px",
              backgroundImage: "url('/src/components/shared/footer/images/ismoil.png')",
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: "url('/src/images/ismoil.png')",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                filter: 'blur(10px)',
                zIndex: -1,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderRadius: "20px",
                zIndex: 0,
              },
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: '900',
                fontSize: { md: "70px", xs: "50px" },
                position: 'relative',
                color: 'white',
                zIndex: 1,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
              }}
            >Welcome to Tajikistan</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                variant="outlined"
                size='small'
                sx={{
                  width: '100%',
                  maxWidth: '400px',
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    backgroundColor: isDarkMode ? "#202020" : "#fff",
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                    zIndex: 1,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#0075c9" }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Search cities"
              />
            </Box>
          </Box>

          <Box data-aos="fade-down">
            <Box sx={{ marginTop: "30px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", padding: "0px 50px" }}>
              <Typography data-aos="fade-right" sx={{ fontSize: "30px", fontWeight: "900" }}>Cities of Tajikistan</Typography>
              <StyledButton data-aos="fade-left" sx={{ background: 'linear-gradient(90deg, #00c6ff, #0072ff)', color: 'white', marginBottom: "30px", width: "300px" }}>
                <Link to="/cities" style={{ textDecoration: 'none', display: 'flex', alignItems: "center", gap: '10px', color: 'inherit' }}>
                  More Cities <ArrowRightOutlined></ArrowRightOutlined>
                </Link>
              </StyledButton>
            </Box>
            <Typography sx={{ padding: "0px 50px", fontSize: "25px", color: "gray" }}>The largest metropolitan area in Tajikistan is that of the capital Dushanbe, <br /> with 15,63,400 inhabitants (2024 est.). Thirteen percent of the population <br /> of the country lives in the region of the capital.</Typography>
          </Box>

          <Grid container sx={{ display: "flex", gap: "50px", marginTop: "30px", marginBottom: "30px" }}>
            {cities.length > 0 && cities.slice(0, 6).filter((ele) => ele.name.toLowerCase().includes(search.toLocaleLowerCase().trim())).map((el) => (
              <Grid key={el.id} onClick={() => navigate(`/city/${el.name}`)} data-aos="fade-down" item sx={{
                maxWidth: "350px",
                width: "100%",
                cursor: "pointer",
                boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
                borderRadius: "20px",
                margin: "auto",
                backgroundColor: isDarkMode ? "#00000099" : "#ffffff99",
                "&:hover": {
                  transition: 'all 0.5s',
                  scale: '1.1'
                }
              }}>
                <Box className="carousel" >
                  {el.images.map((image, i) => (
                    <img src={image} key={i} alt={el.name} style={{
                      width: "100%",
                      height: "100%", backgroundColor: "#283593", objectFit: "cover"
                    }} />
                  ))}
                </Box>
                <Typography sx={{
                  textAlign: "center",
                  padding: "15px 0",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: isDarkMode ? "#fff" : "#000",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}>{el.name}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Accordion elevation={3} sx={{marginY:'30px', borderRadius:'0px'}}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{fontSize:'25px'}}
          >
            Read about Tajikistan
          </AccordionSummary>
          <AccordionDetails>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: isDarkMode ? '' : '#f9f9f9' }}>
              <Typography variant="h4" gutterBottom data-aos="fade-up" sx={{
                fontWeight: '700',
                background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontFamily: "'Poppins', sans-serif",
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
              }}>
                Tajikistan: A Jewel of Central Asia
              </Typography>

              <Typography variant="h5" gutterBottom data-aos="fade-right" sx={{
                fontWeight: '700',
                background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontFamily: "'Poppins', sans-serif",
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
              }}>
                Geography and Climate
              </Typography>
              <Typography variant="body1" paragraph data-aos="fade-left">
                Tajikistan is a small yet stunning country located in Central Asia. It shares borders with Uzbekistan to the west, Kyrgyzstan to the north, China to the east, and Afghanistan to the south. The country is renowned for its breathtaking mountain landscapes, rich culture, and history, as well as its friendly people.
              </Typography>
              <Typography variant="body1" paragraph data-aos="fade-left">
                Covering an area of about 143,100 square kilometers, more than 90% of Tajikistan's territory is mountainous. It is part of the Tian Shan and Pamir mountain ranges, home to some of the highest peaks, including Ismoil Somoni Peak (7495 meters), the highest point in Tajikistan and the former Soviet Union. The Pamirs, known as the "Roof of the World," are famous for their majestic mountains, glaciers, and deep gorges.
              </Typography>
              <Typography variant="body1" paragraph data-aos="fade-left">
                The climate in Tajikistan varies from continental in the lowlands to alpine in the mountains. Summers are generally hot, with temperatures reaching 40 °C in some areas, while winters can be cold, especially in the mountains, where temperatures can drop below -20 °C.
              </Typography>

              <Typography variant="h5" gutterBottom data-aos="fade-right" sx={{
                fontWeight: '700',
                background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontFamily: "'Poppins', sans-serif",
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
              }}>
                History and Culture
              </Typography>
              <Typography variant="body1" paragraph data-aos="fade-left">
                Tajikistan's history spans thousands of years and features numerous cultural influences. It was part of the Great Silk Road, facilitating the exchange of goods and cultures between the East and the West, leaving a lasting mark on the country's culture, which combines Persian, Arab, and Soviet elements.
              </Typography>
              <Typography variant="body1" paragraph data-aos="fade-left">
                Tajikistan gained independence after the collapse of the Soviet Union in 1991. Independence led to internal conflicts and a civil war that lasted from 1992 to 1997. However, since then, the country has recovered and focused on economic growth and improving the quality of life for its citizens.
              </Typography>
              <Typography variant="body1" paragraph data-aos="fade-left">
                Tajik culture is rich in traditions, including music, dance, crafts, and cuisine. One of the most famous musical instruments is the rubob, which plays a central role in Tajik folk music. Tajik weddings and celebrations are filled with colorful traditions, where food plays an important role, particularly dishes like plov, samsa, and kebabs.
              </Typography>

              <Typography variant="h5" gutterBottom data-aos="fade-right" sx={{
                fontWeight: '700',
                background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontFamily: "'Poppins', sans-serif",
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
              }}>
                Economy
              </Typography>
              <Typography variant="body1" paragraph data-aos="fade-left">
                Tajikistan's economy heavily relies on agriculture, with over 60% of the population engaged in this sector. Major agricultural crops include cotton, fruits, and vegetables. The country is also rich in mineral resources, such as gold, coal, and tungsten.
              </Typography>
              <Typography variant="body1" paragraph data-aos="fade-left">
                Despite its rich resources, Tajikistan faces several economic challenges, including high unemployment and poverty rates. In recent years, the government has been working to improve infrastructure, create new jobs, and attract foreign investment.
              </Typography>

              <Typography variant="h5" gutterBottom data-aos="fade-right" sx={{
                fontWeight: '700',
                background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontFamily: "'Poppins', sans-serif",
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
              }}>
                Tourism
              </Typography>
              <Typography variant="body1" paragraph data-aos="fade-left">
                Tajikistan is becoming increasingly popular among tourists seeking unique adventures. The country offers stunning mountainous landscapes, such as Iskanderkul Lake and the Pamir National Park, which attract outdoor enthusiasts, climbers, and travelers.
              </Typography>
              <Typography variant="body1" paragraph data-aos="fade-left">
                Tourists can also enjoy the rich culture and history by visiting places like Dushanbe, the capital of Tajikistan, known for its modern buildings and monuments, and historical cities such as Khujand, which has its unique historical and cultural attractions.
              </Typography>

              <Typography variant="h5" gutterBottom data-aos="fade-right" sx={{
                fontWeight: '700',
                background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontFamily: "'Poppins', sans-serif",
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
              }}>
                Traditions and Customs
              </Typography>
              <Typography variant="body1" paragraph data-aos="fade-left">
                The Tajik people are renowned for their hospitality. The tradition of "mehmonnavozi" (hospitality) plays a significant role in Tajik culture. Tajiks are always happy to welcome guests and do everything possible to make them feel comfortable. At weddings and celebrations, guests are treated to a variety of dishes and drinks, and typically every guest leaves with gifts.
              </Typography>
              <Typography variant="body1" paragraph data-aos="fade-left">
                The main holidays in Tajikistan include Navruz (the New Year according to the solar calendar), Ramadan (the month of fasting), and Kurban Bayram. These holidays are accompanied by various traditions, dances, songs, and generous feasts.
              </Typography>

              <Typography variant="h5" gutterBottom data-aos="fade-right" sx={{
                fontWeight: '700',
                background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontFamily: "'Poppins', sans-serif",
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
              }}>
                Conclusion
              </Typography>
              <Typography variant="body1" paragraph data-aos="fade-left">
                Tajikistan is a country with a rich historical heritage, breathtaking natural beauty, and warm hospitality. It offers unique opportunities for travel and exploration of its diverse culture. Despite its challenges, Tajikistan continues to develop and open its doors to the world, attracting more travelers eager to discover its unique charm.
              </Typography>
            </Paper>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  )
}

export default Home