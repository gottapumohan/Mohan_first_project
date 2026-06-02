import { LightningElement } from 'lwc';
import createAccount from '@salesforce/apex/AccountController.createAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountCreator extends LightningElement {

    accountName = '';
    industry = '';
    phone = '';

    handleNameChange(event) {
        this.accountName = event.target.value;
    }

    handleIndustryChange(event) {
        this.industry = event.target.value;
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    handleCreateAccount() {

        createAccount({
            accName: this.accountName,
            industry: this.industry,
            phone: this.phone
        })
        .then(result => {

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account Created Successfully',
                    variant: 'success'
                })
            );

            // Clear variables
            this.accountName = '';
            this.industry = '';
            this.phone = '';

            // Clear UI fields
            const fields = this.template.querySelectorAll('lightning-input');
            if(fields) {
                fields.forEach(field => {
                    field.value = '';
                });
            }

        })
        .catch(error => {

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error?.body?.message || 'Please enter correct details',
                    variant: 'error'
                })
            );

        });
    }
}