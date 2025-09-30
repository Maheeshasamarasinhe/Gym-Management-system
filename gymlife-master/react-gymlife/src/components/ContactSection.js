import React from 'react';

const ContactSection = () => {
  return (
    <section className="contact-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-title contact-title">
              <span>Contact Us</span>
              <h2>GET IN TOUCH</h2>
            </div>
            <div className="contact-widget">
              <div className="cw-text">
                <i className="fa fa-map-marker"></i>
                <p>333 Middle Winchendon Rd, Rindge, NH 03461</p>
              </div>
              <div className="cw-text">
                <i className="fa fa-mobile"></i>
                <ul>
                  <li>125-711-811</li>
                  <li>125-668-886</li>
                </ul>
              </div>
              <div className="cw-text email">
                <i className="fa fa-envelope"></i>
                <p>Support.gymcenter@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="leave-comment">
              <form>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="Website" />
                <textarea placeholder="Comment"></textarea>
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
        <div className="map">
          /* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d295.82797842393757!2d80.19772731549259!3d6.074099725494221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1719dc369a699%3A0xc8514a8379ad92f0!2sTHE%20GYM!5e0!3m2!1sen!2slk!4v1759205251485!5m2!1sen!2slk" width="600"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" height="550" style={{border:0}} allowFullScreen="" ></iframe>*
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
