T.Types.Pane.prototype.obtainActor = function (path, scope) {

}

var oldDispose = T.Types.Pane.prototype.dispose;
T.Types.Pane.prototype.dispose = function () {
  

  oldDispose.call(this);
}
