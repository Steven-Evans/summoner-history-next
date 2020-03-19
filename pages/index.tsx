import { NextPage } from 'next';

const Index: NextPage = () => <h1>Hello world!</h1>;

Index.getInitialProps = async ({ req }) => {
  return {};
};

export default Index;

