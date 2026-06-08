"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

type CardStackProps = {
  items: {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
  }[];
  offset?: number;
  scaleFactor?: number;
};

export const CardStack = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
}: CardStackProps) => {
  const [cards, setCards] = useState(items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        const firstCard = newArray.shift();
        if (firstCard) {
            newArray.push(firstCard);
        }
        return newArray;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-96 w-full max-w-md">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute h-full w-full"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -offset,
              scale: 1 - index * scaleFactor,
              zIndex: cards.length - index,
              opacity: index < 3 ? 1 : 0,
            }}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
            }}
          >
            <Card className="h-full flex flex-col items-center justify-center text-center p-6 bg-secondary">
               <CardHeader>
                    <div className="flex justify-center mb-2">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <card.icon className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="font-headline">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{card.description}</p>
                </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
