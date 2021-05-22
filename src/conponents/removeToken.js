
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";

import { useAtom } from "jotai";
import React, { useState } from "react";
import tokensAtom from "../atoms/tokensAtom";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  
}));

export default function RemoveToken(){
  const [tokens,updateToken] = useAtom(tokensAtom);
  const classes = useStyles();
  const [selectedToken,setSelectedToken] = useState();
  function remove(){
    console.log(selectedToken)
    let _tokens = tokens;
    for(let i=0;i<tokens.length;i++){
      if(tokens[i].name==selectedToken){
       window.alert('Token Removed!')
      
       localStorage.setItem('tokens',JSON.stringify([...tokens.slice(0,i),...tokens.slice(i+1)]))
        updateToken(r=>[...r.slice(0,i),...r.slice(i+1)]);

        break
      }
    }
   
  }
    return (
      <div style={{display:'flex',flexDirection:'column',padding:16}}>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select Token to remove</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedToken}
          onChange={(e)=>setSelectedToken(e.target.value)}
        >
       
        {tokens.map((token)=>(<MenuItem key={token.name} value={token.name}>{token.name}</MenuItem>))}
        
      </Select>
      <Button onClick={remove} style={{marginTop:16}} variant="contained" >Remove!</Button>
      </FormControl>
      </div>
    );
}