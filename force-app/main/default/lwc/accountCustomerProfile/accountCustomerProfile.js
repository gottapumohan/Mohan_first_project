import {LightningElement, api} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class AccountCustomerProfile
extends LightningElement {

    @api recordId;

    handleSuccess(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message:
                'Account updated successfully please do next update',
                variant: 'success'
            })
        );
    }

    handleError(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Account successfully updated',
                variant: 'success'
            })
        );
    }

}