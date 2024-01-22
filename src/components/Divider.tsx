import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import palette from '@/palette';

type Props = {
  onPressReset: () => void;
};

const Divider = ({onPressReset}: Props) => (
  <View style={styles.dividerContainer}>
    <View style={styles.divider} />
    <TouchableOpacity style={styles.resetButton} onPress={onPressReset}>
      <Text style={[styles.resetButtonText]}>Reset</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  dividerContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 8,
    backgroundColor: palette.DARK_90,
  },
  resetButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: -25,
    backgroundColor: palette.GRAY_200,
    borderRadius: 5,
  },
  resetButtonText: {
    fontSize: 16,
    color: palette.DARK_90,
  },
});

export default Divider;
