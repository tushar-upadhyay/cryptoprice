// import InputAddress from "./components/inputAddress";
import Web3 from "web3";
import { useEffect, useState } from "react";
import ButtonAppBar from "./conponents/appBar";
import GridView from "./conponents/grid";
import abi from "./abi";
import { useAtom } from "jotai";
import contractAtom from "./atoms/contractAtom";
// import { Loader, Segment, Dimmer, Button } from "semantic-ui-react";
export default function App() {
  const [con, setContract] = useAtom(contractAtom);
  const [address,setAddress] = useState();
  const [bnb,setBnb] = useState();
  const [bnbAmount,setBnbAmount] = useState();
  async function load() {
    // setBalance();
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const address = await web3.eth.getAccounts();
    window.address = address;
    setAddress(address[0]);
    const contract = new web3.eth.Contract(abi);
    window.contract = contract;
    setContract(contract);
    let bnb = await  web3.eth.getBalance(address[0]);
    bnb = bnb.toString()
    let pos = bnb.length;
    for(let i=pos-1;i>=0;i--){
      if(bnb[i]=="0"){
        pos--;
      }
      else{
        break;
      }
    }
    bnb = bnb.substr(0,pos-1)
    bnb = bnb/10**8;
    let res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd");
    res = await res.json();
    const price = parseFloat(res['binancecoin']['usd']);
    const amount = price*bnb;
    setBnb(bnb)
    setBnbAmount(amount);
  }
  useEffect(() => {
    load();
  }, []);
  return (
   <div>
      <ButtonAppBar address={address} />
      <GridView balance={bnb} amount={bnbAmount}/>
    </div>
  );
}
