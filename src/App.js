import "./App.css";
import {
  Col,
  Container,
  Row,
  Button,
  Card,
  Form,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import { Grid } from "react-loader-spinner";
const axios = require("axios");

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(-1);

  const makePrediction = () => {
    setLoading(true);
    axios
      .post("https://proy1p2.herokuapp.com/predict", {
        data: [
          {
            study_and_condition: text,
          },
        ],
      })
      .then(function (response) {
        console.log(response.data.Predict);
        setResult(response.data.Predict === "[0]" ? 0 : 1);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <Container>
      <Row>
        <Col sm={12}>
          <Card className="mt-4">
            <Card.Header>Ingresa el texto por analizar.</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                    type="text"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "60px",
              }}
            >
              <Button onClick={makePrediction} variant="outline-primary">
                Analizar texto
              </Button>
              {loading && (
                <Grid
                  height="40"
                  width="40"
                  blue
                  color="blue"
                  ariaLabel="loading"
                />
              )}
            </Card.Footer>
          </Card>
        </Col>
        <Col sm={12}>
          {result === 0 && (
            <Alert variant="danger">El paciente no es elegible</Alert>
          )}
          {result === 1 && (
            <Alert variant="success">El paciente es elegible</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
