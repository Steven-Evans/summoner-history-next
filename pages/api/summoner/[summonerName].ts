import { NextApiRequest, NextApiResponse } from 'next'
// @ts-ignore
const { Kayn, REGIONS } = require('kayn');
const MATCH_HISTORY_LENGTH = 5;


const kayn = Kayn(process.env.LEAGUE_API_KEY)({
  region: REGIONS.NORTH_AMERICA,
  locale: 'en_US',
  requestOptions: {
    shouldRetry: true,
    numberOfRetriesBeforeAbort: 3,
    delayBeforeRetry: 1000,
  }
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const summonerName = 'awpeofijaweofjao'//req.query.summonerName;

  let matches;
  try {
    const summonerDTO = await kayn.Summoner.by.name(summonerName);
    const matchlistDTO = await kayn.Matchlist.by.accountID(summonerDTO.accountId).query({endIndex: MATCH_HISTORY_LENGTH});
    matches = await Promise.all(matchlistDTO.matches.map((matchReference: any) => kayn.Match.get(matchReference.gameId)));
  } catch (err) {
    console.error(err);
    res.status(err.statusCode).end(JSON.stringify(err));
  }
  const data = matches.map((match: any) => {
    const participantId = match.participantIdentities.find((participant: any) => participant.player.summonerName === summonerName).participantId;
    const participant = match.participants.find((player: any) => player.participantId === participantId);
    const stats = participant.stats;
    
    return {
      win: stats.win,
      item0: stats.item0,
      item1: stats.item1,
      item2: stats.item2,
      item3: stats.item3,
      item4: stats.item4,
      item5: stats.item5,
      item6: stats.item6,
      kills: stats.kills,
      deaths: stats.deaths,
      assists: stats.assists,
      totalMinionsKilled: stats.totalMinionsKilled,
      champLevel: stats.champLevel,
      sightWardsBoughtInGame: stats.sightWardsBoughtInGame,
      championId: participant.championId,
      spell1Id: participant.spell1Id,
      spell2Id: participant.spell2Id,
      gameDuration: match.gameDuration,
    }
  });

  
  //const requests = gameIds.map(kayn.Match.get)
  //const results = await Promise.all(requests)
  //Promise.all()
  //.catch((err: any) => {
  //    console.log('err', err);
  //});

  //res.end(`Variable: ${summonerName}`)
  res.end(JSON.stringify(data));
};