import { NextPage } from 'next';
import { useRouter } from 'next/router';
import MatchItem from '../../components/MatchItem';
import fetch from 'node-fetch';
import SummonerForm from '../../components/SummonerForm';

const SummonerHistory: NextPage = (props: any) => {
  const matches = props.matches;
  return (
  <div>
    <SummonerForm />
    <ul>
      {matches.map((match, ind) => 
        <MatchItem key={ind} match={match}/>
      )}
    </ul>
    <style jsx>{`
      .matches: {
        
      }
    `}</style>
  </div>
  )
};

export async function getServerSideProps({ query }: any) {
  const res = await fetch(`${process.env.API_URL}/summoner/${query.summonerName}`);
  const matches = await res.json();
  return {
    props: matches
  };
}

export default SummonerHistory;

