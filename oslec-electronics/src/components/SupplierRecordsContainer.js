import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const SupplierRecordsContainer = () => {
    const { numofSupplierPages, pageSupplier, page , changePageSupplier } = useAppContext();

    const pages = Array.from({ length: numofSupplierPages }, (_, index) => {
      return index + 1;
    });
  
    const prevPage = () => {
      let newPage = pageSupplier - 1;
      if (newPage < 1) {
        newPage = numofSupplierPages;
      }
      changePageSupplier(newPage);
    };
  
    const nextPage = () => {
      let newPage = pageSupplier + 1;
      if (newPage > numofSupplierPages) {
        newPage = 1;
      }
      changePageSupplier(newPage);
    };
    return (
      <Wrapper>
        <button className="prev-btn" onClick={prevPage}>
          <HiChevronDoubleLeft />
        </button>
        <div className="btn-container">
          {pages.map((pageNum) => {
            return (
              <button
                type="button"
                className={pageNum === pageSupplier ? "pageBtn active" : "pageBtn"}
                key={pageNum}
                onClick={() => changePageSupplier(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        <button className="next-btn" onClick={nextPage}>
          <HiChevronDoubleRight />
        </button>
      </Wrapper>
    );
};

export default SupplierRecordsContainer;