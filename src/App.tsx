import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Col, Container, Row } from 'react-bootstrap';
import { ToDo } from './ToDo/ToDo';
import { Error404 } from './Error404';

function App() {
  return (
    <Router>
      <Container className={'app'}>
        <Row>
          <Col md={3} xs={12} className={'mb-3'}>
            <nav>
              <ul>
                <li>
                  <Link to='/'>Project info</Link>
                </li>
                <li>
                  <Link to='/to-do'>TODO app</Link>
                </li>
              </ul>
            </nav>
          </Col>
          <Col md={9} xs={12} className={'mb-3'}>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/to-do'>
                <ToDo />
              </Route>
              <Route path={'/'}>
                <Error404 />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
