import {
    LightningElement,
    api,
    wire
} from 'lwc';

import {
    getRecord,
    getFieldValue
} from 'lightning/uiRecordApi';

import NAME_FIELD
from '@salesforce/schema/Account.Name';

import PHONE_FIELD
from '@salesforce/schema/Account.Phone';

import INDUSTRY_FIELD
from '@salesforce/schema/Account.Industry';

import REVENUE_FIELD
from '@salesforce/schema/Account.AnnualRevenue';

const FIELDS = [
    NAME_FIELD,
    PHONE_FIELD,
    INDUSTRY_FIELD,
    REVENUE_FIELD
];

export default class AccountDashboard
extends LightningElement {

    @api recordId;

    isLoading = true;

    hasRendered = false;

    error;

    constructor() {

        super();

        console.log(
            'Constructor Executed'
        );
    }

    connectedCallback() {

        console.log(
            'Connected Callback Executed'
        );
    }

    @wire(getRecord,{
        recordId:'$recordId',
        fields:FIELDS
    })
    account({data,error}) {

        if(data) {

            this.isLoading = false;

            this.error = undefined;
        }

        else if(error) {

            this.error = error;

            this.isLoading = false;
        }
    }

    renderedCallback() {

        if(this.hasRendered) {

            return;
        }

        this.hasRendered = true;

        console.log(
            'Rendered Callback Executed'
        );
    }

    disconnectedCallback() {

        console.log(
            'Component Removed'
        );
    }

    get accountName() {

        return getFieldValue(
            this.account.data,
            NAME_FIELD
        );
    }

    get phone() {

        return getFieldValue(
            this.account.data,
            PHONE_FIELD
        );
    }

    get industry() {

        return getFieldValue(
            this.account.data,
            INDUSTRY_FIELD
        );
    }

    get revenue() {

        return getFieldValue(
            this.account.data,
            REVENUE_FIELD
        );
    }

    get customerCategory() {

        if(this.revenue > 10000000) {

            return 'Premium Customer';
        }

        if(this.revenue > 1000000) {

            return 'Gold Customer';
        }

        return 'Standard Customer';
    }
}