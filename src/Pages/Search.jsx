import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Components/Card';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/form-style-search.css';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      finishRequest: false,
      artist: '',
      listartists: [],
    };
  }

  componentDidMount() {
    const button = document.querySelector('#btnSearch');
    button.setAttribute('disabled', '');
  }

  checkInputArtist = ({ target }) => {
    const button = document.querySelector('#btnSearch');
    const minLength = 2;
    if (target.value.length >= minLength) {
      button.removeAttribute('disabled');
      button.style.background = 'rgb(235, 96, 96)';
      button.style.cursor = 'pointer';
    } else {
      button.setAttribute('disabled', '');
      button.style.background = 'rgb(202, 202, 202)';
      button.style.cursor = 'default';
    }
  }

  clickSearch = async () => {
    const input = document.querySelector('#inputSearch');
    this.setState({
      loading: true,
      artist: input.value,
    });
    const response = await searchAlbumsAPI(input.value);
    input.value = '';
    this.setState({
      loading: false,
      finishRequest: true,
      listartists: response,
    });
  }

  render() {
    const {
      loading,
      finishRequest,
      artist,
      listartists,
    } = this.state;

    if (loading) {
      return (
        <Loading />
      );
    }

    return (
      <div data-testid="page-search">
        <Header />
        <form className="form-style-search">
          <input
            id="inputSearch"
            onChange={ this.checkInputArtist }
            data-testid="search-artist-input"
            placeholder="Nome do artista"
            type="text"
          />
          <button
            onClick={ this.clickSearch }
            id="btnSearch"
            data-testid="search-artist-button"
            type="button"
          >
            Search
          </button>
        </form>
        <div className="content-artists">
          <div className="artists">
            {finishRequest ? (
              <h1
                style={ {
                  display: 'inline-block',
                } }
              >
                Resultado de álbuns de:
                {' '}
                {artist}
              </h1>)
              : ''}
            <div>
              {}
            </div>
            <div className="listcard">
              {listartists.length > 0 ? listartists.map((e, index) => (
                <Link
                  data-testid={ `link-to-album-${e.collectionId}` }
                  to={ `/album/${e.collectionId}` }
                  key={ index }
                >
                  <Card
                    image={ e.artworkUrl100 }
                    albumName={ e.collectionName }
                    artistName={ e.artistName }
                  />
                </Link>
              )) : <h1>Nenhum álbum foi encontrado</h1>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
