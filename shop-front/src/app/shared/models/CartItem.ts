import { Plant } from "./Plant";

export class CartItem {
    constructor(public plant:Plant ) { }
    quantity:number = 1;
    price: number = this.plant.price
}