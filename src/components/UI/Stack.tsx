// Stack.tsx - Fixed version
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children }: CardRotateProps) {
  return (
    <motion.div
      style={{
        position: "absolute",
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  sensitivity?: number;
  cardDimensions?: { width: string; height: string };
  sendToBackOnClick?: boolean;
  cardsData?: { id: number; img: string }[];
  onSendToBack?: (id: number) => void;
  activeCard: number | null;
  setCards: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        name: string;
        position: string;
        email: string;
        img: string;
      }[]
    >
  >;
  prevCard: number | null;
  setPrevCard: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Stack({
  sensitivity = 200,
  cardDimensions = { width: "22vw", height: "50vh" },
  cardsData = [],
  setCards,
  activeCard,
  prevCard,
  setPrevCard,
}: StackProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (activeCard !== null) {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        onSendToBack(activeCard);
        setIsAnimating(false);
        setPrevCard(activeCard);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [activeCard]);

  const onSendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      if (index !== -1) {
        // take everything after the card and bring it in front
        const rotated = [...newCards.slice(index), ...newCards.slice(0, index)];
        return rotated;
      }
      return newCards;
    });
  };

  return (
    <div
      className="stack-container"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        position: "relative",
        perspective: "600px",
      }}
    >
      {cardsData.map((card, index) => {
        const isPrevCard = prevCard === card.id;
        const isActiveCard = activeCard === card.id;
        const isSendBack =
          prevCard !== null && activeCard !== null && prevCard < activeCard;
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => onSendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="card"
              animate={{
                // animate progress from 0 -> 1 when sending to back
                "--progress":
                  isAnimating && (isSendBack ? isPrevCard : isActiveCard)
                    ? [0, 1]
                    : 0,
              }}
              initial={{ "--progress": 0 }}
              transition={{
                duration: isAnimating && (isPrevCard || isActiveCard) ? 0.5 : 0.3,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
                position: "absolute",
                transformStyle: "preserve-3d",
                zIndex: cardsData.length - index,

                // CSS variables
                ["--member-pictures-image-index" as any]: index,
                ["--member-pictures-image-real-index" as any]: card.id,
                ["--member-pictures-image-max-rotateZ" as any]: "10deg",
                ["--member-pictures-image-max-translateX" as any]: "100%",
                // the transform uses CSS vars + progress
                transform: `
      translate3d(calc(var(--member-pictures-image-max-translateX) * var(--progress)), 0, 0)
      rotateZ(calc(var(--member-pictures-image-max-rotateZ) * var(--progress)))
    `,
              }}
            >
              <img
                src={card.img}
                alt={`card-${card.id}`}
                className="card-image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  pointerEvents: "none",
                }}
              />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
