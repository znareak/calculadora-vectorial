import { Button, Input } from "@geist-ui/core";
import {
  normalize,
  sumVector,
  subVector,
  tripleVector,
  crossProductVector,
  dotProductVector,
  plotVectors,
  plotVectors3D,
  angleBetweenVectors,
} from "./helpers/utils";
import Select from "react-select";
import { useEffect, useRef, useState } from "react";

const operations = {
  sumVector,
  subVector,
  tripleVector,
  dotProductVector,
  crossProductVector,
  normalize,
};

const options = [
  { value: "sumVector", label: "Sumar vectores" },
  { value: "subVector", label: "Restar vectores" },
  { value: "tripleVector", label: "Producto triple-mixto" },
  { value: "crossProductVector", label: "Producto cruz" },
  { value: "dotProductVector", label: "Producto punto" },
  { value: "normalize", label: "Magnitud de vector" },
];

function App() {
  const formRef = useRef(null);
  const [result, setResult] = useState(null);
  const [operation, setOperation] = useState(options[0].value);
  const [v, setV] = useState(0);
  const [angle, setAngle] = useState(0);
  const onChangeOperation = ({ value: operation }) => {
    setOperation(operation);
    const fd = new FormData(formRef.current);
    const data = [...fd.entries()].map(([k, v]) => [k, Number(v)]);
    const { x1, y1, z1, x2, y2, z2 } = Object.fromEntries(data);
    const vector1 = { x: x1, y: y1, z: z1 };
    const vector2 = { x: x2, y: y2, z: z2 };

    const res = operations[operation](vector1, vector2);
    const vectores = [vector1, vector2];

    if (Array.isArray(res)) {
      vectores.push(...res);
    } else if (typeof res === "object") {
      vectores.push(res);
    }

    setTimeout(() => {
      if (Array.isArray(res)) {
        setResult(res[0]);
      } else {
        setResult(res);
      }
      setAngle(angleBetweenVectors(vector1, vector2));
      plotVectors(vectores);
      plotVectors3D(vectores);
    }, 50);
  };

  const reset = () => {
    window.Plotly.purge("plot2d");
    window.Plotly.purge("plot3d");
    setResult(null);
  };

  const onChangeInput = ({ target }) => {
    if (!isNaN(target.value)) {
      setV((n) => n + 1);
    }
  };

  useEffect(() => {
    onChangeOperation({ value: operation });
  }, [operation, v]);

  return (
    <div
      className="mx-auto px-4 w-100 mt-5"
      style={{
        maxWidth: "700px",
      }}
    >
      <h1 style={{ fontWeight: "bold" }}>Calculadora Vectorial</h1>
      <form autoComplete="off" autoCapitalize="off" className="mt-5" ref={formRef}>
        <div className="d-flex w-100 gap-3">
          <div className="mb-4 w-100">
            <h5>Vector 1</h5>
            <div className="d-flex flex-column align-items-center gap-2">
              <div className="d-flex flex-column w-100">
                <label className="d-block mb-2" style={{ fontFamily: "Consolas" }}>
                  X1
                </label>
                <Input
                  htmlType="number"
                  width="100%"
                  name="x1"
                  placeholder="Escriba un digito entero"
                  onChange={onChangeInput}
                />
              </div>

              <div className="d-flex flex-column w-100">
                <label className="d-block mb-2" style={{ fontFamily: "Consolas" }}>
                  Y1
                </label>
                <Input
                  htmlType="number"
                  width="100%"
                  name="y1"
                  placeholder="Escriba un digito entero"
                  onChange={onChangeInput}
                />
              </div>

              <div className="d-flex flex-column w-100">
                <label className="d-block mb-2" style={{ fontFamily: "Consolas" }}>
                  Z1
                </label>
                <Input
                  htmlType="number"
                  width="100%"
                  name="z1"
                  placeholder="Escriba un digito entero"
                  onChange={onChangeInput}
                />
              </div>
            </div>
          </div>

          <div className="w-100">
            <h5>Vector 2</h5>
            <div className="d-flex flex-column  align-items-center gap-2">
              <div className="d-flex flex-column w-100">
                <label className="d-block mb-2" style={{ fontFamily: "Consolas" }}>
                  X2
                </label>
                <Input
                  htmlType="number"
                  width="100%"
                  name="x2"
                  placeholder="Escriba un digito entero"
                  onChange={onChangeInput}
                />
              </div>

              <div className="d-flex flex-column w-100">
                <label className="d-block mb-2" style={{ fontFamily: "Consolas" }}>
                  Y2
                </label>
                <Input
                  htmlType="number"
                  width="100%"
                  name="y2"
                  placeholder="Escriba un digito entero"
                  onChange={onChangeInput}
                />
              </div>

              <div className="d-flex flex-column w-100">
                <label className="d-block mb-2" style={{ fontFamily: "Consolas" }}>
                  Z2
                </label>
                <Input
                  htmlType="number"
                  width="100%"
                  name="z2"
                  placeholder="Escriba un digito entero"
                  onChange={onChangeInput}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-1">
          <label className="d-block mb-2">Operacion</label>
          <Select
            onChange={onChangeOperation}
            options={options}
            styles={{ width: "100%" }}
            defaultValue={options[0]}
          />
          <Button
            type="error-light"
            mt={1}
            scale={0.8}
            style={{ zIndex: 0 }}
            htmlType="reset"
            onClick={reset}
          >
            Borrar todo
          </Button>
        </div>

        {result && (
          <p className="mt-4 mb-1" style={{ fontWeight: "bold" }}>
            Proyeccion vectorial
          </p>
        )}

        {typeof result === "number" ? (
          <Input htmlType="number" width="100%" value={result.toFixed(2)} disabled />
        ) : (
          result && (
            <div className="d-flex align-items-center gap-2">
              <div>
                <span>X</span>
                <Input htmlType="number" width="100%" value={result.x.toFixed(2)} disabled />
              </div>
              <div>
                <span>Y</span>
                <Input htmlType="number" width="100%" value={result.y.toFixed(2)} disabled />
              </div>

              <div>
                <span>Z</span>
                <Input htmlType="number" width="100%" value={result.z.toFixed(2)} disabled />
              </div>
              <div>
                <span>Angulo resultante entre vector 1 y 2</span>
                <Input htmlType="number" width="100%" value={angle.toFixed(2)} disabled />
              </div>
            </div>
          )
        )}
      </form>

      <div id="plot2d"></div>

      <div id="plot3d"></div>
    </div>
  );
}

export default App;
