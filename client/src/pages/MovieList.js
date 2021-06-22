import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import {
    Card,
    Container,
    CardText,
    CardTitle,
    CardSubtitle,
    CardBody,
    Button,
    Row,
    Col,
    Form, Label,
    Input, Modal, ModalFooter, ModalHeader
} from "reactstrap";

import axios from "axios";
function MovieList() {
    const [movies, setMovies] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [movieName, setMovieName] = useState('');
    const [movieUrl, setMovieUrl] = useState('');
    const [movieLength, setMovieLength] = useState(0);
    const [movieYear, setMovieYear] = useState(0);
    const [movieLanguage, setMovieLanguage] = useState('');
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);


    useEffect(() => {
        getMovies();
    }, [])

    const history = useHistory();

    const getMovies = async () => {
        const response = await axios({
            url: `http://localhost:4000/movies/?title=${searchText}`,
            method: 'get'
        });
        console.log(response.data);
        setMovies(response.data);
    }

    const setCards = () => {
        return (
            movies.map((movie, index) => (
                <Col md="4" key={index}>
                    <Card>
                        <CardBody>
                            <div>
                                <img
                                    src={movie.poster}
                                    alt={movie.tilte}
                                    style={{ height: "400px", width:"300px" }}
                                />
                            </div>
                            <CardTitle tag="h5" className="text-info ">
                                {movie.title}
                            </CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-info">
                                {movie.language}
                            </CardSubtitle>
                        </CardBody>
                    </Card>
                </Col>
            ))
        );
    };

    const renderForm = () => {
        return (
            <Row>
                <Col width="60%">
                    <Form className="mb-3 d-flex">
                        <Input
                            className="alert-info"
                            type="text"
                            name="searchText"
                            placeholder="Type to search a movie"
                            onChange={onChangeSearchText}
                        />
                        <Button color="info" className="ml-2" onClick={onClickSearch}>
                            Search
                        </Button>
                    </Form>
                </Col>
                <Col>
                    {createModal()}
                </Col>
            </Row>
        );
    };

    const onChangeSearchText = (event) => {
        let searchText = event.target.value;
        setSearchText(searchText);
    };

    const onClickSearch = () => {
        getMovies();
    };

    const onClickCard = (movie) => {
        history.push(`/${movie.movieId}`);
    };

    const onChangeMovieName = (event) => {
        const movieName = event.target.value;
        setMovieName(movieName);
    }
    const onChangeMovieUrl = (event) => {
        const movieUrl = event.target.value;
        setMovieUrl(movieUrl);
    }
    

    const onClickCreate = () => {
        const movieObject = {
            "title": movieName,
            "poster": movieUrl
        }
        axios({
            method: 'post',
            url: 'http://localhost:4000/movies/',
            data: movieObject
        });
        toggle();
    }

    const createModal = () => (
        <>
            <Button color="secondary" onClick={toggle}>
                +New Movie
            </Button>
            <Modal isOpen={modal} >
                <ModalHeader >Add a movie</ModalHeader>
                {createMovieForm()}
                <ModalFooter>
                    <Button color="secondary" onClick={onClickCreate}>Add</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Exit</Button>
                </ModalFooter>
            </Modal>
        </>
    );

    const createMovieForm = () => (
        <Form >
            <Label className="ml-2">Movie Name</Label>
            <Input type="text" name="movieName" onChange={onChangeMovieName} placeholder="Enter the name of movie" />
            <Label className="ml-2">Movie URL</Label>
            <Input type="text" name="movieUrl" onChange={onChangeMovieUrl} placeholder="Enter the poster URL" />
            
           
        </Form>
    )

    return (
        <div>
            <Container inline >{renderForm()}</Container>
            <Container>
                <Row className="row">
                    {setCards()}
                </Row>
            </Container>
        </div>
    );
};


export default MovieList;