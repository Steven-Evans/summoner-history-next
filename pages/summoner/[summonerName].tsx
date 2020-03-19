import { NextPage } from 'next';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';

const SummonerHistory: NextPage = () => <h1>Hello world!</h1>;

export async function getServerSideProps({ query }: any) {
  const res = await fetch(`${process.env.API_URL}/summoner/${query.summonerName}`);
  const matches = await res.json();
  return {
    props: matches
  };
}

export default SummonerHistory;

