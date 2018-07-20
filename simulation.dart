import "dart:html";
import "grid.dart";
import "dart:async";

enum SimulationState {
  running,
  paused,
  stopped
}

class Simulation {
  CanvasElement _canvas;
  CanvasRenderingContext2D _context;

  double _canvasSize;

  Grid _grid;

  SimulationState _state = SimulationState.stopped;

  Timer _timer = new Timer(Duration.zero, () {});
  Duration _timerDuration = Duration.zero;

  int _animationFrameID;

  NumberInputElement _fpsBox = querySelector("#fps_box");
  ButtonInputElement _pauseButton = querySelector("#pause_button");
  ButtonInputElement _clearButton = querySelector("#clear_button");
  ButtonInputElement _randomizeButton = querySelector("#randomize_button");

  Simulation(this._canvas, this._context) {
    _canvasSize = _canvas.width.toDouble();
    _grid = new Grid(_canvasSize);

    _canvas.draggable = true;

    _canvas.onClick.listen(_onCanvasClicked);
    _canvas.onDragOver.listen(_onCanvasMouseDragged);
    _fpsBox.onInput.listen((_) => _updateFps());
    _pauseButton.onClick.listen(_onPausePressed);
    _clearButton.onClick.listen(_onClearPressed);
    _randomizeButton.onClick.listen(_onRandomizePressed);

    _pauseButton.disabled = false;
    _clearButton.disabled = false;
    _randomizeButton.disabled = false;

    state = SimulationState.running;
  }

  void _stopAnimating() {
    _timer.cancel();
    window.cancelAnimationFrame(_animationFrameID);
  }

  void _startAnimating() {
    _updateFps();
    _animationFrameID = window.requestAnimationFrame(_update);
  }

  void _update(num time) {
    _timer.cancel();
    _timer = new Timer(_timerDuration, () {

      _grid.update();
      _grid.draw(_context);

      _animationFrameID = window.requestAnimationFrame(_update);
    });
  }

  void _updateFps() {
    var fps = int.tryParse(_fpsBox.value) ?? 20;
    if (fps < 5) {
      fps = 5;
    } else if (fps > 60) {
      fps = 60;
    }
    _fpsBox.value = fps.toString();

    _timerDuration = new Duration(milliseconds: 1000 ~/ fps);
  }

  void _onPausePressed(_) {
    if (state == SimulationState.running) {
      state = SimulationState.paused;
    } else if ((state == SimulationState.paused) ||
                (state == SimulationState.stopped)){
      state = SimulationState.running;
    } else {
      throw(new StateError("Cannot pause/resume from current state: $state"));
    }
  }

  void _onClearPressed(_) {
    state = SimulationState.stopped;
    _grid.clear();
    _grid.draw(_context);
  }

  void _onRandomizePressed(_) {
    state = SimulationState.stopped;
    _grid.randomizeCells();
    _grid.draw(_context);
  }

  void set state(SimulationState value) {

    if (value == SimulationState.running) {
      _pauseButton.value = "Pause";
      _startAnimating();
    } else if (value == SimulationState.paused) {
      _pauseButton.value = "Resume";
      _stopAnimating();
    } else if (value == SimulationState.stopped) {
      _pauseButton.value = "Start";
      _stopAnimating();
    } else {
      throw(new UnsupportedError("Unsupported simulation state: $value"));
    }

    _state = value;
  }

  SimulationState get state => _state;

  void _onCanvasClicked(MouseEvent event) {
    if (state == SimulationState.running) {
      state = SimulationState.paused;
    } else if ((state == SimulationState.paused) ||
               (state == SimulationState.stopped)) {
      var clickLocation = event.offset;
      var cell = _grid.cellAtLocation(clickLocation);
      cell.isAlive = !(cell.isAlive);
      _grid.draw(_context);
    } else {
      throw(new UnsupportedError("Canvas clicked with unsupported state: $state"));
    }
  }

  void _onCanvasMouseDragged(MouseEvent event) {
    if (state == SimulationState.running) {
      state = SimulationState.paused;
    } else if ((state == SimulationState.paused) ||
        (state == SimulationState.stopped)) {
      var clickLocation = event.offset;
      var cell = _grid.cellAtLocation(clickLocation);
      cell.isAlive = true;
      _grid.draw(_context);
    } else {
      throw(new UnsupportedError("Canvas mouse dragged with unsupported state: $state"));
    }

  }

}
