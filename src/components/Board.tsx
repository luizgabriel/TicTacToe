import {useEffect} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useAnimatedValue,
} from 'react-native';
import {
  CellValue,
  PlayerValue,
  defaultRowSize,
  isBottomCell,
  isLeftCell,
  isRightCell,
  isTopCell,
} from '@/game';
import palette from '@/palette';

type Props = {
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
}: Props) => {
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

const styles = StyleSheet.create({
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
    height: `${100 / defaultRowSize}%`,
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
  playerName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: palette.BLUE_400,
    marginBottom: 5,
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

export default Board;
