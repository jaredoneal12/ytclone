import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import Footer from './components/footer';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDju2xTxjWZD5YQJG7Qat_Dgs5JPGdsrNk'



class App extends Component {
  constructor(props){
    super(props);
    this.state = { videos: [],
    selectedVideo: null
    };

    this.videoSearch('cats');

  }

videoSearch(term){
  YTSearch({key: API_KEY, term: term}, (videos) => {
    
     this.setState({ videos:videos,
     selectedVideo: videos[0] });
   });
  }

render() {

  const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300);

   return(<div>
  <SearchBar onSearchTermChange={videoSearch}/>
  <VideoDetail video={this.state.selectedVideo}/>
  <VideoList videos={this.state.videos} 
  onVideoSelect={selectedVideo => this.setState({selectedVideo})}
  />
  <Footer />
  </div>);
}
}
ReactDOM.render(
  
    <App />
  , document.querySelector('.container'));
