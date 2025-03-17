import React from "react";
import Carousel from 'react-bootstrap/Carousel';

const ExampleCarouselImage = ({ text }) => (
    <div style={{ height: '100px', background: '#777', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {text}
    </div>
);

const CarouselComp = () => {
        return (
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/img/image1.png"
                            alt="First slide"
                            
                        />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/img/image2.png"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/img/image3.png"
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
        );
};

export default CarouselComp;
