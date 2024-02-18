import React, { FC, useCallback, useMemo } from "react";
import { getPagesArray } from "../../utils/pages";
import { useActions } from "../../hooks/useAction";
import ArrowInput from "../../images/arrow/arrow-down";

interface PaginationProps {
  totalPages: number;
  page: number;
  maxPages: number;
}

const Pagination: FC<PaginationProps> = ({ totalPages, page, maxPages }) => {
  const pagesArray = useMemo(() => getPagesArray(totalPages), [totalPages]);
  const { setPage } = useActions();
  const renderPaginationItems = useCallback(() => {
    const paginationItems = [];

    if (pagesArray.length <= maxPages) {
      for (const p of pagesArray) {
        paginationItems.push(
          <span
            key={p}
            onClick={() => setPage(p)}
            className={p === page ? "page page__current" : "page"}
          >
            {p}
          </span>
        );
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= maxPages; i++) {
          paginationItems.push(
            <span
              key={i}
              onClick={() => setPage(i)}
              className={i === page ? "page page__current" : "page"}
            >
              {i}
            </span>
          );
        }
        paginationItems.push(<span key="dots1">...</span>);
        paginationItems.push(
          <span
            onClick={() => setPage(pagesArray.length)}
            className="page"
            key={pagesArray.length}
          >
            {pagesArray.length}
          </span>
        );
      } else if (page >= pagesArray.length - 2) {
        paginationItems.push(
          <span onClick={() => setPage(1)} className="page" key={1}>
            1
          </span>
        );
        paginationItems.push(<span key="dots2">...</span>);
        for (let i = pagesArray.length - 4; i <= pagesArray.length; i++) {
          paginationItems.push(
            <span
              key={i}
              onClick={() => setPage(i)}
              className={i === page ? "page page__current" : "page"}
            >
              {i}
            </span>
          );
        }
      } else {
        paginationItems.push(
          <span onClick={() => setPage(1)} className="page" key={1}>
            1
          </span>
        );
        paginationItems.push(<span key="dots3">...</span>);
        for (let i = page - 1; i <= page + 1; i++) {
          paginationItems.push(
            <span
              key={i}
              onClick={() => setPage(i)}
              className={i === page ? "page page__current" : "page"}
            >
              {i}
            </span>
          );
        }
        paginationItems.push(<span key="dots4">...</span>);
        paginationItems.push(
          <span
            onClick={() => setPage(pagesArray.length)}
            className="page"
            key={pagesArray.length}
          >
            {pagesArray.length}
          </span>
        );
      }
    }

    return paginationItems;
  }, [page]);

  return (
    <>
      <span
        onClick={(e) => (page <= 1 ? e.preventDefault() : setPage(page - 1))}
        className={"arrow-move arrow-move-left"}
      >
        <ArrowInput className={"arrow-pagination arrow-left"} />
      </span>
      <span>{renderPaginationItems()}</span>

      <span
        onClick={() => setPage(page + 1)}
        className={"arrow-move arrow-move-right"}
      >
        <ArrowInput className={"arrow-pagination arrow-right"} />
      </span>
    </>
  );
};

export default React.memo(Pagination);
