import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {counterSelector, getTickets} from "./redux/createBlock/main";
import {io} from "socket.io-client";
import styled from 'styled-components'

const AppWrapper = styled.div`
  display: flex;
  width: 70%;
  flex-wrap: wrap;
  margin: 0 auto;
`

const BlockWrapper = styled.div`
  width: 25%;
  min-width: 200px;
  height: 100px;
  border: solid black 1px;
  border-radius: 10px;
  //margin: 10px auto 10px;
  margin: 10px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.2); 
`
const Ticker = styled.div`
  font-size: 23px;
  font-family: sans-serif;
  margin: 10px;
  font-weight: bold;
  
`
const Abbreviation = styled.div`
  font-size: 10px;
  font-family: sans-serif;
  margin: 10px;
 
`

const Price = styled.div`
  font-size: 19px;
  font-family: sans-serif;
  margin: 10px;
`

const socket = io("http://localhost:4000");

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.emit('start');
        socket.on('ticker', (data) => {
            dispatch(getTickets(data));
        })

    }, [dispatch])

    const foo = (ticker) => {
        switch (ticker) {
            case 'AAPL':
                return 'Apple'
            case 'GOOGL':
                return 'Alphabet'
            case 'MSFT':
                return 'Microsoft'
            case 'AMZN':
                return 'Amazon'
            case 'FB':
                return 'Facebook'
            case 'TSLA':
                return 'Tesla'
            default:
                return '';
        }
    }

    const tickers = useSelector(counterSelector.getTickers);
    console.log('tickers: ', tickers)
    return (
        <AppWrapper className="App">
            {tickers.map((item) => {
                return (

                    <BlockWrapper>
                        <Ticker> {foo(item.ticker)} </Ticker>
                        <Abbreviation>{item.ticker} </Abbreviation>
                        <Price>Price - {item.price} </Price>
                    </BlockWrapper>


                )
            })}
        </AppWrapper>
    );
}

export default App;
