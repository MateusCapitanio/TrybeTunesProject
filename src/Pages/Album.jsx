import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';
import '../styles/album-style.css';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listSongs: [],
      loading: true,
      album: {},
      favoriteSongs: [],
    };
  }

  componentDidMount = () => {
    this.getMusicsCheck();
  }

  clickInputFavorite = async ({ target }) => {
    const { listSongs } = this.state;
    const musicFound = listSongs.find((e) => e.trackId === parseFloat(target.id));
    this.setState({ loading: true });
    await addSong(musicFound);
    this.setState((prevState) => ({
      loading: false,
      favoriteSongs: [...prevState.favoriteSongs, musicFound],
    }));
  }

  getMusicsCheck = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const responseLocalStorage = await getFavoriteSongs();
    const album = response[0];
    const listSongs = response.filter((e) => e.kind === 'song');
    this.setState({
      loading: false,
      album,
      listSongs,
      favoriteSongs: responseLocalStorage,
    });
  }

  render() {
    const { listSongs, loading, album, favoriteSongs } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (
          <div className="list-songs">
            <div className="album-description">
              <img
                style={ { width: '200px' } }
                alt="Capa do albúm"
                src={ album.artworkUrl100 }
              />
              <h1 data-testid="artist-name">{album.artistName}</h1>
              <h3 data-testid="album-name">{album.collectionName}</h3>
            </div>
            <ul>
              {
                listSongs.map((e, index) => (
                  <li key={ index }>
                    <MusicCard
                      trackId={ e.trackId }
                      trackName={ e.trackName }
                      previewUrl={ e.previewUrl }
                      clickInput={ this.clickInputFavorite }
                      check={ favoriteSongs.some((music) => e.trackId === music.trackId) }
                    />
                  </li>
                ))
              }
            </ul>
          </div>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
};

export default Album;
