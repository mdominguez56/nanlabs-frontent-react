import React, { useState, useEffect } from "react";
import axios from "axios";
import Imgix, { Background } from "react-imgix";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Container,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: false, // if you want to set the automatic playback you must change the value to true
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const baseURL =
  "https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json";

export default function Carousel() {
  const [slider, setSlider] = useState(0);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });
  const [direction, setDirection] = useState("");
  const [cards, setCards] = useState(null);
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setCards(response.data);
    });
  }, []);

  if (!cards) return null;

  function changeDirection() {
    switch (direction) {
      case "HV":
        setDirection("");
        break;
      case "":
        setDirection("HV");
        break;
      default:
        setDirection("");
    }
  }

  return (
    <Box
      position={"relative"}
      height={"100%"}
      width={"full"}
      overflow={"hidden"}
    >
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Background key={index} src="" imgixParams={{ flip: {} }}>
            <Container size="container.lg" height="1000px" position="relative">
              <Imgix src={card.url} imgixParams={{ flip: direction }} />
            </Container>
            <button onClick={() => setDirection("hv")}>
              Cambiar direccion
            </button>
            <button onClick={() => setDirection("")}>Cambiar direccion</button>
          </Background>
        ))}
      </Slider>
    </Box>
  );
}
