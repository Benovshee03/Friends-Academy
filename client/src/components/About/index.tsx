import React, { useEffect, useState } from 'react';
import rectangle from "../../images/Rectangle 12.png"
import rectangle1 from "../../images/Frame 1000002447.png"
import image1 from "../../images/image 141.png"
import image2 from "../../images/image 142.png"
import image3 from "../../images/image 143.png"
import image4 from "../../images/image 139.png"
import image5 from "../../images/image 144.png"
import image6 from "../../images/image 145.png"
import fatosh from "../../images/fatosh 2.png"
import benosh from "../../images/c8d5eab5-7572-47f4-a7f9-c2c02ff7b938.jpg"
const About = () => {
  const [responsive, setResponsive] = useState(window.innerWidth > 480);
  useEffect(() => {
    function handleResize() {
      setResponsive(window.innerWidth <= 480);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    function handleResize() {
      setResponsive(window.innerWidth <= 480);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <section className='container-fluid  bg-primary text-light d-f'  style={responsive ? {height:"420px" } : {height:"300px"}}>
        <div className={responsive ? 'w-70 m-2 p-2 d-f fd-column g-3 ' :"w-100  m-2 p-2 d-f fd-column g-1"}>
        <div className={responsive ? 'fs-44 fw-700 ' : "fw-700"}>About Friends English Academy</div>
        <p className='d-sm-none fs-20'>
          Friends Academy is a ground-breaking app for learning English, Turkish, France words and improving vocabulary for all speakers of English, from native speakers to beginner learners. It makes language learning more accessible to everyone around the globe.
        </p>
        <p className='d-none d-sm-flex fs-sm'>
          Friends Academy is a ground-breaking app for learning English, Turkish, France words and improving vocabulary for all speakers of English, from native speakers to beginner learners. It makes language learning more accessible to everyone around the globe.
        </p>
        </div>
        <div className='w-30 position-relative d-sm-none'>
          <img src={rectangle} className='position-absolute' alt="rectangle" style={{transform:"translateX(30%)",zIndex:"4"}}/>
          <img src={rectangle1} className='position-absolute' style={responsive? {transform:"translateX(90%)translateY(50%)"} : {}} alt="rectangle" />
        </div>
      </section>
      <section className={responsive ? "container mt-5 mb-5" : "container-sm mt-2 mb-2"}>
        <div className={responsive ? 'd-f fd-column g-4' : "d-f fd-column g-2"}>
        <div className={responsive ? "d-f align-items-center g-2" : "d-f fd-column g-2 align-items-center"}>
          <div>
          <h3>The Accurate English Test with Fast Results</h3>
        <p>
          Friends Academy is a quick and convenient online test to help higher education institutions and employers check the English levels of indivclassNameuals and groups of candclassNameates. It combines the latest AI technology with the reliability and quality you expect from Speak Up.
        </p>
          </div>
          <div>
            <img src={image1} style={responsive ? {} : {maxWidth:"320px"} } alt="rectangle" />
          </div>
      </div>

      <div className={responsive ? "d-f align-items-center g-2" : "d-f fd-column g-2 align-items-center"}>
      <div className='d-sm-none'>
            <img src={image2}  style={responsive ? {} : {maxWidth:"320px"} } alt="rectangle" />
          </div>
        <div>
        <h3>Our Path to Learning English, Step by Step</h3>
        <p>
          Effective and rewarding. Our unique approach encourages continuous progression with a clear path to improve language skills. We have qualifications for schools, general and higher education, and business.
        </p>
        </div>
        <div className='d-none d-sm-flex'>
            <img src={image2}  style={responsive ? {} : {maxWidth:"320px"} } alt="rectangle" />
          </div>

      </div>

      <div className={responsive ? "d-f align-items-center g-2" : "d-f fd-column g-2 align-items-center"}>
        <div>
        <h3>Together We Inspire Learners to Go Further</h3>
        <p>
          Our range of free teaching resources, lesson plans and activities is designed to help you prepare your students for our exams and tests. We also have a range of teaching qualifications, courses and support to help you develop as a teacher.
        </p>
        </div>
        <div>
            <img src={image3}  style={responsive ? {} : {maxWidth:"320px"} } alt="rectangle" />
          </div>
      </div>
      <div className='d-f justify-content-center'><button className='btn bg-primary text-light' type='submit' style={responsive ? {width:"392px",height:"48px"}:{width:"101px",height:"32px"}}>Start Learning</button></div>

        </div>


      </section>
      {/* <section className="w-100  d-f align-items-center justify-content-center text-light" style={responsive ? {height:"253px",backgroundColor:"#7D0019"} : {height:"146px",backgroundColor:"#7D0019"}}>
        <div className='w-90 d-f align-items-center' style={responsive ? {height:"104px",backgroundColor:"#781527"} : {height:"40px",backgroundColor:"#781527"}} >
          <div className={responsive ? 'd-f m-1 w-30 position-relative ml-5':'d-f m-1 w-30 position-relative ml-5 g-2'} >
            <div className='position-absolute' style={responsive ? {left:"20%",zIndex:"6"} : {right:"-15%",zIndex:"6"}}><img style={responsive ? {} :{width:"56px"}} src={image4} alt="circle" /></div>

            <div  className='position-absolute' style={responsive ? {left:"-20%",zIndex:"1"} : {left:"-50%",zIndex:"1"}}><img src={image5} alt="circle" style={responsive ? {} :{width:"56px"}}/></div>

            <div  style={{zIndex:"5"}}><img src={image6} alt="circle" style={responsive ? {} :{width:"56px"}}/></div>
          </div>
          <div>
          <div className={responsive ? " fs-lg fw-700" : "fs-sm fw-600"}>
          So do you want to improve your English?
          </div>
           <div className='d-sm-none'>
           Practice material and learning resources to help you improve your English.
           </div>
          </div>
        </div>
      </section> */}
      {/* <section className="d-f fd-column align-items-center" style={responsive ? {height:"500px"} : {height:"350px"}}>
        <h3>Meet Our Team</h3>
        <p>
          Our expert team is made up of creatives with technical knowhow, strategists who think outside the box, and developers who push innovation.
        </p>
        <ul className='d-f'>
          <div>
            <div style={{height:"202px"}}><img src={fatosh} alt="fatosh" style={responsive ? {width:"230px",}:{width:"120px"}}/></div>
            <div>
              <div>Fatima Yusifzada</div>
              <div>Director && CEO</div>
            </div>
          </div>
          <div>
            <div><img src={benosh} alt="team" style={responsive ? {width:"230px"}:{width:"120px"}} /></div>
            <div>
              <div>Benovshe Maharramova</div>
              <div>Developer</div>
            </div>
          </div>
        </ul>
      </section> */}
    </div>
  );
};

export default About;
function getCourse() {
  throw new Error('Function not implemented.');
}

