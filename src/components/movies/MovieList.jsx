import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Badge, CardTitle, Spinner } from 'reactstrap';
import { getAllMovies } from "../../utils/apicalls.js";

import Header from '../Header.jsx';
import CardMovie from './CardMovie.jsx';

export default function MovieList() {

  const [movies, setMovies] = useState(null);

  const getMovies = () => {
    getAllMovies().then((movies) => {
      setMovies(movies);
    });
  }

  useEffect(() => {
    getMovies();
  }, []);



  return movies === null ?
    (<div>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <Spinner color="light" />
      </div>
        {/* <Spinner animation="border" variant="light" size="lg">
          <span >Loading...</span>
        </Spinner> */}
      </Row>
    </div>)
    : (
      <div>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Container>
          <CardTitle tag="center"><Badge pill color="dark">Total movies found: {movies.length}</Badge></CardTitle>
          <Row>
            {movies.map((movie) => {
              return (
                <Col xs="3" sm="3">
                  <CardMovie movie={movie} />
                </Col>
              )
            })}
          </Row>
        </Container>
      </div>
    );
}