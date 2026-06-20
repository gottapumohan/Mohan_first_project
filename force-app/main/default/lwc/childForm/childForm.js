import { LightningElement } from 'lwc';

export default class ChildForm extends LightningElement {

    customerName;
    email;
    phone;
    city;
    industry;

    handleName(event) {
        this.customerName = event.target.value;
    }

    handleEmail(event) {
        this.email = event.target.value;
    }

    handlePhone(event) {
        this.phone = event.target.value;
    }

    handleCity(event) {
        this.city = event.target.value;
    }

    handleIndustry(event) {
        this.industry = event.target.value;
    }

    sendData() {

        const customerData = {

            customerName : this.customerName,
            email : this.email,
            phone : this.phone,
            city : this.city,
            industry : this.industry

        };

        const eventObj = new CustomEvent(

            'customerdata',

            {
                detail : customerData
            }

        );

        this.dispatchEvent(eventObj);
    }
}