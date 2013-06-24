(function() {
    Samples = window.Samples || {};
    var sample = Samples['<%=pathRelativeToInclude.withoutExtension()%>'] || [];
    sample.push({
        header: '<%=path.extension().toString().toUpperCase()%>',
        content: '<pre class="highlight"><%=embedString(content).replace(/\</g, "&lt;")%></pre>'
    });
    Samples['<%=pathRelativeToInclude.withoutExtension()%>'] = sample;
})();

