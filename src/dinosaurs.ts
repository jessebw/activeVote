export class Dinosaur {
  foodIntake = 1
  extinct = true
  amountOfFoodEaten = 0
  private _amountOfChocolateEaten = 0
  get amountOfChocolateEaten () {
    return this._amountOfChocolateEaten
  }
  set amountOfChocolateEaten (amountOfChocolateEaten) {
    this._amountOfChocolateEaten = amountOfChocolateEaten * 2
  }
  constructor (amountAlreadyEaten?: number, extinct?: boolean) {
    this.amountOfFoodEaten = amountAlreadyEaten || 0
    this.extinct = extinct === undefined ? true : extinct
  }
  bringBackToLife () {
    this.extinct = false
  }
  eatFood (amount = 1) {
    if (this.extinct === true) {
      throw new Error("Sorry this Dino is Dead, it can't eat food!")
    }
    this.amountOfFoodEaten =
      this.amountOfFoodEaten + (amount === undefined ? this.foodIntake : amount)
  }
}

export class CarnivorDinosaur extends Dinosaur {
  typeOfFood = 'meat'
}

export class HerbavorDinosaur extends Dinosaur {
  typeOfFood = 'plants'
  foodIntake = 2
}
