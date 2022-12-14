import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { CompactPicker } from 'react-color';

const CANVAS_SIZE = 3;

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    const emptyColor = { r: 0, b: 0, g: 0, a: 0 };
    this.state = {
      pickerIsActive: false,
      activeTileIndex: [0, 0],
      tiles: Array(CANVAS_SIZE)
        .fill(0)
        .map((row) => new Array(CANVAS_SIZE).fill(emptyColor))
    };

    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(color, event) {
    const [activeRow, activeColumn] = this.state.activeTileIndex;
    this.setState((prevState) => ({
      ...prevState,
      tiles: prevState.tiles.map((arr, i) =>
        arr.map((item, j) => {
          if (i === activeRow && j === activeColumn) {
            return color.rgb;
          } else {
            return item;
          }
        })
      )
    }));
  }

  render() {
    const tiles = this.state.tiles;

    const tileRows = this.renderAllTiles(tiles);
    return (
      <div className="Canvas">
        <div className="Canvas-flex">{tileRows}</div>
        <div className="color-picker-container">
          {this.state.pickerIsActive ? (
            <CompactPicker onChange={this.handleColorChange}></CompactPicker>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }

  handleTileClick(row, column) {
    this.setState({ pickerIsActive: true, activeTileIndex: [row, column] });
  }

  renderAllTiles(tiles) {
    const tileRows = [];
    for (let i = 0; i < CANVAS_SIZE; i++) {
      const tileColumns = [];
      for (let j = 0; j < CANVAS_SIZE; j++) {
        tileColumns.push(
          <Tile color={tiles[i][j]} onClick={() => this.handleTileClick(i, j)}></Tile>
        );
      }
      const tmpRow = <div className="Canvas-tile-row">{tileColumns}</div>;
      tileRows.push(tmpRow);
    }
    return tileRows;
  }
}

class Tile extends React.Component {
  render() {
    const { r, g, b, a } = this.props.color;
    const { onClick } = this.props;
    const baseCSS = {
      height: '70px',
      width: '70px',
      marginTop: '-1px',
      marginRight: '-1px',
      border: '1px solid black',
      alignSelf: 'center',
      flex: '0 0 auto',
      cursor: 'pointer'
    };

    const style = {
      ...baseCSS,
      ...{
        background: `rgba(${r}, ${g}, ${b}, ${a * 100})`
      }
    };
    return <div className="Tile" style={style} onClick={onClick}></div>;
  }
}

Tile.propTypes = {
  color: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
    a: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func
};

export default Canvas;
