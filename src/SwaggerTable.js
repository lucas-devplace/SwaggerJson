import React, { Component } from "react";

const prefix = "/api/v1";
class SwaggerTable extends Component {
  state = {
    data: null
  };
  componentDidMount() {
    const url = "https://localhost:5001/swagger/v1/swagger.json";
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch(error => console.log(error));
  }
  getMethods = () => {
    const { data } = this.state;
    if (!data) {
      return [];
    }
    let methods = [];
    const pathKeys = Object.keys(data.paths);
    for (var path of pathKeys) {
      const methodsInPath = data.paths[path];
      const methodKeys = Object.keys(methodsInPath);
      for (var methodKey of methodKeys) {
        methods.push({
          method: path,
          methodWithoutPrefix: path.replace(prefix, ""),
          type: methodKey
        });
      }
    }
    return methods;
  };
  render() {
    const methods = this.getMethods();
    return (
      <table border={1}>
        <tr>
          <th align="left">Método</th>
          <th align="left">Método sem Prefixo</th>
          <th align="left">Tipo</th>
        </tr>
        {methods.map(methodWithType => (
          <tr>
            <td align="left">{methodWithType.method}</td>
            <td align="left">{methodWithType.methodWithoutPrefix}</td>
            <td align="left">{methodWithType.type.toUpperCase()}</td>
          </tr>
        ))}
      </table>
    );
  }
}

export default SwaggerTable;
