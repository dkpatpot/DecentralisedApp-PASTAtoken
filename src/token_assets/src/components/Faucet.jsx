import React, { useState } from "react";
import { canisterId,createActor } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { AuthClient } from '@dfinity/auth-client';
function Faucet(props) {
  const [isDisable,setDisable] = useState(false);
  const [buttonText,setButtonText] =useState("Give me");
  async function handleClick(event) {
    setDisable(true);
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId,{agentOptions:{
      identity,
    },
  })
    const result = await authenticatedCanister.payOut();
    setButtonText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free Pasta tokens here! Claim 10,000 PASTA token to {props.userPrincipal}.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisable}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
