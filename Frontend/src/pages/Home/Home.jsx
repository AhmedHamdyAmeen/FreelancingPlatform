import React from "react";
import Feature from "../../components/Home/Feature/Feature";
import "./Home.css";
import { FaCode, FaPalette, FaShieldVirus, FaApple } from "react-icons/fa";
import VideoCard from "../../components/Home/VideoCard/VideoCard";

function Home() {
  const featureData = [
    {
      icon: <FaCode />,
      title: "Web Development",
    },
    {
      icon: <FaPalette />,
      title: "UX/UI Design",
    },
    {
      icon: <FaApple />,
      title: "Mobile & Desktop Apps",
    },
    {
      icon: <FaShieldVirus />,
      title: "Cyber Security",
    },
  ];

  const learnDetails = [
    {
      title: "How to Start",
      imgPath: `http://localhost:3000/assets/img/p-1.jpg`,
    },
    {
      title: "Build Your Profile",
      imgPath: `http://localhost:3000/assets/img/p-3.png`,
    },
    {
      title: "Earn Mony",
      imgPath: `http://localhost:3000/assets/img/p-4.jpg`,
    },
    {
      title: "First Proposal",
      imgPath: `http://localhost:3000/assets/img/p-5.png`,
    },
    {
      title: "How to Start",
      imgPath: `http://localhost:3000/assets/img/p-6.png`,
    },
    {
      title: "How to Start",
      imgPath: `http://localhost:3000/assets/img/p-7.jpg`,
    },
  ];

  return (
    <div>
      {/* <Navbar /> */}
      <section id="home">
        <section className={`landing py-5`}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-8 col-lg-6">
                <div className="landingHead">
                  <h5 className="py-2">
                    MIDDLE EAST’S FAVORITE EXPERTS MARKETPLACE
                  </h5>
                  <h2>
                    Start building your career,{" "}
                    <span>one client at a time</span>
                  </h2>
                  <h4 className="py-5">
                    Join a global talent pool of expert freelancers!
                  </h4>
                  <br />
                  <div className="imgContainer position-relative py-5">
                    <img
                      src="https://ureed.com/assets/images/profile_image_61837_1620171606893.jpg"
                      alt=""
                    />
                    <img
                      src="https://ureed.com/assets/images/profile_photo_36649_1618851286919.jpg"
                      alt=""
                    />
                    <img
                      src="https://ureed.com/assets/images/profile_image_22710_1620133397571.jpg"
                      alt=""
                    />
                    <img
                      src="https://ureed.com/assets/images/profile_photo_42518_1620122514009.jpg"
                      alt=""
                    />
                    <img
                      src="https://ureed.com/assets/images/profile_image_72222_1619951129229.jpg"
                      alt=""
                    />
                    <img
                      src="https://ureed.com/assets/images/profile_photo_70543_1619746628205.jpg"
                      alt=""
                    />
                    <img
                      src="https://ureed.com/assets/images/profile_image_71800_1619641206620.jpg"
                      alt=""
                    />
                  </div>

                  <div className="earning bg-dark text-light rounded p-3 my-5">
                    <p>Earning as...</p>
                    <div className="d-flex">
                      <div
                        style={{
                          width: "70%",
                          height: "40px",
                          display: "inline-flex",
                          background: `var(--lightBlue)`,
                          color: `var(--beige)`,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="rounded me-1"
                        type="text"
                      >
                        Full Stack Web Developer
                      </div>
                      <button className="btn btn-primary">Get Started</button>
                    </div>
                  </div>

                  <ul>
                    <li>Engage with the region’s most promising companies</li>
                    <li>
                      Minimize risk with management tools and automated
                      processes
                    </li>
                    <li>
                      Promote your practice and find relevant opportunities
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-4 col-lg-6 coverImg d-flex"></div>
            </div>
          </div>
        </section>

        <section className="features py-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-4 ">
                <h2 className="featuresTitle py-5 h1 fw-bolder">
                  Our Features...
                </h2>
                <p className="featureDesc mb-5 mb-lg-0">
                  Devolenco provide a package fo Specializations in the Software
                  Industry..
                  <span> Everywhere, We with you.</span>
                </p>
                <div className="dotedBG d-none d-lg-block"></div>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Feature data={featureData[0]} />
                <Feature data={featureData[1]} />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Feature data={featureData[2]} />
                <Feature data={featureData[3]} />
              </div>
            </div>
          </div>
        </section>

        <section className="customer container py-5">
          <h3 className="text-center py-4">
            TRUSTED BY OVER 8,000 COMPANIES AROUND THE WORLD
          </h3>
          <div className="d-flex flex-wrap  justify-content-center align-content-center">
            <img src="./assets/img/brands/amazon.webp" alt="" />
            <img src="./assets/img/brands/noon.webp" alt="" />
            <img src="./assets/img/brands/axa.webp" alt="" />
            <img src="./assets/img/brands/mbrcgi.webp" alt="" />
            <img src="./assets/img/brands/ef.webp" alt="" />
          </div>
        </section>

        <section className="container hero py-5">
          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="card my-5 my-lg-0">
                <img
                  src="./assets/img/4.jpg"
                  className="card-img-top heroCover"
                  alt=".."
                />

                <div className="card-body position-relative">
                  <div className="card-title position-absolute hourRate">
                    Starting $50 USD / hr
                  </div>
                  <div className="imgP position-relative">
                    <img
                      className="card-img-top heroImg position-absolute"
                      src="./assets/img/p-8.jpg"
                      alt=""
                    />
                  </div>
                  <p className="card-text pt-5 fw-bolder fs-4">
                    Looking for a senior software developer to build our website
                  </p>

                  <hr />
                  <div className="skills py-3">
                    <p> Expert In:</p>
                    <span className="me-2 py-1 px-3 mb-1 rounded-4">
                      JavaScript
                    </span>
                    <span className="me-2 py-1 px-3 mb-1 rounded-4">React</span>
                    <span className="me-2 py-1 px-3 mb-1 rounded-4">
                      NodeJS
                    </span>
                    <br />
                    <span className="me-2 py-1 px-3 mb-1 rounded-4">
                      TailWindCSS
                    </span>
                    <span className="me-2 py-1 px-3 mb-1 rounded-4">
                      Webpack
                    </span>
                  </div>
                </div>

                <div className="card-footer">
                  <button className="btn btn-secondary w-100">
                    Submit a Pitch
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8 heroText px-lg-5">
              <h2 className="fw-bolder" style={{ color: `var(--blue)` }}>
                Find Work
              </h2>
              <h2 className="fw-bolder mb-5">That you enjoy 🎉</h2>
              <p>
                Access thousands of opportunities every week posted by employers
                from across the region
              </p>
              <p>
                Can’t find what you’re looking for? Reach out to our
                <span> customer success team</span> and let us know what we’re
                missing.
              </p>
            </div>
          </div>
        </section>

        <section className="learn py-5">
          <div className="container">
            <h5
              className="text-center "
              style={{ color: `var(--blue)`, fontWeight: "bolder" }}
            >
              Learn More!
            </h5>
            <h1 className="text-center py-3">
              Everything you need to get started on Frelancico.com today
            </h1>
            <div className="row  row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {learnDetails.map((item, i) => (
                <div className="col" key={`a-${i}`}>
                  <VideoCard data={item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Home;
