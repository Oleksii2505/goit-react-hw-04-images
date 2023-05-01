import React, { useState, useEffect } from 'react';
import { AppComponent } from './App.styled';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { fetchData } from '../services';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

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
        alert('Error');
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

  const onLoadMore = () => {
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
        <LoadMoreBtn onClick={onLoadMore} isLoading={buttonLoading} />
      )}
      {showModal && (
        <Modal closeModal={handleModalClose} largeImage={largeImage} />
      )}
    </AppComponent>
  );
}