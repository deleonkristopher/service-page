import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Offcanvas, Navbar, Nav, Button, Container } from 'react-bootstrap';
import bgImage from './assets/bg-image.jpg';

const services = [
  {
    title: "Comprehensive Marketing Plan",
    description: "Responsive. I am always available via phone, text, or email.",
    img: "https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/rmtn3r5zpsljdsncbwa4/image-007"
  },
  {
    title: "Syndication",
    description: "I market your property locally, nationally, and internationally.",
    img: "https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/ks8ztlvw2b35q5qgs6xn/image-011"
  },
  {
    title: "Virtual Tour",
    description: "Let's make your home stand out with a high quality virtual tour.",
    img: "https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/zr3bugldblvebixagfs1/image-009"
  },
  {
    title: "Photography",
    description: "Beautiful, high-end photography is a central part of our marketing plan for your property.",
    img: "https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/dywgmsgzddtcsqxagbwh/image-013"
  }
];

const sellingProcess = [
  {
    step: 'Step 1: Initial Consultation & Planning',
    description: 'In this first step, we meet with you to discuss your goals and expectations. We will evaluate your property’s current market value and develop a tailored strategy to maximize its appeal. This includes setting a timeline and defining the necessary steps to prepare for the sale.',
    img: 'https://plus.unsplash.com/premium_vector-1682304530350-7a4f9c5c26a8?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    step: 'Step 2: Devise & Execute Marketing Plan',
    description: 'We create a comprehensive marketing plan to promote your property. This may include professional photography, virtual tours, online listings, open houses, and targeted advertising to reach potential buyers. Our goal is to generate interest and attract the right audience.',
    img: 'https://plus.unsplash.com/premium_vector-1682309085673-3f99339397f4?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    step: 'Step 3: Review Offers & Reach Agreement with Buyer',
    description: 'Once an agreement is reached, we guide you through the transaction process. This involves coordinating inspections, appraisals, and paperwork. We ensure all legal requirements are met and assist you in understanding every aspect of the closing process.',
    img: 'https://plus.unsplash.com/premium_vector-1718400635659-8ef7ac1b9446?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    step: 'Step 4: Complete Transaction Process',
    description: 'We manage property showings and handle negotiations to secure the best possible offer for you. Our team provides expert guidance throughout the process, ensuring all details are addressed and facilitating communication with buyers, inspectors, and appraisers for a seamless transaction.',
    img: 'https://plus.unsplash.com/premium_vector-1726930891975-17fea8715b59?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },  
  {
    step: 'Step 5: After-Sale Service',
    description: 'We assist you through the closing process, ensuring all paperwork is completed and that you understand each step of the transaction.',
    img: 'https://plus.unsplash.com/premium_vector-1682268951150-dad3f406a505?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];


const buyingProcess = [
  {
    step: 'Step 1: Initial Consultation & Planning',
    description: 'In this first step, we meet with you to discuss your needs and preferences. We will help you understand the home buying process, assess your budget, and identify key features you are looking for in a new home.',
    img: 'https://plus.unsplash.com/premium_vector-1682304530350-7a4f9c5c26a8?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    step: 'Step 2: Search for a Home & Get Pre-Approved',
    description: 'We will start searching for homes that fit your criteria. Additionally, we will guide you through the mortgage pre-approval process to help you understand your budget and strengthen your position when making an offer.',
    img: 'https://plus.unsplash.com/premium_vector-1682303164886-172eb4069625?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    step: 'Step 3: Submit an Offer',
    description: 'Once you find a home you love, we will help you submit a competitive offer. This involves determining the right price and terms, and presenting your offer to the seller in a way that stands out.',
    img: 'https://plus.unsplash.com/premium_vector-1682269633058-f9891a6eef4b?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    step: 'Step 4: Complete Settlement Process',
    description: 'We will assist you through the settlement process, coordinating inspections, appraisals, and final paperwork to ensure a smooth closing. We’ll be there to answer any questions and provide support every step of the way.',
    img: 'https://plus.unsplash.com/premium_vector-1720900147193-0ff1f28f8738?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];


function App() {
  const [show, setShow] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentBuyingStep, setCurrentBuyingStep] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const sellingStepsLength = sellingProcess.length;
  const buyingStepsLength = buyingProcess.length;

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  
 // Reinitialize AOS after step changes (for both selling and buying processes)
 useEffect(() => {
  AOS.refresh(); // Refresh AOS when steps change
}, [currentStep, currentBuyingStep]);

// Autoplay for Selling Process
useEffect(() => {
  const intervalId = setInterval(() => {
    setCurrentStep((prevStep) => (prevStep + 1) % sellingStepsLength);
  }, 5000); // Change every 5 seconds

  return () => clearInterval(intervalId); // Clean up the interval on unmount
}, [sellingStepsLength]);

// Autoplay for Buying Process
useEffect(() => {
  const intervalId = setInterval(() => {
    setCurrentBuyingStep((prevStep) => (prevStep + 1) % buyingStepsLength);
  }, 5000); // Change every 5 seconds

  return () => clearInterval(intervalId); // Clean up the interval on unmount
}, [buyingStepsLength]);
  
  return (
    <div>
      {/* Navbar */}
      <Navbar 
        variant="dark" 
        expand="lg" 
        style={{ 
          backgroundColor: 'transparent', 
          position: 'absolute', 
          zIndex: 1000, 
          width: '100%', 
          paddingTop: '50px', 
          boxShadow: 'none',
        }}
      >
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://res.cloudinary.com/luxuryp/images/w_1920,c_limit,f_auto,q_auto/tprhoiglqzbp9mbu8x8s/jhsereno-light"
              alt="Logo"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="nav-link" href="#meet-the-team">MEET THE TEAM</Nav.Link>
              <Nav.Link className="nav-link" href="#our-communities">OUR COMMUNITIES</Nav.Link>
              <Nav.Link className="nav-link" href="#home-evaluation">HOME EVALUATION</Nav.Link>
              <Nav.Link className="nav-link" href="#services">SERVICES</Nav.Link>
              <Nav.Link className="nav-link" href="#homes-america">HOMES ACROSS AMERICA</Nav.Link>
              <Nav.Link className="nav-link" href="#testimonials">TESTIMONIALS</Nav.Link>
              <Nav.Link className="nav-link" href="#contact-us">CONTACT US</Nav.Link>
            </Nav>
            {/* Button to open the side navbar */}
            <Button variant="outline-light" onClick={handleShow}>
              ☰
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Offcanvas for Side Navigation */}
      <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: '250px', backgroundColor: '#343a40', color: '#ffffff' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ backgroundColor: '#495057', padding: '20px' }}>
          {/* Search Input */}
          <div className="mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search..." 
              aria-label="Search" 
              style={{ backgroundColor: '#ffffff', color: '#000000' }} // Customize search input color
            />
          </div>
          <Nav className="flex-column">
            <Nav.Link href="#home" className="mb-2 text-white">HOME</Nav.Link>
            <Nav.Link href="#contact-us" className="mb-2 text-white">CONTACT US</Nav.Link>
            <Nav.Link href="#meet-the-team" className="mb-2 text-white">MEET THE TEAM</Nav.Link>
            <Nav.Link href="#our-communities" className="mb-2 text-white">OUR COMMUNITIES</Nav.Link>
            <Nav.Link href="#home-evaluation" className="mb-2 text-white">HOME EVALUATION</Nav.Link>
            <Nav.Link href="#homes-america" className="mb-2 text-white">HOMES ACROSS AMERICA</Nav.Link>
            <Nav.Link href="#testimonials" className="mb-2 text-white">TESTIMONIALS</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Header with Background Image */}
      <header 
        className="bg-dark text-white text-center py-5 d-flex align-items-center justify-content-center" 
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          position: 'relative'
        }}
        data-aos="fade-down" // Header animation
      >
        <div>
          <h1 data-aos="zoom-in">Our Real Estate Services</h1>
          <p className="lead" data-aos="fade-up">We offer a wide range of services for both tenants and landlords.</p>
        </div>
      </header>

      {/* Services Section */}
      <div className="container services-section">
        <h2 className="text-center services-title mb-4" data-aos="fade-up">Discover Our Exceptional Services</h2>
        <p className="text-center services-intro mb-4" data-aos="fade-up">
          Unlock the full potential of your real estate journey with our tailored services designed for both tenants and landlords. 
          At Luxury Presence, we don’t just offer services; we provide a comprehensive suite of solutions that elevate your experience 
          and maximize your property's value. Whether you’re looking to sell, rent, or invest, our expert team is dedicated to 
          guiding you every step of the way.
        </p>
        <p className="text-center mb-4" data-aos="fade-up">
          Explore our range of specialized services:
        </p>
        <div className="row">
          {services.map((service, index) => (
            <div className="col-md-6 mb-4" key={index} data-aos="fade-up">
              <div className="card animated d-flex flex-column" style={{ height: '100%' }}>
                <div className="row g-0 align-items-center flex-grow-1">
                  <div className="col-md-6">
                    <img src={service.img} className="img-fluid rounded-start" alt={service.title} />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title">{service.title}</h5>
                      <p className="card-text">{service.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


{/* Decor Guidance Section */}
<div className="container my-5">
  <div className="row align-items-center">
    <div className="col-md-6" data-aos="fade-right">
      <img 
        src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="Decor Guidance" 
        className="img-fluid rounded"
      />
    </div>
    <div className="col-md-6 decor-guidance-text" data-aos="fade-left">
      <h2>Decor Guidance</h2>
      <h4>My Staging Expertise</h4>
      <ul>
        <li>Transform your home into a welcoming sanctuary.</li>
        <li>Optimize storage with neat drawer and cabinet arrangements.</li>
        <li>Position furniture for functionality and flow.</li>
        <li>Emphasize natural light and space.</li>
        <li>Consultation on color palettes, decor styles, and furniture layouts.</li>
      </ul>
    </div>
  </div>
</div>



      {/* Intentional Layout Section */}
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6" data-aos="fade-left">
            <h2>Intentional Layout</h2>
            <h4>My Staging Expertise</h4>
            <ul>
              <li>Create a serene and clutter-free space for potential buyers.</li>
              <li>Organize and declutter to enhance appeal.</li>
              <li>Maintain a pet-free zone during showings.</li>
              <li>Foster a warm atmosphere with soft background music.</li>
            </ul>
          </div>
          <div className="col-md-6" data-aos="fade-right">
            <img 
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Intentional Layout" 
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
      
      <div>
      {/* Selling Process */}
      <div className="container selling-process mb-5">
        <h2 className="text-center process-title mb-4" data-aos="fade-up">Selling Your Home Made Simple</h2>

        {/* Numbered Buttons for Steps */}
        <div className="text-center mb-4">
          <div className="button-container">
            {sellingProcess.map((item, index) => (
              <div className="button-wrapper" key={index}>
                <button
                  className={`btn ${currentStep === index ? 'active' : ''}`}
                  onClick={() => setCurrentStep(index)}
                >
                  {index + 1}
                </button>
                {index < sellingProcess.length - 1 && <div className="line"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Display */}
        <div className="row">
          <div className="col-md-12 mb-4 d-flex align-items-stretch">
            <div
              className="card process-card d-flex"
              data-aos="fade-up" // AOS animation trigger
              style={{ height: '400px' }}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div className="text-content">
                  <h5 className="card-title" style={{ fontSize: '1.5rem' }}>
                    {sellingProcess[currentStep].step}
                  </h5>
                  <p className="card-text" style={{ fontSize: '1.1rem' }}>
                    {sellingProcess[currentStep].description}
                  </p>
                </div>
                <img
                  src={sellingProcess[currentStep].img}
                  alt={sellingProcess[currentStep].step}
                  className="img-fluid rounded"
                  style={{ maxWidth: '200px', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buying Process */}
      <div className="container buying-process mb-5">
        <h2 className="text-center process-title mb-4" data-aos="fade-up">Buying Your Dream Home</h2>

        {/* Numbered Buttons for Steps */}
        <div className="text-center mb-4">
          <div className="button-container">
            {buyingProcess.map((item, index) => (
              <div className="button-wrapper" key={index}>
                <button
                  className={`btn ${currentBuyingStep === index ? 'active' : ''}`}
                  onClick={() => setCurrentBuyingStep(index)}
                >
                  {index + 1}
                </button>
                {index < buyingProcess.length - 1 && <div className="line"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Display */}
        <div className="row">
          <div className="col-md-12 mb-4 d-flex align-items-stretch">
            <div
              className="card process-card d-flex"
              data-aos="fade-up" // AOS animation trigger
              style={{ height: '400px' }}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div className="text-content">
                  <h5 className="card-title" style={{ fontSize: '1.5rem' }}>
                    {buyingProcess[currentBuyingStep].step}
                  </h5>
                  <p className="card-text" style={{ fontSize: '1.1rem' }}>
                    {buyingProcess[currentBuyingStep].description}
                  </p>
                </div>
                <img
                  src={buyingProcess[currentBuyingStep].img}
                  alt={buyingProcess[currentBuyingStep].step}
                  className="img-fluid rounded"
                  style={{ maxWidth: '200px', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

{/* Real Estate Success Section */}
<div className="container my-5">
  <div className="row align-items-center">
    <div className="col-md-6" data-aos="fade-right">
      <img 
        src="https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/azjfmtzx6evxpubynfci/edit-page-11r2" 
        alt="Real Estate Success" 
        className="img-fluid rounded"
      />
    </div>
    <div className="col-md-6" data-aos="fade-left">
      <h2>Over 33 Years of Real Estate Success</h2>
      <p>
        We provide every one of our clients with a level of service they won’t find anywhere else. 
        We give them what they need, often before they know they need it. In real estate, almost 
        everything can be negotiated. When you choose Hansen Partners, our experience is 100% 
        nonnegotiable. And it’s an experience like no other.
      </p>
      <h4>We Want To Create An Unforgettable Experience For You...</h4>
      <p>
        We combine data gained from your home’s Comparative Market Analysis with local market research to 
        create a marketing plan designed to help you meet your selling goals. Your home’s carefully 
        designed plan will include a range of online, print, and other marketing tools targeted to the 
        best-qualified pool of buyers.
      </p>
      <p>
        Successfully marketing a home in today’s real estate environment requires a firm with experience 
        and flexibility. Hansen Partners provides both.
      </p>
    </div>
  </div>
</div>

{/* Hansen Partners Tablet Section */}
<div className="container my-5">
  <div className="row align-items-center">
    <div className="col-md-6" data-aos="fade-right">
      <h2>The Hansen Partners Communications Tablet</h2>
      <p>
        We have created this wonderful tool to communicate with you daily and provide updates on what’s 
        happening with your home. Available with a click of your tablet, the benefits include:
      </p>
      <ul>
        <li>Review all documents and sign from the comfort of your home or anywhere.</li>
        <li>Stay updated on marketing activities, review materials, photos, etc. in real time.</li>
        <li>Meet with us face-to-face on our GoToMeeting platform to discuss the week’s events.</li>
        <li>Your own email and shared space for fast communication and video messaging.</li>
      </ul>
      <p>
        We believe that transparency and guidance are key to a great experience. We’ll handle all your 
        needs throughout the real estate process and think of things before a need arises.
      </p>
      <p><strong>Who you work with matters!</strong></p>
    </div>
    <div className="col-md-6" data-aos="fade-left">
      <img 
        src="https://res.cloudinary.com/luxuryp/images/w_1280,c_limit,f_auto,q_auto/fuammgjubhjfvgcqleef/edit-image-056 " 
        alt="Communications Tablet" 
        className="img-fluid rounded"
      />
    </div>
  </div>
</div>

{/* Online Marketing Strategy Section */}
<div className="container marketing-strategy my-5">
  <h2 className="text-center strategy-title mb-4" data-aos="fade-up">We Market Your Home to The World</h2>
  <h4 className="text-center mb-4" data-aos="fade-up">Our Online Marketing Strategy</h4>
  <p className="text-center mb-4" data-aos="fade-up">
    The Bay Area remains one of the world's most sought-after regions to live in, and when looking to sell, it is vital that your home be marketed online to audiences locally, nationally, and internationally.
  </p>

  <div className="row">
    <div className="col-md-4 mb-4" data-aos="fade-up">
      <h5>Local Exposure</h5>
      <p>
        Through our partnership with Nextdoor, the private online social network now used in over 80% of U.S. neighborhoods and virtually all Bay Area neighborhoods, we make sure your home receives targeted local exposure. 
        When you list your home with Hansen Partners, it will automatically appear on Nextdoor in your neighborhood.
      </p>
    </div>

    <div className="col-md-4 mb-4" data-aos="fade-up">
      <h5>National Exposure</h5>
      <p>
        We secure strategic positioning and enhancement on Realtor.com, Trulia, and Zillow, driving more consumers to your home and increasing exposure. 
        We will receive every inquiry about your property directly.
      </p>
    </div>

    <div className="col-md-4 mb-4" data-aos="fade-up">
      <h5>International Exposure</h5>
      <p>
        To expose your luxury listing to millions of potential homebuyers worldwide, we promote on prominent international real estate portals, including: 
        Wall Street Journal, LuxuryPortfolio.com, LuxuryRealEstate.com, LeadingRE.com, UniqueHomes.com, China.apr.com, Caimeiju, Juwai, and Country Life UK.
      </p>
    </div>
  </div>

  {/* Image at the center bottom with animation */}
  <div className="text-center mt-4">
    <img 
      src="https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/olcvsnzpdrd5tov8dbci/image-057" 
      alt="Marketing Strategy" 
      className="img-fluid"
      style={{ maxWidth: "30%", height: "auto" }} 
      data-aos="zoom-in" // You can change "zoom-in" to any other AOS effect you prefer
    />
  </div>
</div>


{/* Leading Real Estate Companies Section */}
<div className="container luxury-affiliations my-5 text-center">
  <h2 className="affiliations-title mb-4" data-aos="fade-up">Leading Real Estate Companies of The World® & Luxury Portfolio International</h2>
  <p className="mb-4" data-aos="fade-up">
    JRockcliff is a founding member of Luxury Portfolio International®, the luxury division of Leading Real Estate Companies of the World®. 
    With more than 500 member firms around the world, our luxury listings are exposed to a vast global audience and reach potential buyers and investors in over 50 countries.
  </p>

  <div className="row justify-content-center mb-4">
    <div className="col-md-4 mb-4" data-aos="fade-up">
      <img 
        src="https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/t3i3guvh1dnpwu8mrvuf/image-070" 
        alt="Luxury Portfolio" 
        className="img-fluid" 
        style={{ height: "100px", objectFit: "cover" }} 
      />
    </div>
    <div className="col-md-4 mb-4" data-aos="fade-up">
      <img 
        src="https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/p4rjc7oqvxtccrdqejbt/image-060" 
        alt="Luxury Listing" 
        className="img-fluid" 
        style={{ height: "100px", objectFit: "cover" }} 
      />
    </div>
    <div className="col-md-4 mb-4" data-aos="fade-up">
      <img 
        src="https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/ichuh7qj1rsu7mqxpl5p/image-069" 
        alt="Luxury Real Estate" 
        className="img-fluid" 
        style={{ height: "100px", objectFit: "cover" }} 
      />
    </div>
  </div>


  <h3 className="mb-4" data-aos="fade-up">Who's Who in Luxury Real Estate</h3>
  <p className="mb-4" data-aos="fade-up">
    Who’s Who in Luxury Real Estate is a global collection of luxury real estate brokers.
  </p>

  <div className="row mb-4">
    <div className="col-md-6 mb-4" data-aos="fade-up" style={{ paddingRight: "5px" }}>
      <img 
        src="https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/og3ockhby4gghmrdfseo/edited-p-19" 
        alt="Who's Who in Luxury Real Estate" 
        className="img-fluid"
        style={{ maxWidth: "50%", height: "auto", borderRadius: "10px" }} 
      />
    </div>
    <div className="col-md-6 mb-4" data-aos="fade-up" style={{ paddingLeft: "5px" }}>
      <img 
        src="https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/ebvif7iqcx0lcjlvwyuz/edited-page-20" 
        alt="Luxury Brokers" 
        className="img-fluid"
        style={{ maxWidth: "50%", height: "auto", borderRadius: "10px" }} 
      />
    </div>
  </div>

  <p className="mb-4" data-aos="fade-up">
    Through our international affiliations, we have a strong presence in over 50 countries. 
    Our luxury listings are sent to prominent international real estate sites, reaching over 70 million potential buyers and investors worldwide.
  </p>

  <p className="mb-4" data-aos="fade-up">
    We also have several well-positioned affiliate offices in China, providing our clients with access to buyers in Hong Kong, Shanghai, and Beijing.
  </p>
</div>

{/* Additional Features Section */}
<div className="container features my-5 text-center">
  <h2 className="features-title mb-4" data-aos="fade-up">Our Unique Marketing Features</h2>
  
  <div className="row">
    <div className="col-md-3 mb-4" data-aos="fade-up">
      <img src="https://plus.unsplash.com/premium_vector-1722878342079-c12d74fbe5b2?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Responsive" className="img-fluid rounded mb-3" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <h3>Responsive</h3>
      <p>We prioritize communication and are always available via phone, text, or email to address your questions and concerns promptly.</p>
    </div>
    
    <div className="col-md-3 mb-4" data-aos="fade-up">
      <img src="https://plus.unsplash.com/premium_vector-1710774474656-a87f26523b66?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Syndication" className="img-fluid rounded mb-3" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <h3>Syndication</h3>
      <p>We strategically market your property on local, national, and international platforms, ensuring maximum visibility and reach to potential buyers.</p>
    </div>
    
    <div className="col-md-3 mb-4" data-aos="fade-up">
      <img src="https://plus.unsplash.com/premium_vector-1727170107170-31003bd443b4?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Virtual Tour" className="img-fluid rounded mb-3" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <h3>Virtual Tour</h3>
      <p>We enhance your property’s appeal with high-quality virtual tours, allowing prospective buyers to explore your home from the comfort of their own space.</p>
    </div>
    
    <div className="col-md-3 mb-4" data-aos="fade-up">
      <img src="https://plus.unsplash.com/premium_vector-1711987595331-ccca819aca99?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Drone Photography" className="img-fluid rounded mb-3" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <h3>Drone Photography</h3>
      <p>We utilize stunning drone photography to showcase your property from breathtaking perspectives, making it stand out in today’s competitive market.</p>
    </div>
  </div>
</div>

{/* Work With Us Section */}
<div className="work-with-us">
  <div className="work-with-us-bg"></div>
  <div className="work-with-us-overlay"></div>
  <div className="work-with-us-content">
    <h2 className="work-with-us-title" data-aos="fade-up">Work With Us</h2>
    <p className="work-with-us-description" data-aos="fade-up">With decades of experience in luxurious Tri Valley real estate, our team is here to ensure that your dreams are a reality. Let us guide you through your home buying journey, contact us today!</p>
    <button className="btn btn-primary" data-aos="fade-up">CONTACT US</button>
  </div>
</div>


{/* Footer Section */}
<footer className="footer my-5">
  <div className="container text-center">
    <h2 className="footer-title mb-4" data-aos="fade-up">Julie Hansen Partnership</h2>
    <p className="footer-description mb-4" data-aos="fade-up">
      We are an elite group of the East Bay’s most talented and visionary real estate professionals. Our mission is to provide buyers and sellers with the exceptional service they deserve. We prioritize integrity, offer extensive resources, and maintain a global reach, ensuring that every aspect of your real estate journey is handled with the utmost care and expertise.
    </p>

    <div className="row">
      <div className="col-md-8 footer-contact-info" data-aos="fade-up">
        <h3>Contact Information</h3>
        <p><strong>4733 Chabot Drive #100, Pleasanton, CA 94588</strong></p>
        <p><strong>Julie Hansen-Orvis | CA DRE# 00934447</strong></p>
        <p><strong>(925) 553-6707</strong></p>
        <p><strong> <a href="mailto:luxuryhomesinwc@icloud.com">luxuryhomesinwc@icloud.com</a></strong></p>

        <div className="logos mt-4">
          <img src="https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/zbesma34ygwklawiysod/dark-realtor-logo_x1vczu" alt="Realtor Logo" className="footer-logo" />
          <img src="https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/siun2nwoji9w7v0mssvy/dark-equal-logo_gahxpa" alt="Equal Logo" className="footer-logo" />
          <img src="https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/qje0mcix0r0qeoiikumu/sereno-logo" alt="Sereno Logo" className="footer-logo" />
        </div>
      </div>

      <div className="col-md-4 footer-newsletter" data-aos="fade-up">
        <h3>Subscribe to Our Newsletter</h3>
        <p>Stay updated with the latest news and trends in the luxury real estate market. Sign up today!</p>
        <form className="d-flex flex-column">
          <input type="email" placeholder="Enter your email" required className="mb-2" />
          <button type="submit" className="btn newsletter-btn">Subscribe</button>
        </form>
        <p className="privacy-policy mt-2">
          By providing your contact information, you agree to our <a href="/privacy-policy">Privacy Policy</a> and consent to receive marketing communications, including automated calls, texts, and emails. You may opt out at any time.
        </p>
      </div>
    </div>

    <p className="footer-credit mt-4">Website Designed & Developed by Luxury Presence</p>
    <p className="footer-copyright">Copyright 2024 | <a href="/privacy-policy">Privacy Policy</a></p>
  </div>
</footer>


      </div>
    );
  }
  
  export default App;
  
