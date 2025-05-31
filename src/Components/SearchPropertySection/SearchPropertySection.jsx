import "../SearchPropertySection/SearchPropertySection.css"
// import PropertySearch from './../PropertySearch/PropertySearch';
import Searchbar from './../PropertySearch/Searchbar';
const SearchPropertySection = () => {
  return (
    <>
      <div className="search-property-section text-center">
        <div className="container ">
          <h2>Find Buy,Rent,Sell Property in India</h2>
          <div className="span-tag">
                      <span className="sell-rent"></span>

          </div>
          <Searchbar/>
         {/* <PropertySearch/> */}









        </div>
      </div>
      
    </>
  );
};

export default SearchPropertySection;
