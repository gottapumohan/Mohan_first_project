import {
    LightningElement,
    wire
}
from 'lwc';

import {
    subscribe,
    MessageContext
}
from 'lightning/messageService';

import CUSTOMER_CHANNEL
from '@salesforce/messageChannel/CustomerMessageChannel__c';

export default class CustomerProfile
extends LightningElement {

    customerId;

    subscription = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {

        this.subscribeToChannel();
    }

    subscribeToChannel() {

        if(this.subscription) {

            return;
        }

        this.subscription = subscribe(

            this.messageContext,

            CUSTOMER_CHANNEL,

            (message) => {

                this.customerId =
                    message.customerId;
            }

        );
    }
}