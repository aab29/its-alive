import "dart:html";

import "canvas_tools.dart";
import "simulation.dart";

void main() {
  var canvas = CanvasTools.configureSquareCanvas();
  var context = canvas.getContext("2d") as CanvasRenderingContext2D;

  new Simulation(canvas, context);
}
