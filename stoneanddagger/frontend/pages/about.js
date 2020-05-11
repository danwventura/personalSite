import React from 'react';
import styled from 'styled-components';


const AboutDiv = styled.div`
    text-align: center;
`;

const About = props => (
    <AboutDiv>
        {/* <div class="col-md-4 offset-md-1 mb-3 col-lg-3 offset-lg-2">
                <img src="kristen.jpg" alt="Image" class="img-fluid"/>
        </div> */}
        <div class="col-md-6 mb-3 mt-3 col-lg-6 ml-5">
            <h2>Stone & Dagger</h2>
            <u>Kristen Olsen - Owner</u>
            <p>This collection is a combination of my love of Earth's natural wonders and a desire to make truly one of a kind items.
                 Each stone has its own personality and I design each piece around that. There is a true beauty in the imperfection of something that is made
                 by hand. From cutting and polishing the stones myself, to creating the designs, I am constantly inspired by the beauty that grows in nature. </p>
            <br></br>
            <p>In my professional life, I worked as a Visual Merchandiser, Stylist, Show Designer, and Vintage Clothing Retailer. In the last few years, I have
                found my true passion to be in making my own custom jewelry. I have taken the time and resources needed to educate myself and learn the skills of my
                craft as an artist and silversmith. 
            </p>
            <br></br>
            <p> Each piece is designed and handcrafted right here in my home studio in Nashville, TN</p>
            <br></br>
            <p>Message me today to start your own custom piece <a href="#">Custom Order</a></p>
        </div>
    </AboutDiv>
)

export default About;