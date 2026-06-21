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
from '@salesforce/schema/Opportunity.Name';

import STAGE_FIELD
from '@salesforce/schema/Opportunity.StageName';

import AMOUNT_FIELD
from '@salesforce/schema/Opportunity.Amount';

import CLOSEDATE_FIELD
from '@salesforce/schema/Opportunity.CloseDate';

import ACCOUNT_FIELD
from '@salesforce/schema/Opportunity.AccountId';

const FIELDS = [

    NAME_FIELD,
    STAGE_FIELD,
    AMOUNT_FIELD,
    CLOSEDATE_FIELD,
    ACCOUNT_FIELD

];

export default class OpportunityDashboard
extends LightningElement {

    @api recordId;

    @wire(getRecord, {
        recordId: '$recordId',
        fields: FIELDS
    })
    opportunity;

    get opportunityName() {
        return getFieldValue(
            this.opportunity.data,
            NAME_FIELD
        );
    }

    get stageName() {
        return getFieldValue(
            this.opportunity.data,
            STAGE_FIELD
        );
    }

    get amount() {
        return getFieldValue(
            this.opportunity.data,
            AMOUNT_FIELD
        );
    }

    get closeDate() {
        return getFieldValue(
            this.opportunity.data,
            CLOSEDATE_FIELD
        );
    }

    get accountId() {
        return getFieldValue(
            this.opportunity.data,
            ACCOUNT_FIELD
        );
    }
}