Samples = window.Samples || {};
Samples['<%=name%>'] = Samples['<%=name%>'] || [];
Samples['<%=name%>'].push({
    filename: '<%=pathRelativeToInclude%>',
    icon: 'Images/icon.<%=pathRelativeToInclude.extension()%>.png',
    content: '<pre class="prettyprint"><%=embedString(content).replace(/\</g, "&lt;")%></pre>'
});