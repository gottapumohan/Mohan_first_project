import { LightningElement, track } from 'lwc';

import getAccounts
from '@salesforce/apex/AccountPaginationController.getAccounts';

import getTotalAccounts
from '@salesforce/apex/AccountPaginationController.getTotalAccounts';

const COLUMNS = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Phone', fieldName: 'Phone' }
];

export default class AccountPagination extends LightningElement {

    @track accounts = [];

    columns = COLUMNS;

    pageSize = 20;

    offsetValue = 0;

    totalRecords = 0;

    startRecord = 0;

    endRecord = 0;

    connectedCallback() {

        this.loadAccounts();

        getTotalAccounts()
            .then(result => {

                this.totalRecords = result;

            })
            .catch(error => {

                console.error(error);

            });
    }

    loadAccounts() {

        getAccounts({
            pageSize: this.pageSize,
            offsetValue: this.offsetValue
        })
        .then(result => {

            this.accounts = result;

            this.startRecord =
                this.offsetValue + 1;

            this.endRecord =
                this.offsetValue + result.length;

        })
        .catch(error => {

            console.error(error);

        });
    }

    handleNext() {

        this.offsetValue =
            this.offsetValue + this.pageSize;

        this.loadAccounts();
    }

    handlePrevious() {

        this.offsetValue =
            this.offsetValue - this.pageSize;

        this.loadAccounts();
    }

    get disablePrevious() {

        return this.offsetValue === 0;
    }

    get disableNext() {

        return (
            this.offsetValue + this.pageSize
            >= this.totalRecords
        );
    }
}