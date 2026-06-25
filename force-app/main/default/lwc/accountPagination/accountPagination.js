import { LightningElement, track } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getAccounts from '@salesforce/apex/AccountPaginationController.getAccounts';
import getTotalAccounts from '@salesforce/apex/AccountPaginationController.getTotalAccounts';

const COLUMNS = [
    {
        label: 'Serial Number',
        fieldName: 'SerialNo',
        type: 'text',
        initialWidth: 150

    },

    {
        label: 'Account Name',
        fieldName: 'Name',
        type: 'text',
        sortable: true,
        editable: true
    },

    {
        label: 'Industry',
        fieldName: 'Industry',
        type: 'text',
        sortable: true,
        editable: true
    },

    {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone',
        editable: true
    },

    {
        label: 'Type',
        fieldName: 'Type',
        editable: true
    },

    {
        label: 'Rating',
        fieldName: 'Rating',
        editable: true
    },

    {
        label: 'Annual Revenue',
        fieldName: 'AnnualRevenue',
        type: 'currency',
        editable: true,
        typeAttributes: {
        currencyCode: 'USD'
        }
    },

    {
        label: 'Owner',
        fieldName: 'OwnerName',
        type: 'text'
    }
];

export default class AccountPagination extends LightningElement {

    //----------------------------
    // Datatable
    //----------------------------

    columns = COLUMNS;

    @track accounts = [];

    @track draftValues = [];

    //----------------------------
    // Pagination
    //----------------------------

    pageSize = 20;

    offsetValue = 0;

    totalRecords = 0;

    totalPages = 0;

    currentPage = 1;

    startRecord = 0;

    endRecord = 0;

    //----------------------------
    // Search
    //----------------------------

    searchKey = '';

    //----------------------------
    // Sorting
    //----------------------------

    sortBy = 'Name';

    sortDirection = 'ASC';

    //----------------------------
    // Spinner
    //----------------------------

    isLoading = false;

    //----------------------------
    // Initialization
    //----------------------------

    connectedCallback() {

        this.initializeComponent();

    }

    async initializeComponent() {

        this.isLoading = true;

        try {

            await this.loadTotalRecords();

            await this.loadAccounts();

        }
        catch(error){

            console.error(error);

        }

        this.isLoading = false;

    }

    //----------------------------
    // Load Total Records
    //----------------------------

    async loadTotalRecords(){

        this.totalRecords =
            await getTotalAccounts({
                searchKey : this.searchKey
            });

        this.totalPages =
            Math.ceil(
                this.totalRecords / this.pageSize
            );

    }

    //----------------------------
    // Load Accounts
    //----------------------------

    async loadAccounts(){

        this.isLoading = true;

        try{

            let result =
                await getAccounts({

                    pageSize : this.pageSize,

                    offsetValue : this.offsetValue,

                    searchKey : this.searchKey,

                    sortBy : this.sortBy,

                    sortDirection : this.sortDirection

                });

            this.accounts = result.map((row, index) => {

                return {

                    SerialNo: this.offsetValue + index + 1,

                    ...row,

                    OwnerName: row.Owner
                        ? row.Owner.Name
                        : ''

                };

            });
            console.log(this.accounts);

            this.startRecord =
                this.offsetValue + 1;

            this.endRecord =
                this.offsetValue +
                this.accounts.length;

        }
        catch(error){

            console.error(error);

        }

        this.isLoading = false;

    }

    handleSearch(event) {

        this.searchKey = event.target.value;

        this.offsetValue = 0;

        this.currentPage = 1;

        this.initializeComponent();

    }

    //--------------------------------------
    // Refresh
    //--------------------------------------

    handleRefresh() {

        this.searchKey = '';

        this.offsetValue = 0;

        this.currentPage = 1;

        this.sortBy = 'Name';

        this.sortDirection = 'ASC';

        this.initializeComponent();

    }
    //--------------------------------------
    // Sorting
    //--------------------------------------

    handleSort(event){

        this.sortBy = event.detail.fieldName;

        this.sortDirection = event.detail.sortDirection;

        this.loadAccounts();

    }
    //--------------------------------------
    // Previous
    //--------------------------------------

    handlePrevious(){

        if(this.currentPage > 1){

            this.currentPage--;

            this.offsetValue =
                (this.currentPage - 1) * this.pageSize;

            this.loadAccounts();

        }

    }
    //--------------------------------------
    // Next
    //--------------------------------------

    handleNext(){

        if(this.currentPage < this.totalPages){

            this.currentPage++;

            this.offsetValue =
                (this.currentPage - 1) * this.pageSize;

            this.loadAccounts();

        }
    }
    get disablePrevious(){

        return this.currentPage === 1;

    }

    get disableNext(){

        return this.currentPage === this.totalPages;

    }

    //--------------------------------------
    // Show Toast
    //--------------------------------------

    showToast(title, message, variant) {

        this.dispatchEvent(

            new ShowToastEvent({

                title,

                message,

                variant

            })

        );

    }
    //--------------------------------------
    // Update Local Data
    //--------------------------------------

    updateLocalData(updatedRecords){

        updatedRecords.forEach(updated => {

            const row = this.accounts.find(

                account => account.Id === updated.Id

            );

            if(row){

                Object.assign(row, updated);

            }

        });

        this.accounts = [...this.accounts];

    }
    //--------------------------------------
    // Save Records
    //--------------------------------------

    async handleSave(event){

        this.isLoading = true;

        const updatedFields = event.detail.draftValues;

        const recordInputs = updatedFields.map(

            draft => ({

                fields : {

                    ...draft

                }

            })

        );

        try{

            await Promise.all(

                recordInputs.map(

                    record => updateRecord(record)

                )

            );

            this.updateLocalData(updatedFields);

            this.draftValues = [];

            this.showToast(

                'Success',

                'Records Updated Successfully',

                'success'

            );

        }

        catch(error){

            console.error(error);

            let errorMessage = 'Unknown Error';

            if(error.body){

                if(Array.isArray(error.body)){

                    errorMessage =
                        error.body
                        .map(e => e.message)
                        .join(',');

                }

                else{

                    errorMessage =
                        error.body.message;

                }

            }

            this.showToast(

                'Error',

                errorMessage,

                'error'

            );

        }

        finally{

            this.isLoading = false;

        }

    }

}



