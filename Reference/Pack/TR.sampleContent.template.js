Samples = window.Samples || {};
Samples['<%=data.name%>'] = Samples['<%=data.name%>'] || [];
Samples['<%=data.name%>'].push({
    filename: '<%=pathRelativeToInclude%>',
    icon: 'Images/icon.<%=pathRelativeToInclude.extension()%>.png',
    content: '<pre class="prettyprint"><%=T.embedString(content).replace(/\</g, "&lt;")%></pre>'
});