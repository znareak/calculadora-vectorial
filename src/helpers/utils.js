export const sumVector = (v1, v2) => ({
  x: v1.x + v2.x,
  y: v1.y + v2.y,
  z: v1.z + v2.z,
});

export const subVector = (v1, v2) => ({
  x: v1.x - v2.x,
  y: v1.y - v2.y,
  z: v1.z - v2.z,
});

export const crossProductVector = (v1, v2) => ({
  x: v1.y * v2.z - v1.z * v2.y,
  y: v1.z * v2.x - v1.x * v2.z,
  z: v1.x * v2.y - v1.y * v2.x,
});

export const dotProductVector = (v1, v2) => {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
};

export function tripleVector(v1, v2) {
  const v3 = {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
    z: v1.z + v2.z,
  };

  const result =
    v1.x * v2.y * v3.z +
    v1.y * v2.z * v3.x +
    v1.z * v2.x * v3.y -
    v1.z * v2.y * v3.x -
    v1.y * v2.x * v3.z -
    v1.x * v2.z * v3.y;

  return [v3, result];
}

export function normalize(v1) {
  const magnitude = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
  const result = {
    x: v1.x / magnitude,
    y: v1.y / magnitude,
    z: v1.z / magnitude,
  };
  return result;
}

export function plotVectors(vectorInfo) {
  // Datos del gráfico 2D
  const data = Object.keys(vectorInfo).map((key) => ({
    x: [0, vectorInfo[key].x],
    y: [0, vectorInfo[key].y],
    type: "scatter",
    mode: "lines+markers",
    name: vectorInfo[key].label,
  }));
  const layout = {
    title: "Gráfico 2D de Vectores",
    autosize: false,
    width: 700,
    height: 700,
    xaxis: {
      title: "X",
      zeroline: true,
    },
    yaxis: {
      title: "Y",
      zeroline: true,
    },
  };

  window.Plotly.newPlot("plot2d", data, layout);
}
export function plotVectors3D(vectorInfo) {
  const data = Object.keys(vectorInfo).map((key) => ({
    x: [0, vectorInfo[key].x],
    y: [0, vectorInfo[key].y],
    z: [0, vectorInfo[key].z],
    type: "scatter3d",
    mode: "lines+markers",
    name: vectorInfo[key].label,
  }));

  const layout = {
    title: "Gráfico 3D de Vectores",
    width: 700,
    height: 700,
    scene: {
      xaxis: { title: "X", zeroline: true },
      yaxis: { title: "Y", zeroline: true },
      zaxis: { title: "Z", zeroline: true },
    },
  };

  window.Plotly.newPlot("plot3d", data, layout);
}
