import { Item } from './RTItem';


export class Transaction{

        constructor(
                public total: number,
                public items?: Item[],
                public subItems?: Item[],
                public subtotal?: number
                
                ){
                
        }
}