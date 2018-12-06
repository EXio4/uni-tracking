import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';


// [mostly] raw data from the page
// gathered through JSON.stringify(Array.from(document.getElementsByTagName('tr')).filter((x) => x.children.length == 6).map((x) => Array.from(x.children)).map((x) => [x[0], x[1], x[5]].map(e => e.children[0].childNodes[0].data)).filter((x) => typeof x[0] !== 'undefined').map(x => [x[0], x[1], !x[2] ? [] : x[2].split(/ [–-] /)]))
const rawData = [
  ["340101","Sistemas y Organizaciones", []],
  ["340102","Fundamentos de Programación", []],
  ["340103","Cálculo Diferencial e Integral",[]],
  ["340104","Lógica y Álgebra",[]],
  ["340105","Lecto-Comprensión en Inglés",[]],
  ["340106","Derechos Humanos y Tecnología",[]],
  ["340107","Fundamentos de Computación",[]],
  ["340208","Ingeniería de Software I",["101","102"]],
  ["340209","Algoritmos y Estructuras de Datos",["102","104"]],
  ["340210","Programación Orientada a Objetos",["102","105","107"]],
  ["340211","Matemática Discreta",["104"]],
  ["340212","Ecuaciones Diferenciales y Cálculo Multivariado",["103"]],
  ["340213","Arquitectura de Computadoras",["102","107"]],
  ["340314","Ingeniería de Software II",["208","209","210"]],
  ["340315","Bases de Datos",["209","210","211"]],
  ["340316","Sistemas Operativos",["209","211","213"]],
  ["340317","Probabilidad y Estadística",["211","212"]],
  ["340318","Paradigmas y Lenguajes",["209","210","213"]],
  ["340319","Ética Profesional",["106","208"]],
  ["340320","Programación Avanzada",["209","210"]],
  ["340321","Taller de Integración",["314","315", "316", "317", "318", "319","320"]], // hack
  ["340422","Inteligencia Artificial",["315","317","318"]],
  ["340423","Bases de Datos Avanzadas",["315","320"]],
  ["340424","Comunicaciones y Redes",["316","317"]],
  ["340425","Metodología de la Investigación",["208","317"]],
  ["340426","Investigación Operativa",["317"]],
  ["340427","Optativa 1",["314","315","320","321"]],
  ["340428","Computación Avanzada",["315","316"]],
  ["340429","Optativa 2",["316","318","320"]],
  ["340530","Seguridad y Auditoria",["319","424"]],
  ["340531","Administración de Recursos",["423","424"]],
  ["340532","Teoría de Computabilidad",["318","423","424"]],
  ["340533","Tesina de Grado", ["530","531", "532", "534"]], // hack
  ["340534","Interfaz Hombre Máquina",["320","428"]],
  ["340535","Optativa 3",["423"]]
].map(x => [x[0], x[1], x[2].map(e => '340'+e)]);

const passed = [
  101, 102, 103, 104, 105, 106, 107,
  208, 209, 210, 211, 212, 213,
  314, 315, 316, 317, 318, 319, 320,
  423, 426
].map((x) => '340'+x)

const regular = [
  424, 428, 
].map((x) => '340'+x)


const partialPass = (id) => {
  return (passed.findIndex((i) => i===id) !== -1) || (regular.findIndex((i) => i===id) !== -1)
}

const getEstado = (id) => {
  if (passed.findIndex((i) => i===id) !== -1) {
    return 'blue'
  } else if (regular.findIndex((i) => i===id) !== -1) {
    return 'green'
  } else {
    const requirements = rawData.find(x => x[0] === id)
    const works = requirements[2].every((x) => partialPass(x))
    console.log(id, requirements, works)
    if (works) {
      return 'orange'
    } else {
      return 'red'
    }
  }
}

// graph payload (with minimalist structure)
const defaultData = {
  nodes: rawData.map((x) => ({
    id: x[0],
    name: x[1],
    color: getEstado(x[0])
  })),
  links: rawData.flatMap((x) => x[2].map((e) => ({
    source: e,
    target: x[0]
  })))
};

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
  height: 600 * 1.75,
  width: 1024 * 1.75,
  directed: true,
  nodeHighlightBehavior: true,
  node: {
      symbolType: 'diamond',
      size: 120,
      fontColor: '#ffa022',
      highlightStrokeColor: 'white',
      labelProperty: 'name',
  },
  link: {
      color: '#616',
      highlightColor: 'lightblue',
  },
  d3: {
    gravity: -400,
    linkLength: 200,
    linkStrength: 0.5,
  }
};

class App extends Component {
  render() {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#222',
      }}>
        <div style={{
          border: '1px solid #d32461',
        }}>
          <Graph
              id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
              data={defaultData}
              config={myConfig}
          />
        </div>
      </div>
    );
  }
}

export default App;
