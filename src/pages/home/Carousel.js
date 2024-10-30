import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

let DemoCarousel = () =>{

        return (
            <Carousel
            autoPlay={true}
            showArrow={true} 
            showThumbs={false}>
                <div>
                    <img style={{ maxHeight: 350, padding: 5, borderRadius: '30px' }} src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" />

                </div>
                <div>
                    <img style={{ maxHeight: 350, padding: 5, borderRadius: '30px' }} src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" />

                </div>
                <div>
                    <img style={{ maxHeight: 350, padding: 5, borderRadius: '30px' }} src="https://images.unsplash.com/photo-1522273400909-fd1a8f77637e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2012&q=80" />

                </div>
            </Carousel>
        );
    
}

export default DemoCarousel;