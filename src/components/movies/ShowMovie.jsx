import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Row, Col, Button, Spinner, Table, Media } from 'reactstrap';
import { AiOutlineArrowLeft, AiFillAppstore, AiFillVideoCamera, AiFillEdit, AiOutlineGlobal } from "react-icons/ai";

import Header from '../Header.jsx';
import { getSingleMovie, addNewCommment } from "../../utils/apicalls.js";
import { getDateInStrFormat } from "../../utils/utils.js";
import UserImg from '../../images/user.png';


export default function ShowMovie() {

  const [movie, setMovie] = useState(null);

  const [newComment, setNewComment] = useState('');

  const getMovie = (id) => {
    getSingleMovie(id).then((movie) => {
      setMovie(movie);
    });
  }

  /* Add new comment */
  const addComment = () => {
    //Save comment in database with the api call
    addNewCommment(
      movie._id, newComment, sessionStorage.getItem('name'), sessionStorage.getItem('email')
    ).then((res) => {
      setNewComment('');
      getMovie(movie._id);
    }).catch((err) => { });
  }

  const { id } = useParams();

  useEffect(() => {
    getMovie(id);
  }, [id]);

  return movie === null ?
    (<div>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spinner color="light" />
        </div>
      </Row>
    </div>)
    : (
      <div>
        <Row><Col><Header /></Col></Row>
        <Row>
          <Col xs="12" >
            <div className="card-body">
              <h4 className="text-white">{movie.title} </h4>
              <Link to={`/home`}><Button color="danger"><AiOutlineArrowLeft /> Back</Button></Link>
              <p className="text-white"><AiFillAppstore /> Category:
                {movie.category.map((cat) => {
                  return (<span className="text-white"> {cat} </span>);
                })}
              </p>
              <div className="video-responsive">
                <iframe
                  width="100%"
                  height="650"
                  src={`https://www.youtube.com/embed/${movie.trailer}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
              <p className="text-white">
                <AiFillEdit /> Plot: {movie.plot}<br />
                <AiFillVideoCamera /> Director: {movie.director}<br />
                <AiOutlineGlobal />Country: {movie.country}
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <div className="card-body">
              <h4 className="text-white">Comments</h4>
              <Table dark>
                <tbody>
                  {movie.comments.map((comment) => {
                    return (
                      <Row className="justify-content-center">
                        <Col xs="1">
                          <Media object src={UserImg} alt="User" />
                        </Col>
                        <Col xs="10">
                          <p className="text-white">{comment.username} ({comment.email})</p>
                          <p className="text-white">{comment.text}</p>
                          <p className="text-white">{getDateInStrFormat(new Date(comment.addeddate))}</p>
                        </Col>
                      </Row>
                    );
                  })}
                </tbody>
              </Table>
              <form>
                <div className="form-group">
                  <label className="text-white">Add a comment</label>
                  <textarea className="form-control" rows="3" onChange={(e) => setNewComment(e.target.value)}>{newComment}</textarea>
                </div>
                <Button color="danger" onClick={addComment}>Submit</Button>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    );
}