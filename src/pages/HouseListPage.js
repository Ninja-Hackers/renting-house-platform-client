import HouseCard from "../components/HouseCard";
import "./HouseListPage.css";

function HouseListPage({ filteredhouses }) {
  return (
    <div style={{ backgroundColor: "#11222b"}}>
      <div className='product-container'>
        <div className='container' >
          <div className='row flex-row'>
            {filteredhouses &&
              filteredhouses.map((house) => (
                <HouseCard key={house._id} {...house} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseListPage;
