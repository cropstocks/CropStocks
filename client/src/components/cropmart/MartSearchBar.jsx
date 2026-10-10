import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MartSearchBar = ({ categories = [] }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mock autosuggest
  useEffect(() => {
    if (query.length > 1) {
      // In real app, call API here with debounce
      const mockSuggestions = [
        `Search for "${query}" in Seeds`,
        `Search for "${query}" in Machinery`,
        `${query} Tractor`,
        `Organic ${query}`
      ];
      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      navigate(`/cropmart/category/${category !== 'all' ? category : 'all'}?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.replace(/Search for "(.*?)" in.*/, '$1'));
    setShowSuggestions(false);
    navigate(`/cropmart/category/all?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSearch} className="flex items-center w-full bg-white rounded-full border-2 border-brand-green/20 focus-within:border-brand-green overflow-hidden transition-colors shadow-sm">
        
        {/* Category Dropdown (Desktop) */}
        <div className="hidden md:flex items-center bg-gray-50 border-r border-gray-200">
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="pl-4 pr-8 py-3 bg-transparent text-sm text-gray-700 outline-none appearance-none cursor-pointer font-medium"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id || cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute left-[120px] pointer-events-none" />
        </div>

        {/* Search Input */}
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for seeds, tractors, fertilizers..."
          className="flex-1 px-4 py-3 outline-none text-gray-800 placeholder-gray-400 text-sm md:text-base w-full"
        />

        {/* Clear Button */}
        {query && (
          <button type="button" onClick={() => setQuery('')} className="p-2 text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Search Button */}
        <button 
          type="submit" 
          className="px-6 py-3 bg-brand-green hover:bg-brand-green-dark text-white flex items-center justify-center transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-50 py-2">
          {suggestions.map((suggestion, idx) => (
            <div 
              key={idx}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-sm text-gray-700 transition-colors"
            >
              <Search className="w-4 h-4 text-gray-400" />
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MartSearchBar;
