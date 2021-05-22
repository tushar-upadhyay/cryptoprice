import { Button, CircularProgress, Input, TextField, Typography } from "@material-ui/core";
import { useAtom } from "jotai";
import React, { useState } from "react";
import contractAtom from "../atoms/contractAtom";
import tokensAtom from "../atoms/tokensAtom";

export default function AddToken(props){
    const [address,setAddress] = useState();
    const [isLoading,setIsLoading] = useState(false);
    const [tokens,setToken] = useAtom(tokensAtom);
    const [contract,_] = useAtom(contractAtom);
    async function getToken(){
        try{
        setIsLoading(true);
        for(let token of tokens){
            if(token.address==address){
               throw Error()
            }
        }
        
        contract.options.address  = address;
        let name = await contract.methods.symbol().call();
        
        setIsLoading(false);
        const token = {
            name,
            address
        }
        localStorage.setItem('tokens',JSON.stringify([...tokens,token]))
        setToken(e=>[...e,token]);
        setAddress('');
        window.alert(name+ ' Token added')
        }
        catch(err){
            setIsLoading(false)
            setAddress('');
            
            window.alert('Invaid contract address!')
        }
    }
    return (
    <div style={{display:'flex',flexDirection:'column',padding:16}}>
    <Input value={address} onChange={e=>setAddress(e.target.value.toLowerCase())} style={{flex:1,padding:16}}  placeholder="Enter Contract Address to Add token"/>
        {isLoading?<CircularProgress />:<Button onClick={getToken} >Add Token!</Button>}
  </div>
  );
}