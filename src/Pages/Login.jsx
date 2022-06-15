import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/login-style.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      loading: false,
      checkOk: false,
    };
  }

  componentDidMount() {
    const button = document.querySelector('#btnlogin');
    button.setAttribute('disabled', '');
  }

  checkInputName = ({ target }) => {
    const button = document.querySelector('#btnlogin');
    const minLength = 3;
    if (target.value.length >= minLength) {
      button.removeAttribute('disabled');
      button.style.background = 'rgb(235, 96, 96)';
      button.style.cursor = 'pointer';
    } else {
      button.setAttribute('disabled', '');
      button.style.background = 'rgb(202, 202, 202)';
      button.style.cursor = 'default';
    }
    this.setState({
      username: target.value,
    });
  }

  // consegui resolver o fetch dando uma olhada no requisito 2
  // do repositório da Wendy

  onclickSaveUser = async () => {
    const { username } = this.state;

    this.setState({ loading: true });
    await createUser({ name: username });
    this.setState({
      loading: false,
      checkOk: true,
    });
  }

  render() {
    const { loading, checkOk } = this.state;

    if (loading) {
      return <Loading />;
    } if (checkOk) {
      return <Redirect to="/search" />;
    }

    return (
      <div className="login-form" data-testid="page-login">
        <form className="form-align">
          <h1 id="cu">Autenticação</h1>
          <input
            onChange={ this.checkInputName }
            data-testid="login-name-input"
            id="login"
            type="text"
            placeholder="Nome"
          />
          <button
            onClick={ this.onclickSaveUser }
            id="btnlogin"
            data-testid="login-submit-button"
            type="button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
