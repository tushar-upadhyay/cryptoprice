import { Button, Typography } from "@material-ui/core";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import contractAtom from "../atoms/contractAtom";
import tokensAtom from "../atoms/tokensAtom";
import PricesTable from "./priceTable";

export default function OtherTokens(props) {
    const [tokens, _] = useAtom(tokensAtom);
    const [contract,__] = useAtom(contractAtom);
    const [amount, updateAmount] = useState(new Array(tokens.length));
    const [balances, updateBalance] = useState(new Array(tokens.length));
    useEffect(() => {
        console.log('i ran')
        getBalance()
    }, [tokens,contract])
    async function getPriceFromCoingecko(amount,address,i,balances){
        let res = await fetch(`https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/${address}`);
        res = await res.json();
        const price = res['market_data']['current_price']['usd'];
        
        const _amount = price*balances[i];
        amount[i] = _amount;//
        return amount;
    }
    async function getBalance() {
        const promises = [];
        let decimals = [];
        if (!contract) return
        for (let token of tokens) {
            contract.options.address = token.address;
            promises.push(contract.methods.balanceOf(window.address[0]).call());
            decimals.push(contract.methods.decimals().call());
        }
        let res = await Promise.all(promises);
        decimals = await Promise.all(decimals);
        console.log(decimals)
        for (let i = 0; i < res.length; i++) {
            res[i] /= 10 ** decimals[i];
        }
        updateBalance(res);
        let _amount = []
        let prices = await fetch("https://api.pancakeswap.info/api/tokens");
        prices = await prices.json();
        let key, keys = Object.keys(prices['data']);
        let n = keys.length;
        let _prices = {}
        while (n--) {
            key = keys[n];
            _prices[key.toLowerCase()] = prices['data'][key];
        }
        prices = _prices;
        const multiplier =
            parseFloat(
                prices["0x55d398326f99059fF775485246999027B3197955".toLowerCase()]["price"]
            );
        //   let a =await  prices['data']["0x8076C74C5e3F5852037F31Ff0093Eeb8c8ADd8D3"];
        //   console.log(a)
        const notFound = [];
        for (let i = 0; i < res.length; i++) {
            
            let address = tokens[i].address;
            if(prices[address]){
            _amount.push(prices[address]['price'] * res[i] * multiplier);
            }
            else{
            notFound.push(i);
            _amount.push('loading...');
            }
        }

        // console.log(amount)
      


        for (let x of notFound){
           _amount = await getPriceFromCoingecko(_amount,tokens[x].address,x,res);
        }
        console.log(_amount);
        updateAmount(_amount);


    }
    return (
        <div style={{ flexDirection: 'column', display: 'flex' }}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: 16 }}>
                <Typography variant="h6z">
                    Other BSC Tokens

  </Typography>
                <Button variant="contained" onClick={getBalance}>Refresh</Button>
            </div>
            <div >
                <PricesTable amount={amount} tokens={tokens} balance={balances} />
            </div>
        </div>
    );
}