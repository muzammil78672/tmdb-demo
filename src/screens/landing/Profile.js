import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AutoHeightImage from 'react-native-auto-height-image';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {NavigationEvents} from 'react-navigation';

import * as Actions from '../../redux/actions';

import Api from '../../constants/api';

class Profile extends Component {
  componentDidMount() {
    this.props.getMovies();
  }

  renderMovie = ({item, index}) => {
    return (
      <View
        style={{
          width: wp('90%'),
          // height: hp('50%'),
          marginVertical: 10,
          borderRadius: wp('5%'),
          elevation: 5,
          backgroundColor: 'white',
          overflow: 'hidden',
        }}>
        <AutoHeightImage
          width={wp('90%')}
          source={{uri: Api.moviesImageBaseUrl + item.posterImage}}
        />
        <View style={{marginHorizontal: 20, marginBottom: 20}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: 'black',
              fontWeight: 'bold',
              marginVertical: 10,
            }}>
            {item.title}
          </Text>
          <Text style={{textAlign: 'justify'}}>{item.overview}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text>Release date : </Text>
              <Text>{item.releaseDate}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text>Popularity : </Text>
              <Text>{item.popularity}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  LikedMovies = () => {
    return (
      <View
        style={{
          flex: 1,
        }}>
        {this.props.likedMovies.length ? (
          <FlatList
            contentContainerStyle={{
              width: wp('100%'),
              alignItems: 'center',
              paddingVertical: 20,
            }}
            extraData={this.props.likedMovies}
            renderItem={this.renderMovie}
            data={this.props.likedMovies}
            keyExtractor={item => item.id + ''}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>you don't have any liked movies</Text>
          </View>
        )}
      </View>
    );
  };

  DislikedMovies = () => {
    return (
      <View
        style={{
          flex: 1,
        }}>
        {this.props.dislikedMovies.length ? (
          <FlatList
            contentContainerStyle={{
              width: wp('100%'),
              alignItems: 'center',
              paddingVertical: 20,
            }}
            extraData={this.props.dislikedMovies}
            renderItem={this.renderMovie}
            data={this.props.dislikedMovies}
            keyExtractor={item => item.id + ''}
          />
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>you don't have any disliked movies.</Text>
          </View>
        )}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={payload => this.props.getMovies()} />
        <View
          style={{
            minHeight: 150,
            maxHeight: 500,
            // width: wp('90%'),
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 80, width: 80, borderRadius: 40}}
            // source={{uri: Api.baseUrl + this.props.user.image}}
            source={{uri: this.props.user.image}}
          />
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {this.props.user.firstName}
            </Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {this.props.user.lastName}
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.props.logout()}>
            <View
              style={{
                width: 80,
                height: 50,
                backgroundColor: 'orange',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, color: 'white'}}>LOGOUT</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollableTabView
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}>
          <this.LikedMovies tabLabel="Liked Movies" />
          <this.DislikedMovies tabLabel="Disliked Movies" />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => ({
  user: state.user.user,
  likedMovies: state.user.likedMovies,
  dislikedMovies: state.user.dislikedMovies,
});

const mapDispatchToProps = dispatch => ({
  getMovies: () => dispatch(Actions.User.getMovies()),
  logout: () => dispatch(Actions.User.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
