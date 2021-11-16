const Search = () => {
  return (
    <div className='flex flex-row items-center justify-center flex-wrap'>
      <input
        className='my-2 mx-4 text-gray-600 border-2 border-gray-300 bg-white h-10 px-3 rounded-lg text-sm focus:outline-none md:w-72'
        type='search'
        name='search'
        placeholder='Search'
      />
      <button className='btnBlueWhite'>Search</button>
    </div>
  );
};

export default Search;
