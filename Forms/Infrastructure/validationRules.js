ko.validation.rules['date'] = {
    validator: function (value, validate) {
        return !value || (validate && TF.Dates.tryParseDate(value));
    },
    message: 'Please enter a proper date'
};