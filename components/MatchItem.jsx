import React from "react";

const division = (totalKilled, duration, precision) => Math.round(Math.pow(10, precision)* totalKilled / duration) / Math.pow(10, precision);

const MatchItem = (props) => {
  const match = props.match;
  return (
  <div className="content">
    <div className="inlineBlock">
      <section>{match.win ? 'Victory' : 'Defeat'}</section>
      <section>{Math.floor(match.gameDuration / 60)}m{match.gameDuration % 60}s</section>
    </div>
    <div className="inlineBlock">
      <section>{match.championName}</section>
    </div>
    <div className="inlineBlock">
      <section>{match.kills} / {match.deaths} / {match.assists}</section>
      <section>{division((match.kills + match.assists), match.deaths, 2)} : 1 KDA</section>
    </div>
    <div className="inlineBlock">
      <section>Level: {match.champLevel}</section>
      <section>CS: {match.totalMinionsKilled}, ({division((match.totalMinionsKilled * 60), match.gameDuration, 1)})</section>
    </div>
    <div className="inlineBlock">
      {
        match.itemNames.map((item) => (
          <section>
            {item}
          </section>
        ))
      }
    </div>
    <style jsx>{`
      .inlineBlock {
        box-sizing: border-box;
        display: inline-block;
        width: 20%;
        text-align: center;
        white-space: normal;
        vertical-align: middle;
      }
      .content {
        margin: 1em auto;
        max-width: 1000px;
        padding: 1em;
        border: 2px solid;
      }
      section {
        white-space: nowrap;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
      }
    `}</style>
  </div>
)}

export default MatchItem;
