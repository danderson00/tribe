T.registerModel(function(pane) {
    this.columns = mapColumns();
    this.rows = mapRows();
    
    function mapColumns() {
        return T.Utils.map(pane.data[0], function(value, key) {
            return key;
        });
    }
    
    function mapRows() {
        return T.Utils.map(pane.data, function (row) {
            return T.Utils.map(row, function(value) {
                return value.toString();
            });
        });
    }
});