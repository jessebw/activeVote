import React, { useState } from "react";
import { Dinosaur, CarnivorDinosaur, HerbavorDinosaur } from "./dinosaurs";

export const Lesson = () => {
  const [count, setCount] = useState(0);
  const [dinosaurs, setDinosaurs] = useState<CarnivorDinosaur[]>([]);

  return (
    <div>
      <button
        onClick={() => {
          setDinosaurs([...dinosaurs, new CarnivorDinosaur(5)]);
        }}
      >
        Create Carnivorus Dinosaur
      </button>
      <button
        onClick={() => {
          setDinosaurs([...dinosaurs, new HerbavorDinosaur(0, false)]);
        }}
      >
        Create Herbavours Dinosaur
      </button>
      {dinosaurs.map((dino, index) => {
        return (
          <div key={index}>
            This Dino is {dino.extinct ? " extinct" : " not extinct"}
            <button
              onClick={() => {
                dino.bringBackToLife();
                setCount(count + 1);
              }}
            >
              bring it back
            </button>
            <button
              onClick={() => {
                dino.eatFood();
                setCount(count + 1);
              }}
            >
              Feed Dino
            </button>
            Food eaten by your Dino = {dino.amountOfFoodEaten}
            <br></br>
            This dino eats {dino.typeOfFood}
            <button
              onClick={() => {
                dino.eatFood(dino.amountOfFoodEaten);
                setCount(count + 1);
              }}
            >
              Double My Food
            </button>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
};
