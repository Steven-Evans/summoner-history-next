import React from 'react';
import Router from 'next/router';

class SummonerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {summonerName: ''};
  }
  
  render() {
    return (
      <div className="content">
        <h1>Battlefy Technical Exercise</h1>
        <form onSubmit={() => Router.push(`/summoner/${this.state.summonerName}`)}>
          <label>
            Enter a Summoner Name 
            <input
              id="summoner"
              type="text"
              placeholder="Velguarder"
              value={this.state.summonerName}
              onChange={(e) => this.setState({summonerName: e.target.value})}
            />
          </label>
        </form>
        <style jsx>{`
          input {
            margin-left: 1em;
          }
          .content {
            text-align: center;
          }
        `}</style>
      </div>
    );
  }
}

export default SummonerForm;
