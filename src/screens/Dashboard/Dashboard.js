import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  fetchConnections,
  handleTextChange,
  handleOnFocus,
  handleOnBlur,
  sortData,
} from '../../actions/dashboard_actions';
import {useSelector, useDispatch} from 'react-redux';

const Dashboard = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const data = useSelector(state => {
    return state.dashboard_reducers.data;
  });
  const searchValue = useSelector(
    state => state.dashboard_reducers.searchValue,
  );
  const showSearchedData = useSelector(
    state => state.dashboard_reducers.showSearchedData,
  );
  const searchedData = useSelector(
    state => state.dashboard_reducers.searchedData,
  );
  const sortedData = useSelector(state => state.dashboard_reducers.sortedData);
  const doSort = useSelector(state => state.dashboard_reducers.doSort);
  const sortByTypes = ['ascending', 'descending', 'none'];
  const dispatch = useDispatch();
  const searchImage = require('../../images/imageFile2.jpeg');
  const sortImage = require('../../images/imageFile3.png');
  const currentDate = new Date();

  const getData = () => {
    if (doSort) {
      return sortedData;
    }
    if (showSearchedData || searchValue.length > 0) {
      return searchedData;
    } else {
      return data;
    }
  };

  useEffect(() => {
    dispatch(fetchConnections());
  }, []);

  const renderItem = ({item}) => {
    const hours = currentDate.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('UserDetails', {item})}
        activeOpacity={0.6}
        style={styles.listItem}
        key={item?.id}>
        <Image source={{uri: item?.picture}} style={styles.listItemImage} />
        <View style={styles.listItemBody}>
          <View style={styles.titleRow}>
            <Text>
              {item?.firstname} {item?.surname}
            </Text>
            <Text>
              {hours}:{currentDate?.getMinutes()}
              {ampm.toUpperCase()}
            </Text>
          </View>
          <Text>{item?.gender}</Text>
          <Text>{item?.company}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image source={searchImage} style={[styles.image, {marginLeft: 8}]} />
          <TextInput
            value={searchValue}
            onChangeText={text => dispatch(handleTextChange(text, data))}
            autoCapitalize="words"
            onFocus={() => dispatch(handleOnFocus())}
            onBlur={() => dispatch(handleOnBlur())}
            style={styles.textinput}
            placeholder="Search"
          />
          <TouchableOpacity
            onPress={() => setIsVisible(true)}
            activeOpacity={0.6}>
            <Image
              source={sortImage}
              style={[styles.image, {marginRight: 8}]}
            />
            <Modal
              style={styles.modal}
              animationType="fadeIn"
              onBackdropPress={() => setIsVisible(false)}
              onRequestClose={() => setIsVisible(false)}
              visible={isVisible}>
              <View style={styles.sortBy}>
                {sortByTypes.map(item => (
                  <Text
                    onPress={() => {
                      setIsVisible(false);
                      dispatch(sortData(item, data));
                    }}
                    style={styles.sortByRow}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                ))}
              </View>
            </Modal>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={getData()}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        key={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#ffffff',
    height: 70,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  image: {
    width: 20,
    height: 20,
  },
  textinput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingLeft: 12,
    letterSpacing: 0.5,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 2,
    backgroundColor: '#ffffff',
  },
  listItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  listItemBody: {
    flex: 1,

    marginLeft: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modal: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  sortBy: {
    elevation: 2,
    alignSelf: 'flex-end',
    borderRadius: 4,
    marginRight: 20,
    marginTop: 40,
    backgroundColor: '#ffffff',
  },
  sortByRow: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
});

export default Dashboard;
