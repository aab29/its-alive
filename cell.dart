import "direction.dart";
import "dart:math";

class Cell {
  static const starvationNeighborsCount = 1;
  static const overcrowdingNeighborsCount = 4;
  static const idealNeighborsCount = 3;

  static final Random randomGenerator = new Random();

  List<Cell> _neighbors = new List(Direction.values.length);

  bool isAlive = false;
  bool isMarkedToLive = false;

  int xIndex;
  int yIndex;

  Cell(this.xIndex, this.yIndex);

  void assignNeighbor(Direction direction, Cell neighbor) =>
      _neighbors[direction.index] = neighbor;

  int get fillBrightness {
    if (isAlive) {
      return 240;
    } else {
      return 0;
    }
  }

  int get livingNeighborsCount {
    int count = 0;
    for (var neighbor in _neighbors) {
      if (neighbor.isAlive) {
        count++;
      }
    }
    return count;
  }

  void determineSurvivalMarking() {
    isMarkedToLive = isAlive;

    var count = livingNeighborsCount;

    if ((count <= starvationNeighborsCount) ||
        (count >= overcrowdingNeighborsCount)) {
      isMarkedToLive = false;
    } else if (count == idealNeighborsCount) {
      isMarkedToLive = true;
    }
  }

  void resolveSurvival() => isAlive = isMarkedToLive;

  void clear() => isAlive = false;
  void invert() => isAlive = !isAlive;
  void randomize() => isAlive = randomGenerator.nextBool();

  @override
  String toString() => "Cell($xIndex, $yIndex)";
}
