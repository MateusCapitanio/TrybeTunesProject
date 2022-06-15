import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      trackId,
      trackName,
      previewUrl,
      clickInput,
      check,
    } = this.props;

    return (
      <div>
        <h3>{ trackName }</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favoriteSong">
          Favorita
          <input
            name="favoriteSong"
            onChange={ clickInput }
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ check }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  clickInput: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired,
};

export default MusicCard;
