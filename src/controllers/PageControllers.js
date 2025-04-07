const Graph = require("../services/Graph");
let g = new Graph();

const getHomePage = (req, res) => {
  res.render("index", { path: undefined, graph: g.vertices });
};

const getAddVertex = (req, res) => {
  const vertices = req.body.vertices;
  // vertices la 1 mang
  console.log("check vertices: ", vertices);
  // check vertices:  [ { name: 'A', adjCount: '1', adj: [ [Object] ] } ]

  if (!vertices) return res.redirect("/");

  vertices.forEach((vertex) => {
    const name = vertex.name;
    const adj = vertex.adj || [];
    const edges = {};
    console.log("check adj: ", adj);
    // adj la 1 mang , co dang check adj:  [ { name: 'a', weight: '2' } ]

    if (Array.isArray(adj)) {
      adj.forEach((edge) => {
        edges[edge.name] = parseInt(edge.weight);
      });
    } else if (adj.name && adj.weight) {
      edges[adj.name] = parseInt(adj.weight);
    }

    console.log("check edges = ", edges);

    g.addVertex(name, edges);
  });

  res.redirect("/");
};

const getFindPath = (req, res) => {
  const { start, end } = req.body;
  const result = g.shortestPath(start, end); // Gọi hàm shortestPath để lấy đường đi và độ dài.
  const { path, distance } = result; // Tách đường đi và độ dài từ kết quả trả về.

  res.render("index", { path, distance, graph: g.vertices });
  // Truyền thêm `distance` vào view để hiển thị.
};

const getReset = (req, res) => {
  g = new Graph(); // Khởi tạo lại đồ thị
  res.redirect("/");
};
module.exports = { getHomePage, getAddVertex, getFindPath, getReset };
