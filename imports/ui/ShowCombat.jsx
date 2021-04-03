
import React, { useState } from 'react';

import { FlexboxGrid, InputNumber, Button, Panel, Divider } from 'rsuite';
import { ShowDataPlayer } from './ShowDataPlayer';

export const ShowCombat = (props) => {
    const [players, setPlayers] = useState({
        player1: {roll: 0, modifier: 1},
        player2: {roll: 0, modifier: 1},
    });

    const setTirada = (player, value) => {
        setPlayers({
            ...players,
            ...{
                [player]: { 
                    roll: Number(value),
                    modifier: players[player].modifier,
                }
            }
        });
    }

    const setModificador = (player, value) => {
        setPlayers({
            ...players,
            ...{
                [player]: { 
                    roll: players[player].roll,
                    modifier: Number(value)
                }
            }
        });
    }

    const nextTurn = () => {
        const {player1, player2} = players;

        props.onNextTurn({
            player1,
            player2
        });
    }

    const playerTurnData = (playerId) => {
        const playerName = `player${playerId}`;
        return( 
            <FlexboxGrid.Item colspan={6} align="middle">
                <InputNumber 
                    prefix={`Tirada ${props.combat[playerName]?.name}`}
                    name={`tirada${playerId}`}
                    value={players[playerName]?.roll}
                    min={1}
                    max={20}
                    default={1}
                    onChange={t => setTirada([playerName], t)}
                ></InputNumber>
                <InputNumber 
                    prefix={`Modificador ${props.combat[playerName]?.name}`}
                    name={`modificador1${playerId}`}
                    value={players[playerName]?.modifier}
                    min={1}
                    max={10}
                    default={1}
                    onChange={t => setModificador([playerName], t)}
                ></InputNumber>
            </FlexboxGrid.Item>
        )
    }

    return(
        <Panel>
            <FlexboxGrid justify="space-around">
                <FlexboxGrid.Item colspan={6}>
                    <ShowDataPlayer player={props.combat?.player1}></ShowDataPlayer>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                    <h1>{`Turno ${props.turn}`}</h1>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}>
                    <ShowDataPlayer player={props.combat?.player2}></ShowDataPlayer>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <Divider>Datos Turno</Divider>
            <FlexboxGrid justify="space-between" >
                {playerTurnData(1)}
                <FlexboxGrid.Item>
                    <Button onClick={() => nextTurn()}>Siguiente Turno</Button>
                </FlexboxGrid.Item>
                {playerTurnData(2)}
            </FlexboxGrid>
            <FlexboxGrid justify="center">
                {props.children}
            </FlexboxGrid>
            <Divider></Divider>

        </Panel>
    )
}