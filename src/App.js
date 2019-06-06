import React, { useState, useEffect } from "react";
import CHC from "./helpers/ConfluenceHTMLCreator";

import "./App.scss";

import TextInput from "./components/TextInput";
import FormGroup from "./components/FormGroup";

const useCreateInputState = (defaultValue = "", effect = _ => _) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(effect, [value]);

  const handleChange = e => setValue(e.target.value);
  return {
    value,
    handleChange
  };
};

function App() {
  const [output, setOutput] = useState([]);
  const [params, setParams] = useState([]);

  const [title, description, method, host, endpoint] = [
    useCreateInputState(),
    useCreateInputState(),
    useCreateInputState(),
    useCreateInputState(),
    useCreateInputState("", () => {
      console.warn("endpoint changed", endpoint);
      const paramsMatch = endpoint.value.match(/\/:([a-z-]{1,})/gi);

      if (paramsMatch) {
        setParams(
          paramsMatch.map(p => ({
            name: p.replace("/:", ""),
            description: "",
            example: ""
          }))
        );
      }
    })
  ];

  useEffect(() => {
    setOutput([
      CHC.createTitle(title.value),
      CHC.createDescription(description.value),
      CHC.createEndpointTable(endpoint.value, method.value, host.value),
      CHC.createParamsTable(params)
    ]);
  }, [
    description.value,
    title.value,
    method.value,
    host.value,
    endpoint.value,
    params
  ]);

  const changeParam = (event, param, field) => {
    const { value } = event.target;

    setParams(
      params.map(p => {
        if (p.name !== param.name) return p;

        return { ...p, [field]: value };
      })
    );
  };

  return (
    <div className="App">
      <header className="App-header">Confluence API Generator</header>

      <div className="App-content">
        <TextInput
          label="Title"
          value={title.value}
          onChange={title.handleChange}
        />
        <TextInput
          label="Description"
          value={description.value}
          onChange={description.handleChange}
        />

        <FormGroup>
          <TextInput
            flex="0 1 120px"
            label="Method"
            value={method.value}
            onChange={method.handleChange}
          />
          <TextInput
            flex="0 1 300px"
            label="Host"
            value={host.value}
            onChange={host.handleChange}
          />
          <TextInput
            flex="1"
            label="Endpoint"
            value={endpoint.value}
            onChange={endpoint.handleChange}
          />
        </FormGroup>

        {params.length > 0 &&
          params.map((param, key) => (
            <React.Fragment key={key}>
              <TextInput
                flex="1"
                label={param.name}
                placeholder="Description"
                value={param.description}
                onChange={e => changeParam(e, param, "description")}
              />
              <TextInput
                flex="1"
                placeholder="Example"
                value={param.example}
                onChange={e => changeParam(e, param, "example")}
              />
            </React.Fragment>
          ))}

        <pre className="App-output">
          {output.filter(v => v && v.trim().length).join("\n")}
        </pre>
      </div>
    </div>
  );
}

export default App;
