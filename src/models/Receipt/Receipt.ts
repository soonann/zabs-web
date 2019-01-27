import { Order } from './ROrder';
import { Payment } from './RPayment';
import { Merchant } from './../Merchant';
import { Transaction } from './RTransaction';
import { Zabs } from './RZabs';





export class Receipt{

        
        constructor(
                public date: number,
                public transaction: Transaction,
                public isManualEntry: boolean,
                public isVisible: boolean,
                public isSaved:boolean,
                public category:string,
                
                public manualMerchantName?:string,
                public manualImgSrc?: string,
                public manualImgExtract?: boolean,
                public manualImgPath?: string,
                public isLoading?: boolean,

                public date_dt?: Date,
                public merchantId?:string,
                public merchant?:Merchant,
                // add expense item?
                public payment?: Payment,
                public order?: Order,
                public key?: string,
                public zabs?:Zabs,
                public isSelected?:boolean
                
        ){
             this.isSelected= false;
         

        }


}