public with sharing class AccountController {

    @AuraEnabled
    public static Id createAccount(
        String accName,
        String industry,
        String phone
    ) {

        if(String.isBlank(accName)){
            throw new AuraHandledException('Account Name is required');
        }

        if(phone != null && phone.length() != 10){
            throw new AuraHandledException('Phone number must be 10 digits');
        }

        Account acc = new Account(
            Name = accName,
            Industry = industry,
            Phone = phone
        );

        insert acc;

        return acc.Id;
    }
}