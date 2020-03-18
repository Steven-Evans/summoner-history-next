import { NextPage } from 'next';

const Home: NextPage = () => <h1>Hello world!</h1>;

Home.getInitialProps = async ({ req }) => {
  return {};
};

export default Home;

