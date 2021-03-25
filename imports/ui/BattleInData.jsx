
import React, { useState, useEffect } from 'react';
import { Panel, FlexboxGrid, Button } from 'rsuite';
import { InputDataPlayer } from './InputDataPlayer';

const PlayerTurnMock = {
    name: 'Player',
    ejercito: {
        simples: 0,
        entrenadas: 0,
        caballeros: 0
    },
    bajas: {
        simples: 0,
        entrenadas: 0,
        caballeros: 0
    },
    modificador: 0,
    tirada: 0,
};

export const BattleInData = (props) => {
    const [player1, setPlayer1] = useState(PlayerTurnMock);
    const [player2, setPlayer2] = useState(PlayerTurnMock);

    const setStart = () => {
        props.onBattleStart({player1, player2});
    };

    return (
        <Panel>
            <FlexboxGrid justify="space-around">
                <FlexboxGrid.Item colspan={6}>
                    <InputDataPlayer onChangeData={data => 
                        setPlayer1({ 
                            name: data.name, 
                            ejercito: { simples: Number(data.simples), entrenadas: Number(data.entrenadas), caballeros: Number(data.caballeros)},
                            strategy: Number(data.strategy)
                        })
                    }></InputDataPlayer>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}>
                    <InputDataPlayer onChangeData={data => 
                        setPlayer2({
                            name: data.name, 
                            ejercito: { simples: Number(data.simples), entrenadas: Number(data.entrenadas), caballeros: Number(data.caballeros)},
                            strategy: Number(data.strategy)
                        })}></InputDataPlayer>
                </FlexboxGrid.Item>
            </FlexboxGrid >
            <FlexboxGrid justify="center" >
                <Button onClick={() => setStart()}>Comenzar Battalla</Button>
            </FlexboxGrid>
        </Panel>
    );
};