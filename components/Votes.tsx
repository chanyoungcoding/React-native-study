import React from "react";
import styled from "styled-components/native";

interface VotesProps {
  votes: number;
}

const Votes: React.FC<VotesProps> = ({ votes }) => (
  <Text>{votes > 0 ? `⭐️ ${votes}/10` : `Coming soon`}</Text>
);

const Text = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

export default Votes;