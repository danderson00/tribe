TC.registerModel(function(pane) {
    this.columns = mapColumns();
    this.rows = mapRows();
    
    function mapColumns() {
        return TC.Utils.map(pane.data[0], function(value, key) {
            return key;
        });
    }
    
    function mapRows() {
        return TC.Utils.map(pane.data, function (row) {
            return TC.Utils.map(row, function(value) {
                return value.toString();
            });
        });
    }
});