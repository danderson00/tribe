
//
window.__appendStyle = function (content) {
    var element = document.getElementById('__tribeStyles');
    if (!element) {
        element = document.createElement('style');
        element.className = '__tribe';
        element.id = '__tribeStyles';
        document.getElementsByTagName('head')[0].appendChild(element);
    }

    if(element.styleSheet)
        element.styleSheet.cssText += content;
    else
        element.appendChild(document.createTextNode(content));
};//
window.__appendStyle('.trigger{-webkit-transition:all 250ms ease-in-out;transition:all 250ms ease-in-out}.fade.in.prepare{opacity:0}.fade.in.trigger{opacity:1}.fade.out.prepare{opacity:1}.fade.out.trigger{opacity:0}.slideRight.in.prepare{-webkit-transform:translateX(-100%);transform:translateX(-100%)}.slideRight.in.trigger{-webkit-transform:translateX(0);transform:translateX(0)}.slideRight.out.trigger{-webkit-transform:translateX(100%);transform:translateX(100%)}.slideLeft.in.prepare{-webkit-transform:translateX(100%);transform:translateX(100%)}.slideLeft.in.trigger{-webkit-transform:translateX(0);transform:translateX(0)}.slideLeft.out.trigger{-webkit-transform:translateX(-100%);transform:translateX(-100%)}.slideDown.in.prepare{-webkit-transform:translateY(-100%);transform:translateY(-100%)}.slideDown.in.trigger{-webkit-transform:translateY(0);transform:translateY(0)}.slideDown.out.trigger{-webkit-transform:translateY(100%);transform:translateY(100%)}.slideUp.in.prepare{-webkit-transform:translateY(100%);transform:translateY(100%)}.slideUp.in.trigger{-webkit-transform:translateY(0);transform:translateY(0)}.slideUp.out.trigger{-webkit-transform:translateY(-100%);transform:translateY(-100%)}');