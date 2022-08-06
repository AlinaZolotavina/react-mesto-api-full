import React from 'react';

function Footer({ year }) {
  
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {year} Mesto Russia</p>
    </footer>
  )
};

export default Footer;