import React, { useState, useEffect } from 'react';
import { AppComponent } from './App.styled';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { fetchData } from '../services';

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     hits: [],
//     page: 1,
//     isLoading: false,
//     buttonLoading: false,
//     showButton: false,
//     showModal: false,
//     largeImage: '',
//     error: '',
//   }

//   async componentDidUpdate(prevProps, prevState) {
//     const prevSearchQuery = prevState.searchQuery;
//     const nextSearchQuery = this.state.searchQuery;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevSearchQuery !== nextSearchQuery || prevPage !== nextPage) {
      
//         this.setState({ isLoading: true });
//         fetchData(nextSearchQuery, nextPage)
//         .then(data => {
          
//         if(data.hits.length === 0) {
//           alert('Enter another word to search');
//           return;
//         }
       
//         this.setState(prev => ({hits: [...prev.hits, ...data.hits],
//         showButton: this.state.page < Math.ceil(data.totalHits / 12)
//         }))
       
      
//       }) 
//       .catch (err => {
//         console.log(err);
//         this.setState({ error: err.message });
//       }) 
//       .finally (() => {
//         this.setState({ isLoading: false });
//     });
//     }
//   }    

//   handleSubmit(searchWord) {
//     this.setState({hits: [] , page: 1 ,searchQuery: searchWord.toLowerCase().trim() });
//   };

//   onLoadMore = () => {

//     this.setState(prevState =>({ page: prevState.page + 1 }));
//   };

//   showModal = image => {
//     this.setState({ largeImage: image, showModal: true });
//   };

//   closeModal = () => {
//     this.setState({ largeImage: '', showModal: false });
//   };

//   render() {
//     const { hits, isLoading, showButton, showModal, largeImage } = this.state;
//     return (
//       <AppComponent>
//         <SearchBar onSubmit={this.handleSubmit.bind(this)} />
//         <ImageGallery hits={hits} showModal={this.showModal} />
//         {isLoading && <Loader />}
//         {showButton && <LoadMoreBtn onClick={this.onLoadMore} />}
//         {showModal && (
//           <Modal closeModal={this.closeModal} largeImage={largeImage} />
//         )}
//       </AppComponent>
//     );
//   }
// }

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!searchQuery) return;

    setIsLoading(true);
    fetchData(searchQuery, page)
      .then(data => {
        if (data.hits.length === 0) {
          alert('Enter another word to search');
          return;
        }

        setHits(prevHits => [...prevHits, ...data.hits]);
        setShowButton(page < Math.ceil(data.totalHits / 12));
      })
      .catch(err => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery, page]);

  const handleSubmit = searchWord => {
    setHits([]);
    setPage(1);
    setSearchQuery(searchWord.toLowerCase().trim());
  };

  const handleLoadMore = () => {
    setButtonLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const handleModalShow = image => {
    setLargeImage(image);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setLargeImage('');
    setShowModal(false);
  };

  return (
    <AppComponent>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery hits={hits} showModal={handleModalShow} />
      {isLoading && <Loader />}
      {showButton && (
        <LoadMoreBtn onClick={handleLoadMore} isLoading={buttonLoading} />
      )}
      {showModal && (
        <Modal closeModal={handleModalClose} largeImage={largeImage} />
      )}
    </AppComponent>
  );
}