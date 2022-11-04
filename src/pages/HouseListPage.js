import HouseCard from "../components/HouseCard";
import "./HouseListPage.css";

function HouseListPage({ filteredhouses }) {
  return (
    <div style={{ backgroundColor: "#11222b" }}>
      <div className='product-container' style={{ minHeight: "50rem" }}>
        <div className='container' style={{ minHeight: "25rem" }}>
          <div className='row flex-row' style={{ minHeight: "20rem" }}>
            {filteredhouses && filteredhouses.length >= 1 ? (
              filteredhouses.map((house) => (
                <HouseCard key={house._id} {...house} />
              ))
            ) : (
              <h1 style={{ color: "white", padding: "10rem" }}>
                There are no houses matching with your search
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseListPage;
