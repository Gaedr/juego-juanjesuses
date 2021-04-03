import React, { useState } from 'react';
import { Container, Content} from 'rsuite';

import { Combat } from './Combat.jsx';

export const App = () => {
  const [turn, setTurn] = useState(0);
  

  return (
    <Container>
      <Content>
        <Combat></Combat>
      </Content>
    </Container>
  );
};