import {
    LightningElement,
    api
} from 'lwc';

export default class OpportunityRiskAnalysis
extends LightningElement {

    @api opportunityName;

    @api stageName;

    @api amount;

    @api closeDate;

    @api accountId;

    get dealSize() {

        if(this.amount >= 1000000) {

            return 'Enterprise Deal';
        }

        if(this.amount >= 100000) {

            return 'Mid Market Deal';
        }

        return 'Small Deal';
    }

    get riskCategory() {

        if(
            this.stageName === 'Prospecting'
            &&
            this.amount > 500000
        ) {

            return 'High Risk';
        }

        if(
            this.stageName === 'Negotiation'
        ) {

            return 'Medium Risk';
        }

        return 'Low Risk';
    }

    get approvalRequired() {

        return this.amount > 500000
            ? 'Yes'
            : 'No';
    }
}