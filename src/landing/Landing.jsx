import React from 'react';
import Navbar from '../components/navbar/Navbar';
import './landing.css';
import Devtool from '../images/devtool.jpg';
import FaceVerification from '../images/face-verification.png';
import FullScreen from '../images/full-screen.jpeg';
import MultipleFaces from '../images/multiple-face.png';
import MultipleTabs from '../images/multiple-tabs.jpg';




const featureList = [
	'Face Verification',
	'Multiple People Detection',
	'Devtools Check',
	'Full Screen Check',
	'Multiple Tabs Check'
];

const Landing = () => {
	const carouselImageStyle = {
        width: '70%',
        margin: 'auto'
    };

	return (
		<React.Fragment>
			<Navbar />

			<div className="section-type landing-page">
				<div className="landing-content">
					<div className="headings">
						<span className="sub-text">AI - Based Smart</span>
						<span className="main-heading gradient-text">
							 Examination Proctoring System
						</span>
					</div>

					<p className="desc">
						A straightforward framework built for online proctoring
						to create online tests within minutes,{' '}
						<i>effortlessly</i>.
					</p>
				</div>


				<div className="features-content">
					<div className="curr-heading">
						<p className="gradient-text">
							<b>Powerful</b> & Lightweight
						</p>
						<h2 className="title-heading">Features</h2>
					</div>

					<div className="all-features">
						{featureList.map((it) => (
							<p className="single-feature">{it}</p>
						))}
					</div>

		
				
					
				</div>

			</div>
		</React.Fragment>
	);
};

export default Landing;

