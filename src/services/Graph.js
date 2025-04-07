// graph.js

function PriorityQueue() {
  this._nodes = [];
  // Mảng `_nodes` lưu trữ các phần tử trong hàng đợi ưu tiên.

  this.enqueue = function (priority, key) {
    this._nodes.push({ key: key, priority: priority });
    this.sort();
    // Hàm `enqueue` thêm một phần tử vào hàng đợi với độ ưu tiên `priority`.
    // Sau khi thêm, mảng `_nodes` được sắp xếp theo độ ưu tiên tăng dần.
  };

  this.dequeue = function () {
    return this._nodes.shift().key;
  };
  // Hàm `dequeue` lấy phần tử có độ ưu tiên cao nhất-(phần tử đầu tiên trong mảng  ).

  this.sort = function () {
    this._nodes.sort((a, b) => a.priority - b.priority);
  };
  // Hàm `sort` sắp xếp các phần tử trong mảng `_nodes` theo độ ưu tiên tăng dần.
  this.isEmpty = function () {
    return this._nodes.length === 0;
  };
  // Hàm `isEmpty` kiểm tra xem hàng đợi có rỗng hay không.
}

function Graph() {
  const INFINITY = Infinity;
  this.vertices = {};
  // `vertices` là một đối tượng lưu trữ các đỉnh và danh sách kề của chúng.
  this.addVertex = function (name, edges) {
    this.vertices[name] = edges;
  };
  // Hàm `addVertex` thêm một đỉnh vào đồ thị với danh sách các cạnh kề (`edges`).

  this.shortestPath = function (start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = [];
    let smallest;

    for (let vertex in this.vertices) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      } else {
        distances[vertex] = INFINITY;
        nodes.enqueue(INFINITY, vertex);
      }
      previous[vertex] = null;
    }

    while (!nodes.isEmpty()) {
      smallest = nodes.dequeue();

      if (smallest === finish) {
        path = [];
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        path.push(start);
        return { path: path.reverse(), distance: distances[finish] };
      }

      if (!smallest || distances[smallest] === INFINITY) {
        continue;
      }

      for (let neighbor in this.vertices[smallest]) {
        const alt = distances[smallest] + this.vertices[smallest][neighbor];
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = smallest;
          nodes.enqueue(alt, neighbor);
        }
      }
    }

    return { path: [], distance: INFINITY };
  };
}

module.exports = Graph;
