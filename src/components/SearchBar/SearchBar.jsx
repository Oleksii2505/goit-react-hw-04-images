import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSistrix } from 'react-icons/fa';
import {
  SearchBarHeader,
  SearchForm,
  SearchInput,
  SearchFormBtn,
  SearchFormBtnLabel,
} from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchQuery);
  };

  return (
    <SearchBarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit" className="button">
          <FaSistrix size="24px" />
          <SearchFormBtnLabel className="button-label">
            Search
          </SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={onChange}
        />
      </SearchForm>
    </SearchBarHeader>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};