import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AutoHeightImage from 'react-native-auto-height-image';

import * as Actions from '../../redux/actions';

import Api from '../../constants/api';

class Movies extends Component {
  state = {
    search: '',
  };

  componentDidMount() {
    this.props.getPopularMovies();
  }

  searchMovie = loadMore => {
    Keyboard.dismiss();
    if (this.state.search.trim().length) {
      if (this.props.allMovies.data.length > 0 && !loadMore) {
        this.searchList.scrollToOffset({animated: true, offset: 0});
      }
      this.props.getAllMovies(this.state.search, loadMore);
    } else {
      this.props.saveAllMovies({
        results: [],
        page: 1,
        total_pages: 2,
      });
    }
  };

  loadMoreSearchMovies = () => {
    if (this.props.allMovies.hasMore) {
      this.searchMovie(true);
    }
  };

  loadMorePopularMovies = () => {
    if (this.props.popularMovies.hasMore) {
      this.props.getPopularMovies(true);
    }
  };

  addMovie = (movie, type) => {
    let data = {
      movieId: movie.id,
      userId: this.props.user.id,
      title: movie.original_title,
      overview: movie.overview,
      releaseDate: movie.release_date,
      popularity: movie.popularity,
      posterImage: movie.poster_path,
      type,
    };

    this.props.addMovie(data);
  };

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
          source={{uri: Api.moviesImageBaseUrl + item.poster_path}}
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
            {item.original_title}
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
              <Text>{item.release_date}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text>Popularity : </Text>
              <Text>{item.popularity}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: hp('10%'),
            backgroundColor: 'gray',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => this.addMovie(item, 'like')}>
            <View
              style={{
                width: 150,
                height: 50,
                borderRadius: 30,
                backgroundColor: 'orange',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
                Like
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.addMovie(item, 'dislike')}>
            <View
              style={{
                width: 150,
                height: 50,
                borderRadius: 30,
                backgroundColor: 'orange',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
                Dislike
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  AllMovies = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: hp('10%'),
          }}>
          <TextInput
            value={this.state.search}
            onChangeText={search => this.setState({search})}
            style={{
              height: 40,
              width: wp('70%'),
              borderRadius: 20,
              borderColor: 'gray',
              borderWidth: 1,
              paddingLeft: 20,
              fontSize: 16,
            }}
          />
          <TouchableOpacity onPress={() => this.searchMovie()}>
            <View
              style={{
                height: 40,
                width: wp('20%'),
                borderRadius: 10,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18, color: 'blue'}}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.props.allMovies.data.length ? (
          <FlatList
            ref={ref => (this.searchList = ref)}
            contentContainerStyle={{
              width: wp('100%'),
              alignItems: 'center',
              paddingVertical: 20,
            }}
            extraData={this.props.allMovies.data}
            renderItem={this.renderMovie}
            data={this.props.allMovies.data}
            keyExtractor={item => item.id + ''}
            onEndReached={() => this.loadMoreSearchMovies()}
            onEndReachedThreshold={0.1}
          />
        ) : (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>No movies available</Text>
          </ScrollView>
        )}
      </View>
    );
  };

  PopularMovies = () => {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          contentContainerStyle={{
            width: wp('100%'),
            alignItems: 'center',
            paddingVertical: 20,
          }}
          extraData={this.props.popularMovies.data}
          renderItem={this.renderMovie}
          data={this.props.popularMovies.data}
          keyExtractor={item => item.id + ''}
          onEndReached={() => this.loadMorePopularMovies()}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          style={{marginTop: 20}}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}>
          <this.AllMovies tabLabel="Search Movies" />
          <this.PopularMovies tabLabel="Popular Movies" />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => ({
  allMovies: state.movies.all,
  popularMovies: state.movies.popular,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  getAllMovies: (search, loadMore) =>
    dispatch(Actions.Movies.getAllMovies(search, loadMore)),
  getPopularMovies: loadMore =>
    dispatch(Actions.Movies.getPopularMovies(loadMore)),
  saveAllMovies: data => dispatch(Actions.Movies.saveAllMovies(data)),
  addMovie: data => dispatch(Actions.Movies.addMovie(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
