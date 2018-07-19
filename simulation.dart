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

  ButtonInputElement _pauseButton = querySelector("#pause_button");
  NumberInputElement _fpsBox = querySelector("#fps_box");

  Simulation(this._canvas, this._context) {
    _canvasSize = _canvas.width.toDouble();
    _grid = new Grid(_canvasSize);

    _pauseButton.onClick.listen(_onPausePressed);

    _fpsBox.onInput.listen((_) => _updateFps());

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

      _grid.draw(_context, time);
      _grid.update();

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

    print("Now FPS is $fps");
  }

  void _onPausePressed(_) {
    print("Pause pressed");
    
    if (state == SimulationState.running) {
      state = SimulationState.paused;
    } else if (state == SimulationState.paused) {
      state = SimulationState.running;
    } else {
      throw(new StateError("Cannot pause/resume from current state: $state"));
    }
  }

  void set state(SimulationState value) {



    if (value == SimulationState.running) {
      _pauseButton.value = "Pause";
      _pauseButton.disabled = false;
      _startAnimating();
    } else if (value == SimulationState.paused) {
      _pauseButton.value = "Resume";
      _pauseButton.disabled = false;
      _stopAnimating();
    } else if (value == SimulationState.stopped) {
      _pauseButton.value = "Pause";
      _pauseButton.disabled = true;
      _stopAnimating();
    } else {
      throw(new UnsupportedError("Unsupported simulation state: $value"));
    }

    _state = value;
  }

  SimulationState get state => _state;


}
