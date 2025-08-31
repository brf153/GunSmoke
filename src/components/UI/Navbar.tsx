import { Box, Button, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const [iconVisible, setIconVisible] = useState(false);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          p: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          position: "relative",
          gap: 24,
        }}
      >
        <Typography variant="h6" component="div" sx={{ mr: 12 }}>
          Works
        </Typography>
        <Typography variant="h6" component="div" sx={{ mr: 24 }}>
          About
        </Typography>
        <img
          src="/images/logo.png"
          alt="Logo"
          width={250}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <Typography variant="h6" component="div" sx={{ ml: 24 }}>
          Family
        </Typography>
        <Typography variant="h6" component="div" sx={{ ml: 12 }}>
          Contact
        </Typography>
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
          zIndex: 10
        }}
      >
        <Typography sx={{ fontStyle: "inherit" }}>Paris 8:56 AM</Typography>
        <hr
          style={{
            flex: 1,
            alignSelf: "center",
            border: "none",
            height: "1px",
            background: "rgba(204, 204, 204, 0.15)",
          }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
            
          <Button
            component={motion.button}
            initial={{ paddingRight: "1rem" }}
            animate={{ paddingRight: iconVisible ? "2.5rem" : "1rem" }}
            transition={{ duration: 0.25 }}
            sx={{
              borderRadius: "2rem",
              textTransform: "uppercase",
              background: "rgba(204, 204, 204, 0.15)",
              backdropFilter: "blur(0.625rem)",
              display: "flex",
              alignItems: "center",
              p: 0.5,
              px: 2,
              position: "relative", // important for absolute icon
            }}
            color="inherit"
            onMouseEnter={() => setIconVisible(true)}
            onMouseLeave={() => setIconVisible(false)}
          >
            <Typography
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "inherit",
              }}
              component="span"
            >
              contact@gunsmoke.fr
            </Typography>

            <AnimatePresence>
              {iconVisible && (
                <motion.span
                  key="copy-icon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "absolute",
                    right: 14,
                  }}
                >
                  <ContentCopyIcon sx={{ fontSize: "1rem" }} />
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          <Button
            sx={{
              borderRadius: "2rem",
              textDecoration: "uppercase",
              backgroundColor: "white",
              backdropFilter: "blur(0.625rem)",
              p: 0.5,
              px: 2,
              fontWeight: 540,
              color: "black",
              ":hover": { backgroundColor: "#98F198" },
            }}
            variant="contained"
          >
            Contact Us
          </Button>
        </Box>

        <hr
          style={{
            flex: 1,
            alignSelf: "center",
            border: "none",
            height: "1px",
            background: "rgba(204, 204, 204, 0.15)",
          }}
        />

        <Typography
          sx={{
            fontStyle: "inherit",
            textDecoration: "underline",
            textUnderlineOffset: "0.3rem",
          }}
        >
          1ᵗᵉʳ rue Morère - Paris 14ᵉ
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
