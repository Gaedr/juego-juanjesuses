
import React, { useState } from 'react';
import { Panel, Button } from 'rsuite';
import { BattleInData } from './BattleInData';
import { ShowCombat } from './ShowCombat';
import { TablaDatos } from './TablaDatos';

export const Combat = (props) => {
  const [turn, setTurn] = useState(0);
  const [combats, setCombats] = useState([]);


  const startBattle = (data) => {
    console.log('Battle Start: ', data);
    const {player1, player2} = data;
    setCombats([
      {
        player1,
        player2,
        turn,
        createdAt: new Date()
      }
    ])
    setTurn(turn + 1);
  };

  const calculateKills = (player) => {
    const {strategy, modifier, roll, ejercito} = player;
    return ( (strategy + 0.5) * modifier * (ejercito.caballeros*2) + ejercito.simples + (1.5 * ejercito.entrenadas)) / (2 * roll)
  }

  const doPlayerBattle = (player) => {
    const {simples, entrenadas, caballeros } = player?.ejercito;
    const kills = calculateKills(player);
    const total = simples + entrenadas + caballeros;

    const bajas = {
      simples: Math.round(simples - (((simples*100)/total)/100) * kills),
      entrenadas: Math.round(entrenadas - (((entrenadas*100)/total)/100) * kills),
      caballeros: Math.round(caballeros - (((caballeros*100)/total)/100) * kills),
    };
    
    return {
      ...player,
      ...{
        bajas,
        ejercito: {
          simples: simples - bajas.simples,
          entrenadas: entrenadas - bajas.entrenadas,
          caballeros: caballeros - bajas.caballeros,
        }
      }
    }

  }

  const calculateBattle = (battle) => {
    const lastBattle = combats.slice(-1)[0];

    return {
      player1: doPlayerBattle({...lastBattle.player1, ...battle.player1}),
      player2: doPlayerBattle({...lastBattle.player2, ...battle.player2})
    }
  };

  const nextTurn = (battle) => {
    const {player1, player2 } = calculateBattle(battle);
    combats.push({
      player1,
      player2,
      turn,
      createdAt: new Date()
    });
    setTurn(turn + 1);
  };

  const finishBattle = () => {
    setCombats([]);
    setTurn(0);
  }

  return(
    <Panel>
      { turn === 0
      ? <BattleInData onBattleStart={data => startBattle(data)}></BattleInData>
      : 
        <Panel>
          <ShowCombat turn={turn} combat={combats.slice(-1)[0]} onNextTurn={battle => nextTurn(battle)}>
            <Button onClick={() => finishBattle()}>Finalizar</Button>
          </ShowCombat>
          <TablaDatos combats={combats}></TablaDatos>
        </Panel>
      }
    </Panel>
  );
}