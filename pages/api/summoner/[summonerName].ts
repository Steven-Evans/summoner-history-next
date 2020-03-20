import { NextApiRequest, NextApiResponse } from 'next'
// @ts-ignore
const { Kayn, REGIONS } = require('kayn');
const MATCH_HISTORY_LENGTH = 5;
import champions from '../../../lib/champions.json';
import items from '../../../lib/items.json';


const kayn = Kayn(process.env.LEAGUE_API_KEY)({
  region: REGIONS.NORTH_AMERICA,
  locale: 'en_US',
  requestOptions: {
    shouldRetry: true,
    numberOfRetriesBeforeAbort: 3,
    delayBeforeRetry: 1000,
  }
});

const getItemFromID = (itemId) => {
  if (itemId === 0) return null;
  return items[itemId];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const summonerName = req.query.summonerName;

  let matches;
  try {
    const summonerDTO = await kayn.Summoner.by.name(summonerName);
    const matchlistDTO = await kayn.Matchlist.by.accountID(summonerDTO.accountId).query({endIndex: MATCH_HISTORY_LENGTH});
    matches = await Promise.all(matchlistDTO.matches.map((matchReference: any) => kayn.Match.get(matchReference.gameId)));
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode).end(err.error.name + err.error.message);
  }
  const data = matches.map((match: any) => {
    const participantId = match.participantIdentities.find((participant: any) => participant.player.summonerName === summonerName).participantId;
    const participant = match.participants.find((player: any) => player.participantId === participantId);
    const stats = participant.stats;

    const itemIds = [stats.item0, stats.item1, stats.item2, stats.item3, stats.item4, stats.item5, stats.item6];
    const itemNames = itemIds.map(item => getItemFromID(item)).filter(item => item);
    
    return {
      win: stats.win,
      itemNames: itemNames,
      kills: stats.kills,
      deaths: stats.deaths,
      assists: stats.assists,
      totalMinionsKilled: stats.totalMinionsKilled,
      champLevel: stats.champLevel,
      sightWardsBoughtInGame: stats.sightWardsBoughtInGame,
      championName: champions[participant.championId],
      spell1Id: participant.spell1Id,
      spell2Id: participant.spell2Id,
      gameDuration: match.gameDuration,
    }
  });

  return res.status(200).json({ matches: data });
};
