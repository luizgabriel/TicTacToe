import React, {useEffect, useMemo, useState} from 'react';
import {Alert, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import palette from '@/palette';
import Divider from '@/components/Divider';
import Board from '@/components/Board';
import {
  CellValue,
  PlayerValue,
  initialPlayer,
  initialBoard,
  togglePlayer,
  updateBoard,
  getGameResult,
  GameResult,
} from './game';

const resultMessage: Record<GameResult, string> = {
  None: '',
  Draw: "It's a draw!",
  X: 'Player "X" won!',
  O: 'Player "O" won!',
};

function App(): React.JSX.Element {
  const [cells, setCells] = useState<CellValue[]>(initialBoard);
  const [player, setPlayer] = useState<PlayerValue>(initialPlayer);
  const result = useMemo(() => getGameResult(cells), [cells]);

  const onPressCell = (index: number) => {
    setCells(updateBoard(index, player));
    setPlayer(togglePlayer(player));
  };

  const onPressReset = () => {
    setCells(initialBoard);
    setPlayer('X');
  };

  useEffect(() => {
    if (result !== 'None') {
      Alert.alert('Game Over', resultMessage[result], [
        {text: 'Reset Board', onPress: onPressReset},
      ]);
    }
  }, [result]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'dark-content'} backgroundColor={palette.GRAY_400} />
      <View style={styles.background}>
        <Board
          player="O"
          isDisabled={player === 'X' || result !== 'None'}
          isAdversary
          cells={cells}
          onPressCell={onPressCell}
        />
        <Divider onPressReset={onPressReset} />
        <Board
          player="X"
          isDisabled={player === 'O' || result !== 'None'}
          cells={cells}
          onPressCell={onPressCell}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.GRAY_400,
  },
  background: {
    flex: 1,
    paddingVertical: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});

export default App;
