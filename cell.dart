import "dart:html";
import "direction.dart";

class Cell {

  List<Cell> neighbors = new List(Direction.values.length);

  bool isAlive = false;
  bool isMarkedToLive = false;

  int xIndex;
  int yIndex;

  Cell(this.xIndex, this.yIndex);

  void assignNeighbor(Direction direction, Cell neighbor) => neighbors[direction.index] = neighbor;

  int get fillBrightness {
    if (isAlive) {
      return 240;
    } else {
      return 0;
    }
  }

  int get livingNeighborsCount {
    int count = 0;
    for (var neighbor in neighbors) {
      if (neighbor.isAlive) {
        count++;
      }
    }
    return count;
  }

  void mark() {
    isMarkedToLive = isAlive;

    var count = livingNeighborsCount;

    if ((count < 2) || (count > 3)) {
      isMarkedToLive = false;
    } else if (count == 3) {
      isMarkedToLive = true;
    }
  }

  void resolve() => isAlive = isMarkedToLive;

  @override
  String toString() => "Cell($xIndex, $yIndex)";

}