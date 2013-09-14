(function () {
    TF = window.TF || {};
    TF.Dates = {};
    var dates = TF.Dates;

    dates.format = 'dd/mm/yy';
    
    function getDaysInMonth(year, month) {
        return 32 - daylightSavingAdjust(new Date(year, month, 32)).getDate();
    };

    function daylightSavingAdjust(date) {
        if (!date) return null;
        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
        return date;
    };

    var shortYearCutoff = '+10';
    var dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    dates.tryParseDate = function (value, format) {
        try {
            return dates.parseDate(value, format);
        } catch (e) {
            return null;
        }
    };

    dates.parseDate = function (value, format) {
        if (!value)
            throw 'Invalid arguments';
        if (!format)
            format = dates.format;
        value = (typeof value == 'object' ? value.toString() : value + '');
        if (value == '')
            return null;
        var year = -1;
        var month = -1;
        var day = -1;
        var doy = -1;
        var literal = false;
        // Check whether a format character is doubled
        var lookAhead = function (match) {
            var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
            if (matches)
                iFormat++;
            return matches;
        };
        // Extract a number from the string value
        var getNumber = function (match) {
            var isDoubled = lookAhead(match);
            var size = (match == '@' ? 14 : (match == '!' ? 20 :
                (match == 'y' && isDoubled ? 4 : (match == 'o' ? 3 : 2))));
            var digits = new RegExp('^\\d{1,' + size + '}');
            var num = value.substring(iValue).match(digits);
            if (!num)
                throw 'Missing number at position ' + iValue;
            iValue += num[0].length;
            return parseInt(num[0], 10);
        };
        // Extract a name from the string value and convert to an index
        var getName = function (match, shortNames, longNames) {
            var names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
                return [[k, v]];
            }).sort(function (a, b) {
                return -(a[1].length - b[1].length);
            });
            var index = -1;
            $.each(names, function (i, pair) {
                var name = pair[1];
                if (value.substr(iValue, name.length).toLowerCase() == name.toLowerCase()) {
                    index = pair[0];
                    iValue += name.length;
                    return false;
                }
            });
            if (index != -1)
                return index + 1;
            else
                throw 'Unknown name at position ' + iValue;
        };
        // Confirm that a literal character matches the string value
        var checkLiteral = function () {
            if (value.charAt(iValue) != format.charAt(iFormat))
                throw 'Unexpected literal at position ' + iValue;
            iValue++;
        };
        var iValue = 0;
        for (var iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal)
                if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                    literal = false;
                else
                    checkLiteral();
            else
                switch (format.charAt(iFormat)) {
                    case 'd':
                        day = getNumber('d');
                        break;
                    case 'D':
                        getName('D', dayNamesShort, dayNames);
                        break;
                    case 'o':
                        doy = getNumber('o');
                        break;
                    case 'm':
                        month = getNumber('m');
                        break;
                    case 'M':
                        month = getName('M', monthNamesShort, monthNames);
                        break;
                    case 'y':
                        year = getNumber('y');
                        break;
                    case '@':
                        var date = new Date(getNumber('@'));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case '!':
                        var date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "'":
                        if (lookAhead("'"))
                            checkLiteral();
                        else
                            literal = true;
                        break;
                    default:
                        checkLiteral();
                }
        }
        if (iValue < value.length) {
            throw "Extra/unparsed characters found in date: " + value.substring(iValue);
        }
        if (year == -1)
            year = new Date().getFullYear();
        else if (year < 100)
            year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                (year <= shortYearCutoff ? 0 : -100);
        if (doy > -1) {
            month = 1;
            day = doy;
            do {
                var dim = getDaysInMonth(year, month - 1);
                if (day <= dim)
                    break;
                month++;
                day -= dim;
            } while (true);
        }
        var date = daylightSavingAdjust(new Date(year, month - 1, day));
        if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
            throw 'Invalid date';
        return date;
    };

    dates.formatDate = function (date, format) {
        if (!format)
            format = dates.format;
        if (!date)
            return '';
        if (date.constructor === String)
            date = dates.parseDate(date, format);

        // Check whether a format character is doubled
        var lookAhead = function (match) {
            var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
            if (matches)
                iFormat++;
            return matches;
        };
        // Format a number, with leading zero if necessary
        var formatNumber = function (match, value, len) {
            var num = '' + value;
            if (lookAhead(match))
                while (num.length < len)
                    num = '0' + num;
            return num;
        };
        // Format a name, short or long as requested
        var formatName = function (match, value, shortNames, longNames) {
            return (lookAhead(match) ? longNames[value] : shortNames[value]);
        };
        var output = '';
        var literal = false;
        if (date)
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal)
                    if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                        literal = false;
                    else
                        output += format.charAt(iFormat);
                else
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            output += formatNumber('d', date.getDate(), 2);
                            break;
                        case 'D':
                            output += formatName('D', date.getDay(), dayNamesShort, dayNames);
                            break;
                        case 'o':
                            output += formatNumber('o',
                                Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case 'm':
                            output += formatNumber('m', date.getMonth() + 1, 2);
                            break;
                        case 'M':
                            output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
                            break;
                        case 'y':
                            output += (lookAhead('y') ? date.getFullYear() :
                                (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
                            break;
                        case '@':
                            output += date.getTime();
                            break;
                        case '!':
                            output += date.getTime() * 10000 + this._ticksTo1970;
                            break;
                        case "'":
                            if (lookAhead("'"))
                                output += "'";
                            else
                                literal = true;
                            break;
                        default:
                            output += format.charAt(iFormat);
                    }
            }
        return output;
    };
})();
