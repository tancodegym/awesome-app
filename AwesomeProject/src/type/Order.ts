export class Order {
  id: number;
  name: string;
  image: string;
  quantity: number;
  ingredients: string[];
  constructor(
    id: number,
    name: string,
    image: string,
    quantity: number,
    ingredients: string[],
  ) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.image = image;
    this.ingredients = ingredients;
  }
}
