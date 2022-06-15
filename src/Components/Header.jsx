import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../styles/header-style.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      loading: false,
    };
  }

  componentDidMount = () => {
    this.checkUser();
  }

  checkUser = async () => {
    this.setState({ loading: true });
    const userData = await getUser();
    this.setState({
      loading: false,
      name: userData.name,
    });
  };

  render() {
    const { loading, name } = this.state;
    return (
      <header className="header" data-testid="header-component">
        <h1>Trybetunes</h1>
        <div className="links">
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </div>
        {loading ? <p className="user-login">Carregando...</p>
          : <p data-testid="header-user-name" className="user-login">{name}</p>}
      </header>
    );
  }
}

export default Header;
