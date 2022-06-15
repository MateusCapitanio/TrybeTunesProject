import React from 'react';
import '../styles/style-card.css';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {
      image,
      albumName,
      artistName,
      key,
    } = this.props;
    return (
      <div key={ key } className="card-content">
        <img className="image" alt="Capa do albúm" src={ image } />
        <h3>{albumName}</h3>
        <p>{artistName}</p>
      </div>
    );
  }
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
};

export default Card;
