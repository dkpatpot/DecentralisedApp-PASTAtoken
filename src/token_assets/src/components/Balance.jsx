import React, { useState } from "react";
import { token } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
function Balance() {
  const [inputValue,setInputValue] = useState("");
  const [balanceResult,setBalanceResult] = useState("");
  const [symbol,setSymbol] = useState("");
  const [isHidden,setHidden] = useState(true);
  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balance = await token.balanceOf(principal);
    setBalanceResult(balance.toLocaleString());
    setSymbol(await token.getSymbol());
    setHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e)=>
            setInputValue(e.target.value)
          }
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult} {symbol}.</p>
    </div>
  );
}

export default Balance;
