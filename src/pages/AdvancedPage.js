import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import { Tab, Tabs } from "react-bootstrap";
import prettyBytes from "pretty-bytes";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { CCard} from '@coreui/react';

function AdvancedPage () {
    
  const [status, setStatus] = useState(0);
  const [time, setTime] = useState(0);
  const [size, setSize] = useState(0);
  const [response, setResponse] = useState({});
  const [responseHeaders, setResponseHeaders] = useState({});
  const [json, setJSON] = useState({});

  axios.interceptors.request.use((request) => {
    request.customData = request.customData || {};
    request.customData.startTime = new Date().getTime();
    return request;
  });

  function updateEndTime(response) {
    if (response !== undefined) {
      response.customData = response.customData || {};
      // setting the time
      response.customData.time =
        new Date().getTime() - response.config.customData.startTime;
      return response;
    }
  }

  axios.interceptors.response.use(updateEndTime, (e) => {
    return Promise.reject(updateEndTime(e.response));
  });

  function keyValuePairsToObjects(container) {
    var params = {};
    container.forEach((data) => {
      params[data["key"]] = data["value"];
    });

    return params;
  }

  function sendRequest(data) {
    let dataJson;
    try {
      dataJson = json;
    } catch (e) {
      alert("JSON data is malformed");
      return;
    }
    axios({
      url: data.url,
      method: data.method,
      params: keyValuePairsToObjects(data.query_data),
      headers: keyValuePairsToObjects(data.header_data),
      data: dataJson,
      validateStatus: () => true,
    })
      .catch((e) =>
        console.log(e)
      )
      .then((response) => {
        if (response !== undefined) {
          setStatus(response.status);
          setResponse(response.data);
          setResponseHeaders(response.headers);
          setTime(response.customData.time);
          setSize(
            prettyBytes(
              JSON.stringify(response.data).length +
                JSON.stringify(response.headers).length
            )
          );
        }
      });
  }

  return (
    <>
    <CCard style={{backgroundColor:'#4D4D4D', minWidth:'50%', margin:'3%', padding:'3%'}}>
    <h4>Advanced API Access</h4>
    <h6>For the tinkerers!</h6>
    <p style={{ fontSize: "medium"}}>This is an advanced section with direct access to the API. Not feeling adventerous? No worries! Head back <Link to="/">Home</Link> with easy ways to manage your projects!</p>
    </CCard>
    <CCard style={{backgroundColor:'#4D4D4D', minWidth:'50%', margin:'3%', padding:'3%'}}>
      <div className="p-4">
        <div>
          <Formik
            initialValues={{
              url: "http://localhost:8000/projects",
              query_data: [{}],
              header_data: [{}],
              method: "GET",
            }}
            onSubmit={(details) => {
              sendRequest(details);
            }}
          >
            {({ values }) => (
              <Form>
                <div className="form-group">
                  <div className="input-group mb-4">
                    <Field name="method" as="select">
                      <option value="GET"> GET </option>
                      <option value="POST"> POST </option>
                      <option value="PUT"> PUT </option>
                      <option value="DELETE"> DELETE </option>
                    </Field>
                    <Field
                      required
                      type="url"
                      name="url"
                      placeholder="https://www.example.com"
                      className="form-control"
                    />
                    <div className="form-group">
                      <button className="button-smmd" style={{backgroundcolor: "#04AA6D"}}type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
                <Tabs
                  defaultActiveKey="query-params"
                  id="uncontrolled-tab-example"
                  className="advLabel"
                >
                  <Tab eventKey="query-params" title="Query Params">
                    <FieldArray name="query_data">
                      {(arrayHelpers) => (
                        <div>
                          <Button onClick={() => arrayHelpers.push({})}>
                            {" "}
                            Add{" "}
                          </Button>
                          {values.query_data.map((info, index) => {
                            return (
                              <div key={index}>
                                <Field
                                  placeholder="Key"
                                  name={`query_data.${index}.key`}
                                  type="input"
                                />
                                <Field
                                  placeholder="Value"
                                  name={`query_data.${index}.value`}
                                  type="input"
                                />
                                <Button
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  x
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </FieldArray>
                  </Tab>
                  <Tab eventKey="headers" title="Headers">
                    <FieldArray name="header_data">
                      {(arrayHelpers) => (
                        <div>
                          <Button onClick={() => arrayHelpers.push({})}>
                            {" "}
                            Add{" "}
                          </Button>
                          {values.header_data.map((info, index) => {
                            return (
                              <div key={index}>
                                <Field
                                  placeholder="Key"
                                  name={`header_data.${index}.key`}
                                  type="input"
                                />
                                <Field
                                  placeholder="Value"
                                  name={`header_data.${index}.value`}
                                  type="input"
                                />
                                <Button
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  x
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </FieldArray>
                  </Tab>
                  <Tab eventKey="json" title="JSON">
                    <JSONInput
                      id="a_unique_id"
                      //
                      theme="dark_vscode_tribute"
                      colors={{
                        string: "#59A5D8",
                        backgroud: "#FFFFFF",
                      }}
                      locale={locale}
                      onChange={(data) => setJSON(data.jsObject)}
                      height="300px"
                    />
                  </Tab>
                </Tabs>
              </Form>
            )}
          </Formik>
        </div>
        <div>
          <h3>Response</h3>
          <div className="d-flex my-2">
            <div className="projectField">Status: {status}</div>
            &nbsp;
            <div className="projectField">Time: {time} ms</div>
            &nbsp;
            <div className="projectField">Size: {size}</div>
          </div>
          <div>
            <Tabs
              defaultActiveKey="body"
              id="uncontrolled-tab-example"
              className="nav nav-tabs"
            >
              <Tab eventKey="body" title="Body">
                <pre className="projectField">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </Tab>
              <Tab eventKey="response" title="Response" className="projectField">
                <pre>{JSON.stringify(responseHeaders, null, 2)}</pre>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      </CCard>
    </>
  );
}

export default AdvancedPage;