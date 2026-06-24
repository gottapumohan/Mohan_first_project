
import { LightningElement, track } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getAccounts from '@salesforce/apex/AccountPaginationController.getAccounts';
import getTotalAccounts from '@salesforce/apex/AccountPaginationController.getTotalAccounts';

const COLUMNS = [
    {
        label: 'Account Name',
        fieldName: 'Name',
        editable: true
    },
    {
        label: 'Industry',
        fieldName: 'Industry',
        editable: true
    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        editable: true
    }
];

export default class AccountPagination extends LightningElement {

    @track accounts = [];

    columns = COLUMNS;
    draftValues = [];

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

    async handleSave(event) {

        const recordInputs =
            event.detail.draftValues.map(
                draft => ({
                    fields: { ...draft }
                })
            );

        try {

            await Promise.all(
                recordInputs.map(
                    record => updateRecord(record)
                )
            );

            const updatedRecords =
                event.detail.draftValues;

            updatedRecords.forEach(updated => {

                const row =
                    this.accounts.find(
                        acc => acc.Id === updated.Id
                    );

                if(row){
                    Object.assign(row, updated);
                }
            });

            this.accounts = [...this.accounts];

            this.draftValues = [];

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Records Updated Successfully',
                    variant: 'success',
                    mode: 'dismissable'
                })
            );

        }
        catch(error){

            console.error(error);

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body?.message || 'Update Failed',
                    variant: 'error',
                    mode: 'sticky'
                })
            );
        }
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

