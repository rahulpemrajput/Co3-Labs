import React, { useState, useEffect } from 'react';
import './TapButton.css'; // Animation CSS for button tap effect
import { useMutation, gql } from '@apollo/client';

const INCREMENT_COINS = gql`
  mutation IncrementCoins($username: String!, $amount: Int!) {
    incrementCoins(username: $username, amount: $amount) {
      username
      coins
    }
  }
`;

const TapButton: React.FC = () => {
  const [coins, setCoins] = useState(0); // State to store coins

  const [incrementCoins] = useMutation(INCREMENT_COINS); // Apollo mutation

  const handleTap = async () => {
    setCoins(coins + 1); // Local update
    await incrementCoins({ variables: { username: 'user1', amount: 1 } }); // Call backend
  };

  return (
    <div className="tap-container">
      <button className="tap-button" onClick={handleTap}>
        Tap Me!
      </button>
      <p>Coins: {coins}</p>
    </div>
  );
};

export default TapButton;
