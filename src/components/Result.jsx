import styled from "@emotion/styled";

const Container = styled.div`
  color: #fff;
  font-family: "Lato", sans-serif;

  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
`;

const Img = styled.img`
  display: block;
  width: 120px;
`;

const Text = styled.p`
  font-size: 18px;
`;

const Price = styled.p`
  font-size: 30px;
  span: {
    font-weight: 700;
  }
`;

const Result = ({ result }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = result;
  return (
    <Container>
      <Img src={`https://cryptocompare.com/${IMAGEURL}`} alt="crypto image" />
      <div>
        <Price>
          El precio es de: <span>{PRICE}</span>
        </Price>
        <Text>
          El precio más alto del día <span>{HIGHDAY}</span>
        </Text>
        <Text>
          El precio más bajo del día: <span>{LOWDAY}</span>
        </Text>
        <Text>
          Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span>
        </Text>
        <Text>
          última actualización <span>{LASTUPDATE}</span>
        </Text>
      </div>
    </Container>
  );
};

export default Result;
