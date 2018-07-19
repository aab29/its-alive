import "dart:html";
import "grid.dart";
import "dart:async";

class Simulation {
  CanvasElement _canvas;
  CanvasRenderingContext2D _context;

  double _canvasSize;

  Grid _grid;

  Timer _timer = new Timer(Duration.zero, () {});

  Simulation(this._canvas, this._context) {
    _canvasSize = _canvas.width.toDouble();
    _grid = new Grid(_canvasSize);
    _startAnimating();
  }

  void _startAnimating() {
    window.requestAnimationFrame(_update);
  }

  void _update(num time) {
    _timer.cancel();

    var duration = new Duration(milliseconds: 50);
    _timer = new Timer(duration, () {

      _grid.draw(_context, time);
      _grid.update();

      _startAnimating();

    });
  }
}
