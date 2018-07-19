import "dart:html";
import "dart:math";
import "cell.dart";
import "direction.dart";

class Grid {

  static const sizeInCells = 40;
  static const cellsCount = sizeInCells * sizeInCells;

  static final Random randomGenerator = new Random();

  final double _canvasSize;

  List<Cell> _cells = new List(cellsCount);

  double _cellSize;
  double _cellPadding;

  Grid(this._canvasSize) {
    _cellSize = _canvasSize / sizeInCells;
    _cellPadding = max(0.5, _cellSize * 0.05);

    _buildCells();
    _linkCellNeighbors();

    randomizeCells();
  }

  void _buildCells() {

    for (var cellIndex = 0; cellIndex < cellsCount; cellIndex++) {
      var xIndex = cellIndex % sizeInCells;
      var yIndex = cellIndex ~/ sizeInCells;

      _cells[cellIndex] = new Cell(xIndex, yIndex);
    }

  }

  void _linkCellNeighbors() {

    for (var cell in _cells) {
      var xIndex = cell.xIndex;
      var yIndex = cell.yIndex;

      cell.assignNeighbor(Direction.northWest, _wrappedCell(xIndex - 1, yIndex - 1));
      cell.assignNeighbor(Direction.north, _wrappedCell(xIndex, yIndex - 1));
      cell.assignNeighbor(Direction.northEast, _wrappedCell(xIndex + 1, yIndex - 1));
      cell.assignNeighbor(Direction.west, _wrappedCell(xIndex - 1, yIndex));
      cell.assignNeighbor(Direction.east, _wrappedCell(xIndex + 1, yIndex));
      cell.assignNeighbor(Direction.southWest, _wrappedCell(xIndex - 1, yIndex + 1));
      cell.assignNeighbor(Direction.south, _wrappedCell(xIndex, yIndex + 1));
      cell.assignNeighbor(Direction.southEast, _wrappedCell(xIndex + 1, yIndex + 1));
    }

  }

  void randomizeCells() {
    for (var cell in _cells) {
      cell.isAlive = randomGenerator.nextBool();
    }
  }

  void update() {
    _cells.forEach((cell) => cell.mark());
    _cells.forEach((cell) => cell.resolve());
  }

  void draw(CanvasRenderingContext2D context, double time) {

    context
        ..setFillColorRgb(0, 38, 0)
        ..fillRect(0.0, 0.0, _canvasSize, _canvasSize);

    for (var cell in _cells) {
      context
          ..setFillColorRgb(0, cell.fillBrightness, 0)
          ..fillRect(
              cell.xIndex * _cellSize + _cellPadding,
              cell.yIndex * _cellSize + _cellPadding,
              _cellSize - 2.0 * _cellPadding,
              _cellSize - 2.0 * _cellPadding
          );
    }

  }

  Cell _wrappedCell(int xIndex, int yIndex) {
    xIndex %= sizeInCells;
    yIndex %= sizeInCells;

    var cellIndex = (yIndex * sizeInCells) + xIndex;

    return _cells[cellIndex];
  }


}