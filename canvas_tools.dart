import "dart:html";
import "dart:math";

class CanvasTools {
  static CanvasElement configureSquareCanvas(
      {String elementId = "canvas", num maxSizeProportion = 0.8}) {
    CanvasElement canvas = querySelector("#$elementId");

    var smallerDimension = min(window.innerWidth, window.innerHeight);
    var size = (smallerDimension * maxSizeProportion).round();

    canvas.width = size;
    canvas.height = size;

    return canvas;
  }
}
