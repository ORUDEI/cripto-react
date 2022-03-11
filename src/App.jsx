import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Form from "./components/Form";
import Result from "./components/Result";
import Spinner from "./components/Spinner";
import CryptoImg from "./img/imagen-criptos.png";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Img = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const SpinnerContainer = styled.div`
  padding-top: 30px;
  display: flex;
  justify-content: center;
`

function App() {
  const [coins, setCoins] = useState({});
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(coins).length > 0) {
      setLoading(true);
      setResult({});
      const { coin, cryptocurrency } = coins;
      const findCrypto = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${coin}`;
        const resp = await fetch(url);
        const result = await resp.json();

        setResult(result.DISPLAY[cryptocurrency][coin]);
        setLoading(false);
      };
      findCrypto();
    }
  }, [coins]);

  return (
    <Container>
      <Img src={CryptoImg} alt="crypto images" />
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>;
        <Form setCoins={setCoins} />
        <SpinnerContainer>
        { loading && <Spinner />}
        </SpinnerContainer>
        {result.PRICE && <Result result={result} />}
      </div>
    </Container>
  );
}

export default App;
