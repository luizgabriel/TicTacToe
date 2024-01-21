import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Animated,
  Button,
  Easing,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useAnimatedValue,
  useColorScheme,
  View,
} from 'react-native';

const palette = {
  GRAY_100: '#F7FAFC',
  GRAY_200: '#EDF2F7',
  GRAY_300: '#E2E8F0',
  GRAY_400: '#CBD5E0',

  BLUE_100: '#EBF8FF',
  BLUE_200: '#BEE3F8',
  BLUE_300: '#90CDF4',
  BLUE_400: '#63B3ED',

  RED_100: '#FFF5F5',
  RED_200: '#FED7D7',
  RED_300: '#FEB2B2',
  RED_400: '#FC8181',

  GREEN_100: '#F0FFF4',
  GREEN_200: '#C6F6D5',
  GREEN_300: '#9AE6B4',
  GREEN_400: '#68D391',

  DARK_90: '#718096',
  DARK_100: '#2D3748',
  DARK_200: '#1A202C',
  DARK_300: '#171923',
};

type PlayerValue = 'X' | 'O';
type CellValue = PlayerValue | ' ';

const ROW_SIZE = 3;
const INITIAL_PLAYER: PlayerValue = 'X';
const INITIAL_STATE: CellValue[] = Array(ROW_SIZE * ROW_SIZE).fill(' ');

const isLeftCell = (index: number) => index % ROW_SIZE === 0;
const isRightCell = (index: number) => (index + 1) % ROW_SIZE === 0;
const isTopCell = (index: number) => index < ROW_SIZE;
const isBottomCell = (index: number) => index >= ROW_SIZE * (ROW_SIZE - 1);

const updateBoard =
  (index: number, player: PlayerValue) => (cells: CellValue[]) => {
    if (cells[index] !== ' ') {
      return cells;
    }

    const newCells = [...cells];
    newCells[index] = player;
    return newCells;
  };

const togglePlayer = (player: PlayerValue) => (player === 'X' ? 'O' : 'X');

type BoardProps = {
  player: PlayerValue;
  isDisabled?: boolean;
  isAdversary?: boolean;
  cells: CellValue[];
  onPressCell: (index: number) => void;
};

const Board = ({
  player,
  isDisabled,
  isAdversary,
  cells,
  onPressCell,
}: BoardProps) => {
  const animatedOpacity = useAnimatedValue(1);
  const animatedScale = useAnimatedValue(1);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: isDisabled ? 0.5 : 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(animatedScale, {
        toValue: isDisabled ? 0.9 : 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [animatedOpacity, animatedScale, isDisabled]);

  return (
    <Animated.View
      style={[
        styles.boardContainer,
        {
          opacity: animatedOpacity,
          transform: [
            {scale: animatedScale},
            ...(isAdversary ? [{rotate: '180deg'}] : []),
          ],
        },
      ]}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.playerName}>{player}</Text>
      <View style={styles.board}>
        <View style={styles.boardWrapper}>
          {cells.map((cell, index) => (
            <TouchableOpacity
              disabled={isDisabled}
              key={index}
              onPress={() => onPressCell(index)}
              style={[
                styles.cell,
                isLeftCell(index) ? styles.cellLeft : {},
                isRightCell(index) ? styles.cellRight : {},
                isTopCell(index) ? styles.cellTop : {},
                isBottomCell(index) ? styles.cellBottom : {},
              ]}>
              <Text style={styles.cellText}>{cell}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

type DividerProps = {
  onPressReset: () => void;
};

const Divider = ({onPressReset}: DividerProps) => (
  <View style={styles.dividerContainer}>
    <View style={styles.divider} />
    <TouchableOpacity style={styles.resetButton} onPress={onPressReset}>
      <Text style={[styles.resetButtonText]}>Reset</Text>
    </TouchableOpacity>
  </View>
);

function App(): React.JSX.Element {
  const [cells, setCells] = useState<CellValue[]>(INITIAL_STATE);
  const [player, setPlayer] = useState<PlayerValue>(INITIAL_PLAYER);

  const onPressCell = (index: number) => {
    setCells(updateBoard(index, player));
    setPlayer(togglePlayer(player));
  };

  const onPressReset = () => {
    setCells(INITIAL_STATE);
    setPlayer('X');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'dark-content'} backgroundColor={palette.GRAY_400} />
      <View style={styles.background}>
        <Board
          player="X"
          isDisabled={player === 'X'}
          isAdversary
          cells={cells}
          onPressCell={onPressCell}
        />
        <Divider onPressReset={onPressReset} />
        <Board
          player="O"
          isDisabled={player === 'O'}
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
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  inverted: {
    transform: [{rotate: '180deg'}],
  },
  board: {
    flex: 1,
    aspectRatio: 1,
    maxHeight: '80%',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: palette.GRAY_100,
    borderColor: palette.GRAY_300,
    shadowColor: palette.DARK_300,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    aspectRatio: 1,
    width: '90%',
  },
  cell: {
    height: `${100 / ROW_SIZE}%`,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: palette.DARK_90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellLeft: {
    borderLeftWidth: 0,
  },
  cellTop: {
    borderTopWidth: 0,
  },
  cellBottom: {
    borderBottomWidth: 0,
  },
  cellRight: {
    borderRightWidth: 0,
  },
  cellText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 5,
  },
  dividerContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 10,
    backgroundColor: palette.DARK_90,
  },
  playerName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: palette.BLUE_400,
    marginBottom: 5,
  },
  resetButton: {
    paddingHorizontal: 5,
    marginTop: -20,
    backgroundColor: palette.GRAY_400,
  },
  resetButtonText: {
    fontSize: 15,
    color: palette.DARK_90,
  },
  disabledBoard: {
    opacity: 0.5,
    flex: 0.45,
    transform: [{scale: 0.9}],
  },
  boardContainer: {
    flex: 0.5,
    alignItems: 'center',
  },
});

export default App;
