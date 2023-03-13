import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageRecordsContainer = () => {
    const { numofRecords, recordsPage, page , changePageRecords } = useAppContext();

    const pages = Array.from({ length: numofRecords }, (_, index) => {
      return index + 1;
    });
  
    const prevPage = () => {
      let newPage = recordsPage - 1;
      if (newPage < 1) {
        newPage = numofRecords;
      }
      changePageRecords(newPage);
    };
  
    const nextPage = () => {
      let newPage = recordsPage + 1;
      if (newPage > numofRecords) {
        newPage = 1;
      }
      changePageRecords(newPage);
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
                className={pageNum === recordsPage ? "pageBtn active" : "pageBtn"}
                key={pageNum}
                onClick={() => changePageRecords(pageNum)}
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

export default PageRecordsContainer;