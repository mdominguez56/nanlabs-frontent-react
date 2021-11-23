import React, { useState, useEffect } from "react";
import "./Carousel.css";
import axios from "axios";
import Imgix from "react-imgix";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Container,
  Button,
} from "@chakra-ui/react";
import {
  BiLeftArrowAlt,
  BiRightArrowAlt,
  BiUpArrowAlt,
  BiDownArrowAlt,
} from "react-icons/bi";
import Slider from "react-slick";

const settings = {
  dots: false,
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
  const top = useBreakpointValue({ base: "90%", md: "35%" });
  const side = useBreakpointValue({ base: "30%" });
  const [direction, setDirection] = useState("");
  const [orient, setOrient] = useState();
  const [cards, setCards] = useState(null);
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setCards(response.data);
    });
  }, []);

  if (!cards) return null;

  return (
    <Box position={"relative"} overflow={"hidden"}>
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
          <>
            <Container height="500px" position="relative">
              <Imgix
                src={card.url}
                imgixParams={{ flip: direction, orient: orient }}
              />
            </Container>
          </>
        ))}
      </Slider>
      <div className="button-container">
        <div className="button-container__direction">
          <Button
            colorScheme="teal"
            size="md"
            onClick={() => setDirection("hv")}
          >
            Change direction
            <BiDownArrowAlt />
          </Button>
          <Button colorScheme="blue" onClick={() => setDirection("")}>
            Change direction
            <BiUpArrowAlt />
          </Button>
        </div>
        <div className="button-container__orient">
          <Button colorScheme="teal" size="md" onClick={() => setOrient(1)}>
            Orient 1
          </Button>
          <Button colorScheme="teal" size="md" onClick={() => setOrient(2)}>
            Orient 2
          </Button>
        </div>
        <div className="button-container__orient">
          <Button colorScheme="teal" size="md" onClick={() => setOrient(3)}>
            Orient 3
          </Button>
          <Button colorScheme="teal" size="md" onClick={() => setOrient(4)}>
            Orient 4
          </Button>
        </div>
        <div className="button-container__orient">
          <Button colorScheme="teal" size="md" onClick={() => setOrient(5)}>
            Orient 5
          </Button>
          <Button colorScheme="teal" size="md" onClick={() => setOrient(6)}>
            Orient 6
          </Button>
        </div>
        <div className="button-container__orient">
          <Button colorScheme="teal" size="md" onClick={() => setOrient(7)}>
            Orient 7
          </Button>
          <Button colorScheme="teal" size="md" onClick={() => setOrient(8)}>
            Orient 8
          </Button>
        </div>
      </div>
    </Box>
  );
}
