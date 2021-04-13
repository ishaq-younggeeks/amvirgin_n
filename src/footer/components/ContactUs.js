import React from "react";
import {useState} from "react";
import { connect } from "react-redux";
import Header from "../../entertainment/modules/Header";
import Footer from "../../entertainment/modules/Footer";
import {contactUs} from "./FooterAction";

const ContactUs = (props) => {
    const [contactForm, setContactForm] = useState({
        fullname: "",
        email: "",
        mobile: "",
        message: "",
        fullnameError: "",
        emailError: "",
        mobileError: "",
        messageError: ""
    });

    const handleOnChange = (e) => {
        e.preventDefault();
        setContactForm({...contactForm,
            [e.target.name] : e.target.value
        });
    };

    const validation = () => {
        let fullnameError = "";
        let emailError = "";
        let mobileError = "";
        let messageError = "";
        
        if(contactForm.fullname === ""){
            fullnameError = "Field cannot be empty!"
        }

        if(contactForm.email === ""){
            emailError = "Field cannot be empty!"
        }
        else if (!/\S+@\S+\.\S+/.test(contactForm.email)){
            emailError = "Invalid Email!"
        }

        if(contactForm.mobile === ""){
            mobileError = "Field cannot be empty!"
        }
        else if (!/^[0-9]{10}$/.test(contactForm.mobile)) {
            mobileError = "Invalid Mobile Number!";
        }

        if(contactForm.message === ""){
            messageError = "Field cannot be empty!"
        }

        if(fullnameError || emailError || mobileError || messageError){
            setContactForm({
                ...contactForm,
                fullnameError,
                emailError,
                mobileError,
                messageError
            });
            return false;
        };
        return true;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let isValid = validation();
        isValid && props.contactUs(contactForm.fullname, contactForm.email, contactForm.mobile, contactForm.message)
        isValid && setContactForm({
            fullname: "",
            email: "",
            mobile: "",
            message: "",
        })
    };

    console.log("State :", contactForm);

    return (
      <>
        <Header />
        <div className="bg-black text-white">
          <div className="container blogsection specific mt-5">
            <form className="mb-5 mt-5" noValidate onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputFullName">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  className="form-control"
                  id="exampleInputFullName"
                  placeholder="Enter your Full Name"
                  value={contactForm.fullName}
                  onChange={handleOnChange}
                />
                {<p className="text-danger">{contactForm.fullnameError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail">Email Address</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail"
                  placeholder="email@example.com"
                  value={contactForm.email}
                  onChange={handleOnChange}
                />
                {<p className="text-danger">{contactForm.emailError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputMobile">Mobile</label>
                <input
                  type="number"
                  name="mobile"
                  className="form-control"
                  id="exampleInputMobile"
                  maxLength="10"
                  placeholder="Enter your Mobile"
                  value={contactForm.mobile}
                  onChange={handleOnChange}
                />
                {<p className="text-danger">{contactForm.mobileError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputMessage">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  id="exampleInputMessage"
                  placeholder="Write us down your issues / queries."
                  rows="4"
                  value={contactForm.message}
                  onChange={handleOnChange}
                />
                {<p className="text-danger">{contactForm.messageError}</p>}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <h4 className="text-success mb-3">{props.contactData}</h4>
          </div>
        </div>
        <Footer />
      </>
    );
}

const mapStateToProps = (state) => {
  return {
    contactData: state.Footer.contact
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    contactUs: (fullname, email, mobile, message) => dispatch(contactUs(fullname, email, mobile, message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
