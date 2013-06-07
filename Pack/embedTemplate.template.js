$('head')
    .append('<script type="text/template" id="template-<%=modelPath(component, pathRelativeToInclude).asMarkupIdentifier()%>"><%=embedString(content)%></script>');
