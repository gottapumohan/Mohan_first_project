import {
    LightningElement,
    wire
} from 'lwc';

import {
    publish,
    MessageContext
} from 'lightning/messageService';

import CUSTOMER_CHANNEL
from '@salesforce/messageChannel/CustomerMessageChannel__c';

export default class CustomerSearch
extends LightningElement {

    customerId;

    @wire(MessageContext)
    messageContext;

    handleChange(event) {

        this.customerId =
            event.target.value;
    }

    publishMessage() {

        const payload = {

            customerId:
            this.customerId
        };

        publish(

            this.messageContext,

            CUSTOMER_CHANNEL,

            payload

        );
    }
}