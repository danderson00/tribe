ko.validation.rules['date'] = {
    validator: function (value, validate) {
        return !value || (validate && Dates.tryParseDate(value));
    },
    message: 'Please enter a proper date'
};