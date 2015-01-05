Ext.define('ConferenceApp.model.SponsorshipCategory', {
    extend: 'ConferenceApp.model.Base',
    fields: [{
        name:'_id'
    },{
        name: 'name'
    }, {
        name: 'currency'
    }, {
        name: 'price'
    }, {
        name: 'amount',
        convert: function(value, record) {
            var amount = record.get('currency') + record.get('price');
            return amount;
        }
    }]
});
