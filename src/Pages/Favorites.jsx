import React from 'react';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listSongs: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.refoundMusics();
  }

  refoundMusics = async () => {
    const response = await getFavoriteSongs();
    this.setState({
      loading: false,
      listSongs: response,
    });
    this.setState({ listSongs: response });
  }

  onclickRemove = async ({ target }) => {
    const { listSongs } = this.state;
    const result = listSongs.find((e) => e.trackId === parseFloat(target.id));
    this.setState({ loading: true });
    await removeSong(result);
    this.refoundMusics();
    this.setState({ loading: false });
  }

  render() {
    const { listSongs, loading } = this.state;

    if (loading) { return <Loading />; }

    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          {listSongs.map((e, index) => (
            <MusicCard
              trackId={ e.trackId }
              key={ index }
              id={ e.trackId }
              trackName={ e.trackName }
              previewUrl={ e.previewUrl }
              clickInput={ this.onclickRemove }
              check
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Favorites;
