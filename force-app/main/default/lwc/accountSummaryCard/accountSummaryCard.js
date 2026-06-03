import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';

const FIELDS = [
    NAME_FIELD,
    PHONE_FIELD,
    INDUSTRY_FIELD,
    REVENUE_FIELD
];

export default class AccountSummaryCard
extends LightningElement {

    @api recordId;

    @wire(getRecord, {
        recordId: '$recordId',
        fields: FIELDS
    })

    account;

    get name() {
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

    get customerStatus() {

        if(this.revenue > 10000000) {
            return 'Premium Customer';
        }

        if(this.revenue > 1000000) {
            return 'Gold Customer';
        }

        return 'Standard Customer';
    }
}