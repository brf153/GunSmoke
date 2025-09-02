import { Box, Typography } from "@mui/material";
import { mainContent } from "../../constants/constants";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Stack from "./Stack";

const Main = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [iconVisible, setIconVisible] = useState("");
  const [right, setRight] = useState(0);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [defaultMousePosition, setDefaultMousePosition] = useState(0);
  const [cards, setCards] = useState(mainContent);
   const [activeCard, setActiveCard] = useState<number | null>(null);
   const [prevCard, setPrevCard] = useState<number | null>(0);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (divRef.current) {
        setRight(
          ev.clientX - divRef.current.getBoundingClientRect().left - 125
        );
      }
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        py: 4,
      }}
    >
      <Box
        sx={{
          position: "relative",
          flex: 1,
          width: "95%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Contact background */}
        <Box
          sx={{
            position: "absolute",
            inset: "0 0 auto",
            order: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "14rem",
              letterSpacing: "-0.05em",
              fontFamily: "'PPFragmentSerif', sans-serif",
            }}
          >
            Contact
          </Typography>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            zIndex: 1,
            width: "100%",
            pt: 2,
            height: "80%",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
          ref={divRef}
          onMouseEnter={() => setMouseEnter(true)}
          onMouseLeave={() => {
            setMouseEnter(false);
            setDefaultMousePosition(right);
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -15,
              left: mouseEnter ? right : defaultMousePosition,
            }}
          >
            <Stack
              sensitivity={180}
              sendToBackOnClick={false}
              cardDimensions={{ width: "18vw", height: "50vh" }}
              cardsData={cards}
              setCards={setCards}
              activeCard={activeCard}
              prevCard={prevCard}
              setPrevCard={setPrevCard}
            />
          </Box>
          {mainContent.map((item) => (
            <Box
              key={item.id}
              // onMouseEnter={() => onSendToBack(item.id)}
              onMouseEnter={() => setActiveCard(item.id)}
              sx={{
                textAlign: "center",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                height: "100%",
                gap: "2px",
                zIndex: 2
              }}
            >
              <Typography sx={{fontSize: "3vmin"}} component={"span"}>{item.name}</Typography>
              <Typography sx={{fontSize: "2vmin"}} component={"span"}>{item.position}</Typography>
              <Box
                component={motion.div}
                initial={{ paddingRight: "0rem" }}
                animate={{
                  paddingRight: iconVisible === item.email ? "1.5rem" : "0rem",
                }}
                transition={{ duration: 0.25 }}
                sx={{
                  color: "#7C7D7F",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setIconVisible(item.email)}
                onMouseLeave={() => setIconVisible("")}
              >
                <Typography
                  sx={{
                    textDecoration: "underline",
                    textUnderlineOffset: "0.3em",
                    fontSize: "2vmin"
                  }}
                >
                  {item.email}
                </Typography>
                <AnimatePresence>
                  {iconVisible === item.email && (
                    <motion.span
                      key="copy-icon"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        display: "flex",
                        position: "absolute",
                        right: 1,
                      }}
                    >
                      <ContentCopyIcon sx={{ fontSize: "1rem" }} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Box>
              {/* <img src={item.img} alt={item.name} /> */}
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "95%",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          px: 4,
          gap: 2,
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h6" component="div">
          Instagram
        </Typography>
        <hr
          style={{
            flex: 1,
            alignSelf: "center",
            border: "none",
            height: "1px",
            background: "rgba(204, 204, 204, 0.15)",
          }}
        />
        <Typography variant="h6" component="div">
          LinkedIn
        </Typography>
      </Box>
    </Box>
  );
};

export default Main;
