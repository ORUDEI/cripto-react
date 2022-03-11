import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectCoins from "../hooks/useSelectCoins";
import { coins } from "../data/coins";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;
  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Form = ({setCoins}) => {
  const [crypto, setCrypto] = useState([]);
  const [error, setError] = useState(false);
  const [coin, SelectCoins] = useSelectCoins("Elige tu moneda", coins);
  const [cryptocurrency, SelectCryptocurrency] = useSelectCoins(
    "Elige tu Criptomoneda",
    crypto
  );

  useEffect(() => {
    const requestApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";
      const resp = await fetch(url);
      const result = await resp.json();

      const arrayCrypto = result.Data.map((crypto) => {
        const object = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };
        return object;
      });
      setCrypto(arrayCrypto);
    };
    requestApi();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([coin, cryptocurrency].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setCoins({
      coin,
      cryptocurrency,
    });
  };
  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCoins />
        <SelectCryptocurrency />
        <InputSubmit type="submit" value="cotizar" />
      </form>
    </>
  );
};
export default Form;
