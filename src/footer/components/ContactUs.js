import React from "react";
import {useState} from "react";
import { connect } from "react-redux";
import Header from "../../entertainment/modules/Header";
import Footer from "../../shopping/modules/Home/components/FooterWhite";

const ContactUs = () => {
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
        setContactForm({
            [e.target.name] : e.target.value
        });
    };

    const validation = () => {
        let fullnameError = "";
        let emailError = "";
        let mobileError = "";
        let messageError = "";
        
        if(!contactForm.fullname.trim()){
            fullnameError = "Field cannot be empty!"
        }

        if(!contactForm.email.trim()){
            emailError = "Field cannot be empty!"
        }

        if(!contactForm.mobile.trim()){
            mobileError = "Field cannot be empty!"
        }

        if(!contactForm.message.trim()){
            messageError = "Field cannot be empty!"
        }

        if(fullnameError || emailError || mobileError || messageError){
            setContactForm({
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
        isValid && console.log("isvalid :", isValid);
    };

    console.log("State :", contactForm);

    return (
      <>
        <Header />
        <div className="bg-black text-white mb-5">
          <div className="container-fluid blogsection specific mt-5">
            <form className="mb-5 mt-5" noValidate onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label for="exampleInputFullName">Full Name</label>
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
                <label for="exampleInputEmail">Email Address</label>
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
                <label for="exampleInputMobile">Mobile</label>
                <input
                  type="number"
                  name="mobile"
                  className="form-control"
                  id="exampleInputMobile"
                  placeholder="Enter your Mobile"
                  value={contactForm.mobile}
                  onChange={handleOnChange}
                />
                {<p className="text-danger">{contactForm.mobileError}</p>}
              </div>
              <div className="form-group">
                <label for="exampleInputMessage">Message</label>
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
          </div>
        </div>
        <Footer />
      </>
    );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
