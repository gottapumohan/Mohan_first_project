import { LightningElement, wire }
from 'lwc';

import {
    publish,
    MessageContext
}
from 'lightning/messageService';

import CUSTOMER_CHANNEL
from '@salesforce/messageChannel/CustomerMessageChannel__c';

export default class CustomerSearch
extends LightningElement {

    accountNumber;

    @wire(MessageContext)
    messageContext;

    handleChange(event) {

        this.accountNumber =
            event.target.value;
    }

    publishMessage() {

        const payload = {

            accountNumber:
            this.accountNumber
        };

        publish(

            this.messageContext,

            CUSTOMER_CHANNEL,

            payload

        );
    }
}