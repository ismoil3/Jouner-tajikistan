import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Mousewheel, Navigation, Pagination, Autoplay } from "swiper/modules";
import Modal from "@mui/material/Modal";
import StarsIcon from "@mui/icons-material/Stars";
import { useCities } from "../../store/Cities";
import { ArrowBack } from "@mui/icons-material";

const City = () => {
  const api = "http://localhost:3000/cities/?name=";
  const name = useParams();
  const [city, setCity] = useState([]);
  const [textOpen, setTextOpen] = useState(false);
  const [weather, setWeather] = useState(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [AddName, setAddName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [AddComment, setAddComment] = useState("");
  const [comments, setComments] = useState([]);
  const { isDarkMode } = useCities();
  const [Hotels, setHotels] = useState([]);

  useEffect(() => {
    getCityData();
    getWeatherData();
  }, []);

  async function getCityData() {
    try {
      const { data } = await axios.get(api + name.name);
      const { data: allcomments } = await axios.get(
        "http://localhost:3000/comments"
      );
      const commentsOf = allcomments.filter(
        (el) => +el?.cityId === +data[0].id
      );
      const { data: AllHotel } = await axios.get(
        "http://localhost:3000/HotelsOfCity"
      );
      const HotelOf = AllHotel.filter((el) => +el?.cityId === +data[0].id);
      setComments(commentsOf);
      setCity(data);
      setHotels(HotelOf);
    } catch (error) {
      console.error(error);
    }
  }

  async function getWeatherData() {
    try {
      const weatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=086ea1c51ed74052a6b102001240411&q=${name.name}`;
      const { data } = await axios.get(weatherApiUrl);
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  async function AddCommentHandler() {
    const newComment = {
      cityId: city[0].id,
      title: AddComment,
      name: AddName,
      time: new Date().toLocaleDateString("en-GB"),
    };
    try {
      await axios.post("http://localhost:3000/comments", newComment);
      if (!localStorage.getItem("userName")) {
        localStorage.setItem("userName", AddName);
      }
      setAddComment("");
      getCityData();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <Box
        sx={{ marginTop: "30px", position: "relative", marginBottom: "30px" }}
      >
        <Link to={'/cities'}>
          <IconButton
            sx={{
              position: "sticky",
              zIndex: "10000",
              top: "20px",
              color: "white",
              background: "linear-gradient(90deg, #00c6ff, #0072ff)",
              left: "20px",
              margin: "0px 0 10px 0",
            }}
          >
            <ArrowBack />
          </IconButton>
        </Link>
        {city.length > 0 &&
          city.map((el, i) => (
            <Box key={i} sx={{padding:'10px'}}>
              <Swiper
                style={{ width: "100%", maxWidth: "900px" }}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination, Mousewheel, Autoplay]}
              >
                <Box sx={{ padding: "0px 3px" }}>
                  {el?.images?.map((img, index) => (
                    <SwiperSlide
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <img
                        src={img}
                        alt="Images are not defined!"
                        style={{
                          maxWidth: "900px",
                          width: "100%",
                          height: "400px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Box>
              </Swiper>
              <Typography
                sx={{
                  fontSize: "40px",
                  fontWeight: "700",
                  maxWidth: "900px",
                  margin: "auto",
                  marginTop: "30px",
                }}
              >
                {el.name}
              </Typography>
              <Tooltip title="Click to see more">
                <Typography
                  sx={{
                    fontSize: "20px",
                    maxWidth: "900px",
                    margin: "auto",
                    display: "-webkit-box",
                    WebkitLineClamp: textOpen ? "none" : "5",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    opacity: "70%",
                    cursor: "pointer",
                  }}
                  onClick={() => setTextOpen(!textOpen)}
                >
                  {el.desc}
                </Typography>
              </Tooltip>
              <br />

              <Box
                sx={{ maxWidth: "900px", margin: "auto", marginBottom: "20px" }}
              >
                <Typography sx={{ fontSize: "40px", fontWeight: "700" }}>
                  Hotels
                </Typography>
                <br />
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "50px" }}>
                  {Hotels.length > 0 &&
                    Hotels.map((hotel, i) => (
                      <Box
                        key={i}
                        sx={{
                          maxWidth: "300px",
                          width: "100%",
                          ":hover": {
                            boxShadow: "5px 5px 10px #00000050",
                            scale: "1.05",
                          },
                          transition: "all 0.3s",
                          cursor: "default",
                          padding: "20px 20px",
                          borderRadius: "20px",
                        }}
                      >
                        <Box sx={{ maxWidth: "300px", height: "150px" }}>
                          <img
                            src={hotel.images[0]}
                            alt=""
                            style={{
                              width: "100%",
                              height: "150px",
                              borderRadius: "10px",
                            }}
                          />
                        </Box>
                        <br />
                        <Typography
                          sx={{ fontWeight: "700", fontSize: "20px" }}
                        >
                          {hotel.name}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "14px", marginBottom: "10px" }}
                        >
                          {hotel.description}
                        </Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "#dd0",
                          }}
                        >
                          <StarsIcon />
                          {hotel.rating}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Box>

              {weather && (
                <Box
                  sx={{
                    maxWidth: "900px",
                    margin: "5% auto",
                    marginTop: "30px",
                    padding: "30px",
                    borderRadius: "20px",
                    background: `linear-gradient(135deg, ${
                      isDarkMode ? "#3a3a3a" : "#0072ff"
                    }, #00c6ff)`,
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "700", marginBottom: "10px" }}
                  >
                    Weather in {weather.location.name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <img
                      src={weather.current.condition.icon}
                      alt="Weather icon"
                      style={{
                        width: "80px",
                        height: "80px",
                        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))",
                      }}
                    />
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "500", fontSize: "24px" }}
                    >
                      {weather.current.condition.text}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "22px",
                      fontWeight: "400",
                      marginBottom: "10px",
                    }}
                  >
                    Temperature:{" "}
                    <strong style={{ fontSize: "24px" }}>
                      {weather.current.temp_c} °C
                    </strong>
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 20px",
                      marginTop: "20px",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography>
                      Humidity: {weather.current.humidity}%
                    </Typography>
                    <Typography>
                      Wind: {weather.current.wind_kph} km/h
                    </Typography>
                  </Box>
                </Box>
              )}

              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: "700",
                  maxWidth: "900px",
                  margin: "auto",
                  marginTop: "30px",
                }}
              >
                Facts about {el.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  maxWidth: "900px",
                  margin: "auto",
                  display: "-webkit-box",
                  WebkitLineClamp: textOpen ? "none" : "5",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  opacity: "70%",
                  cursor: "pointer",
                }}
                onClick={() => setTextOpen(!textOpen)}
              >
                {el.facts}
              </Typography>
              <br />

              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: "700",
                  maxWidth: "900px",
                  margin: "auto",
                  marginTop: "30px",
                }}
              >
                Events of {el.name}
              </Typography>
              {el.events.map((event, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontSize: "20px",
                    maxWidth: "900px",
                    margin: "auto",
                    display: "-webkit-box",
                    WebkitLineClamp: textOpen ? "none" : "5",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    opacity: "70%",
                    cursor: "pointer",
                  }}
                  onClick={() => setTextOpen(!textOpen)}
                >
                  {event}
                </Typography>
              ))}
              <br />

              <Box
                sx={{
                  marginTop: 2,
                  maxWidth: "900px",
                  margin: "auto",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
                dangerouslySetInnerHTML={{ __html: el.googleMap }}
              />
              <br />

              <Box sx={{ maxWidth: "900px", margin: "auto" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontSize: "30px", fontWeight: "700" }}>
                    Leave a review
                  </Typography>
                  <br />
                  <Button
                    onClick={handleOpen}
                    sx={{
                      background: "linear-gradient(90deg, #00c6ff, #0072ff)",
                    }}
                    variant="contained"
                  >
                    POST comment
                  </Button>
                </Box>
              </Box>
              <br />

              <Box
                sx={{
                  overflow: "auto",
                  height: "500px",
                  padding: "20px",
                  backgroundColor: "#aaaaaa50",
                  maxWidth: "900px",
                  margin: "auto",
                  borderRadius: "10px",
                }}
              >
                {comments.length > 0 ? (
                  comments.map((ele, index) => (
                    <Box key={index} sx={{ marginBottom: "10px" }}>
                      <Box
                        sx={{
                          padding: "10px",
                          background:
                            ele.name == localStorage.getItem("userName")
                              ? "linear-gradient(90deg, #00a4ee, #0722aa)"
                              : isDarkMode
                              ? "#000"
                              : "#fff",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                          }}
                        >
                          <Avatar />
                          <Box
                            sx={{
                              color:
                                ele.name == localStorage.getItem("userName")
                                  ? "#fff"
                                  : isDarkMode
                                  ? "#fafafa"
                                  : "#000",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <Typography sx={{ fontWeight: "700" }}>
                                {ele.name.toUpperCase()}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  color:
                                    ele.name == localStorage.getItem("userName")
                                      ? "#fafafa"
                                      : "gray",
                                }}
                              >
                                {ele.time}
                              </Typography>
                            </Box>
                            <Typography sx={{ fontSize: "18px" }}>
                              {ele.title}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                    you can post the first comment
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {localStorage.getItem("userName") == null ? (
            <TextField
              fullWidth
              value={AddName}
              onChange={(e) => setAddName(e.target.value)}
              label="Name"
            />
          ) : (
            <Typography sx={{ textAlign: "center" }} variant="h5">
              {AddName}
            </Typography>
          )}
          <br />
          <br />
          <TextField
            fullWidth
            multiline
            value={AddComment}
            onChange={(e) => setAddComment(e.target.value)}
            label="Comment"
          />
          <br />
          <br />
          <Button
            sx={{ background: "linear-gradient(90deg, #00c6ff, #0072ff)" }}
            onClick={AddComment != "" && AddName != "" && AddCommentHandler}
            variant="contained"
            fullWidth
          >
            Post
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default City;
