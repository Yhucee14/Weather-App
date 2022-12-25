import './App.css';
import Search from './components/Search/search';

function App() {
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  }


  return (
    <div className="App-con">
      <Search onSearchChange={handleOnSearchChange}/>
    </div>
  );
}

export default App;
