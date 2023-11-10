import React, { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import DataCard from "./DataCard";
import { UserData } from "../App";

interface CustomPaginationProps {
  itemsPerPage: number;
  githubUserData: UserData[];
}
interface githubUserDataProps {
  githubUserData: UserData[];
}
function Items({ githubUserData }: githubUserDataProps) {
  return (
    <>
      <div className="py-20 px-4   lg:px-20 grid sm:grid-cols-2 place-item-center space-y-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6 justify-center items-center  ">
        {githubUserData &&
          githubUserData.map((item) => (
            <div>
              <DataCard githubUserData={item} key={item.login} />
            </div>
          ))}
      </div>
    </>
  );
}

export default function CustomPagination({
  itemsPerPage,
  githubUserData,
}: CustomPaginationProps) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState<number>(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = githubUserData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(githubUserData.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % githubUserData.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="">
          <Items githubUserData={currentItems} />
        </div>
        <div className="mb-12">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </div>
      </div>
    </>
  );
}
