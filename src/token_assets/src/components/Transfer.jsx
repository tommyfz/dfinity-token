import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token/index";

function Transfer() {

  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [buttonText, setButtonText] = useState("Transfer");
  const [disabled, setDisabled] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  async function handleClick() {
    setIsHidden(true);
    setDisabled(true);
    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount);
    const result = await token.transfer(recipient, amountToTransfer);
    setDisabled(false);
    setIsHidden(false);
    setButtonText(result);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={disabled} >
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{buttonText}</p>
      </div>
    </div>
  );
}

export default Transfer;
