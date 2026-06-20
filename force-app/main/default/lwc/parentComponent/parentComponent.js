import { LightningElement } from 'lwc';

export default class ParentComponent
extends LightningElement {

    customerName;
    email;
    phone;
    city;
    industry;

    handleCustomerData(event) {

        this.customerName =
            event.detail.customerName;

        this.email =
            event.detail.email;

        this.phone =
            event.detail.phone;

        this.city =
            event.detail.city;

        this.industry =
            event.detail.industry;
    }
}