import {
    NavigationMixin
}
from 'lightning/navigation';

export default class AccountList

extends NavigationMixin(
    LightningElement
){

    handleRowAction(event){

        const row =
            event.detail.row;

        this[NavigationMixin.Navigate]({

            type:
                'standard__recordPage',

            attributes:{

                recordId:
                    row.Id,

                objectApiName:
                    'Account',

                actionName:
                    'view'
            }
        });
    }
}