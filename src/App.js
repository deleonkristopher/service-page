import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Form,NavDropdown, Modal, Navbar, Nav, Button, Container, NavLink, Row, Col} from 'react-bootstrap';
import bgImage from './assets/bg-image.jpg';

const services = [
  {
    title: "Always Available for Assistance",
    description: "Our team is readily accessible via phone, text, or email to promptly address any inquiries or concerns.",
    img: "https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/rmtn3r5zpsljdsncbwa4/image-007"
  },
  {
    title: "Comprehensive Marketing Strategy",
    description: "We implement a strategic marketing plan that promotes properties on local, national, and international platforms, ensuring maximum exposure.",
    img: "https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/ks8ztlvw2b35q5qgs6xn/image-011"
  },
  {
    title: "Enhancing Property Appeal",
    description: "High-quality virtual tours are utilized to distinguish homes in the market and effectively showcase their unique features.",
    img: "https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/zr3bugldblvebixagfs1/image-009"
  },
  {
    title: "Professional Visual Presentation",
    description: "Beautiful, high-end photography is a fundamental aspect of our marketing strategy, designed to present each property in the best possible light.",
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
    img: 'https://plus.unsplash.com/premium_vector-1682309204238-27c9e5f46685?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    step: 'Step 4: Complete Transaction Process',
    description: 'We manage property showings and handle negotiations to secure the best possible offer for you. Our team provides expert guidance throughout the process, ensuring all details are addressed and facilitating communication with buyers, inspectors, and appraisers for a seamless transaction.',
    img: 'https://plus.unsplash.com/premium_vector-1726930891975-17fea8715b59?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },  
  {
    step: 'Step 5: After-Sale Service',
    description: 'We assist you through the closing process, ensuring all paperwork is completed and that you understand each step of the transaction.',
    img: 'https://plus.unsplash.com/premium_vector-1682300600211-e68a6cd17ea2?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    img: 'https://plus.unsplash.com/premium_vector-1726190685850-e8297aaa7dc8?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Add your form submission logic here
    handleCloseModal(); // Close the modal after submission
  };
  
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

    // State for newsletter
    const [email, setEmail] = useState('');
    const [policyAgreed, setPolicyAgreed] = useState(false); // State for the checkbox
  
    const handleNewsletterSubmit = (e) => {
      e.preventDefault();
      if (policyAgreed) {
        console.log('Email submitted:', email);
        // Further processing here
      } else {
        alert('You must agree to the privacy policy.');
      }
    };
  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  
 // Reinitialize AOS after step changes (for both selling and buying processes)
 useEffect(() => {
  AOS.refresh(); // Refresh AOS when steps change
}, [currentStep, currentBuyingStep]);


  return (
    
<div className="App">

{/* Navbar */}
<Navbar 
  variant="dark" 
  expand="lg" 
  style={{ 
    position: 'absolute', 
    zIndex: 1000, 
    width: '100%', 
    paddingTop: '20px',
    boxShadow: 'none',
  }}
>
  <Container fluid>
    <Navbar.Brand href="#home">
      <img
        src="https://res.cloudinary.com/luxuryp/images/w_1920,c_limit,f_auto,q_auto/tprhoiglqzbp9mbu8x8s/jhsereno-light"
        alt="Logo"
        className="d-inline-block align-top"
      />
    </Navbar.Brand>
    
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <Nav className="ms-auto">
        {/* Dropdown for Team and Testimonials */}
        <NavDropdown title="About Us" id="about-dropdown">
          <NavDropdown.Item href="https://hansenpartners.net/team">Meet the Team</NavDropdown.Item>
          <NavDropdown.Item href="https://hansenpartners.net/testimonials">Testimonials</NavDropdown.Item>
        </NavDropdown>

        {/* Dropdown for Home Services */}
        <NavDropdown title="Home Services" id="services-dropdown">
          <NavDropdown.Item href="https://hansenpartners.net/home-valuation">Home Evaluation</NavDropdown.Item>
          <NavDropdown.Item href="https://hansenpartners.net/services">Services</NavDropdown.Item>
        </NavDropdown>

        {/* Dropdown for Home Search */}
        <NavDropdown title="Find Your Home" id="home-search-dropdown">
          <NavDropdown.Item href="https://hansenpartners.net/home-search/listings">Search for Homes</NavDropdown.Item>
          <NavDropdown.Item href="https://hansenpartners.net/neighborhoods">Our Communities</NavDropdown.Item>
          <NavDropdown.Item href="https://hansenpartners.net/FeaturedListingHOA">Homes Across America</NavDropdown.Item>
        </NavDropdown>

        {/* Contact Us Link */}
        <Nav.Link className="nav-link" onClick={handleShowModal}>Contact Us</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  <Modal 
  show={showModal} 
  onHide={handleCloseModal} 
  dialogClassName="contact-modal modal-lg" // Make the modal larger
>
  <Modal.Header closeButton>
  </Modal.Header>
  <Modal.Body>
    <Row>
      {/* Contact Information Section */}
      <Col md={6} className="contact-info text-center"> {/* Centered text */}
        <h5>Contact Information</h5>
        <p>(925) 553-6707</p>
        <p><a href="mailto:luxuryhomesinwc@icloud.com">luxuryhomesinwc@icloud.com</a></p>
        <p>4337 Chabot Drive, Pleasanton, CA 94588</p>
        <p>Julie Hansen-Orvis | CA DRE# 00934447</p>
      </Col>

      {/* Send Us a Message Section */}
      <Col md={6}>
        <h5>Send Us a Message</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="custom-input form-control-lg" // Increased input size
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter your phone number"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="custom-input form-control-lg" // Increased input size
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="custom-input form-control-lg" // Increased input size
            />
          </Form.Group>
          <Form.Group controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4} // Adjusted rows for a larger textarea
              placeholder="Your message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="custom-input form-control-lg" // Increased input size
            />
          </Form.Group>
          <Form.Text className="text-muted">
            By providing your contact information, you acknowledge and agree to our Privacy Policy and consent to receiving marketing communications.
          </Form.Text>
         
        </Form>
        <Button 
  type="submit" 
  className="mt-3 modal-button" // Use the exclusive modal button class
>
  Submit A Message
</Button>
      </Col>
    </Row>
  </Modal.Body>
</Modal>

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
    <div className="container">
      <h1 className="display-4" data-aos="zoom-in">Our Real Estate Services</h1>
      <h3 className="lead" data-aos="fade-up">We offer a wide range of services for both tenants and landlords.</h3>
    </div>
  </header>



{/* Services Section */}
<div className="container services-section">
  <h2 className="text-left services-title mb-4" data-aos="fade-up">Discover Our Exceptional Services</h2>
  <p className="text-left services-intro mb-4" data-aos="fade-up">
    Unlock the full potential of your real estate journey with our tailored services designed for both tenants and landlords. 
    At Luxury Presence, we don’t just offer services; we provide a comprehensive suite of solutions that elevate your experience 
    and maximize your property's value. Whether you’re looking to sell, rent, or invest, our expert team is dedicated to 
    guiding you every step of the way.
  </p>
  <p className="text-left mb-4" data-aos="fade-up">
    Explore our range of specialized services:
  </p>
  <div className="row">
    {services.map((service, index) => (
      <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index} data-aos="fade-up">
        <div className="service-wrapper">
          <div className="card service-card" style={{ height: '100%' }}>
            <img src={service.img} className="img-fluid service-img" alt={service.title} />
          </div>
          {/* Title and text outside the card */}
          <div className="service-text">
            <h5 className="card-title">{service.title}</h5>
            <p className="card-text">{service.description}</p>
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
  <div className="container selling-process mb-5 " data-aos="fade-right">
    <h2 className="text-center process-title mb-4" data-aos="fade-up">
      Selling Your Home Made Simple
    </h2>

    {/* Numbered Buttons for Steps */}
    <div className="text-center mb-4">
      <div className="button-container d-flex justify-content-center flex-wrap" data-aos="fade-right">
        {sellingProcess.map((item, index) => (
          <div className="button-wrapper"  key={index}>
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
      <div className="col-12 mb-4 d-flex align-items-stretch" >
        <div
          className="card process-card d-flex flex-column" 
          data-aos="fade-up"
          style={{ height: '100%', minHeight: '300px' }} // Allow card to expand with content
        >
          <div className="card-body d-flex flex-column flex-lg-row justify-content-between align-items-center">
            <div className="text-content text-lg-left">
              <h5 className="card-title" style={{ fontSize: '1.5rem' }}>
                {sellingProcess[currentStep].step}
              </h5>
              <p className="card-text" style={{ fontSize: '1.1rem', textAlign: 'justify' }}>
                {sellingProcess[currentStep].description}
              </p>
            </div>
            <img
              src={sellingProcess[currentStep].img}
              alt={sellingProcess[currentStep].step}
              className="img-fluid rounded mb-3 mb-lg-0"
              style={{ maxWidth: '30%', height: 'auto' }} // Make image responsive
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Buying Process */}
  <div className="container buying-process mb-5">
    <h2 className="text-center process-title mb-4" data-aos="fade-up">
      Buying Your Dream Home
    </h2>

    {/* Numbered Buttons for Steps */}
    <div className="text-center mb-4">
      <div className="button-container d-flex justify-content-center flex-wrap">
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
      <div className="col-12 mb-4 d-flex align-items-stretch">
        <div
          className="card process-card d-flex flex-column"
          data-aos="fade-up"
          style={{ height: '100%', minHeight: '300px' }}
        >
          <div className="card-body d-flex flex-column flex-lg-row justify-content-between align-items-center">
            <div className="text-content text-lg-left">
              <h5 className="card-title" style={{ fontSize: '1.5rem' }}>
                {buyingProcess[currentBuyingStep].step}
              </h5>
              <p className="card-text" style={{ fontSize: '1.1rem', textAlign: 'justify' }}>
                {buyingProcess[currentBuyingStep].description}
              </p>
            </div>
            <img
              src={buyingProcess[currentBuyingStep].img}
              alt={buyingProcess[currentBuyingStep].step}
              className="img-fluid rounded mb-3 mb-lg-0"
              style={{ maxWidth: '30%', height: 'auto' }}
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
              <p><strong><a href="mailto:luxuryhomesinwc@icloud.com">luxuryhomesinwc@icloud.com</a></strong></p>

              <div className="logos mt-4">
                <img src="https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/zbesma34ygwklawiysod/dark-realtor-logo_x1vczu" alt="Realtor Logo" className="footer-logo" />
                <img src="https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/siun2nwoji9w7v0mssvy/dark-equal-logo_gahxpa" alt="Equal Logo" className="footer-logo" />
                <img src="https://res.cloudinary.com/luxuryp/images/f_auto,q_auto/qje0mcix0r0qeoiikumu/sereno-logo" alt="Sereno Logo" className="footer-logo" />
              </div>
            </div>

            <div className="col-md-4 footer-newsletter" data-aos="fade-up">
              <h3>Subscribe to Our Newsletter</h3>
              <p>Stay updated with the latest news and trends in the luxury real estate market. Sign up today!</p>
              <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                <Form.Group controlId="newsletterEmail">
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} // Handle email input change
                    className="mb-2"
                  />
                </Form.Group>
                <Button type="submit" className="btn newsletter-btn">Subscribe</Button>
              </Form>
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
  
