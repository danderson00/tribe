$.mockjax({
    url: '<%= (data.basePath || '') + pathRelativeToConfig %>',
    responseText: '<%= T.embedString(content) %>',
    responseTime: 0
}); 