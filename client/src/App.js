import React from 'react';
import { Container,Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Switch, Route } from "react-router-dom";

import Header from './components/Header';
import MovieDetail from './pages/MovieDetail';
import MovieList from './pages/MovieList';

function App() {
  return (
    <main>
      <Header />
      <Container>
        <section className="content" style={{
          marginTop: 60
        }}>
          <Switch>
            <Route path="/:movieId" component={MovieDetail} />
            <Route path="/" component={MovieList} />
          </Switch>
        </section>
      </Container>
    </main>
  );
}


export default App;
