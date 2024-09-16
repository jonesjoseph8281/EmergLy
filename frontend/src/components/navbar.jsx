import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contacts">Contacts</Link></li>
        <li><Link to="/location">Location</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
