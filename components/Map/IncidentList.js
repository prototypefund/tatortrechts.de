import { useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";

import Histogram from "./Histogram";

import * as dayjs from "dayjs";

const Source = ({ name, url, date }) => {
  return (
    <span>
      {name}
      {date && dayjs(date).format(", DD.MM.YYYY")}
      {url.length > 0 && <a href="{url}">Link</a>}
    </span>
  );
};

const IncidentList = ({ histogram, results, next, count, loadMore }) => {
  const containerRef = useRef(null);

  if (count === null) {
    return null;
  }

  return (
    <div id="sidebar-results-outer">
      <div id="sidebar-results" ref={containerRef}>
        <div>{count} Treffer</div>
        <div>{histogram && <Histogram data={histogram} />}</div>
        <InfiniteScroll
          useWindow={false}
          getScrollParent={() => containerRef.current}
          pageStart={0}
          loadMore={loadMore}
          hasMore={next != null}
        >
          {results &&
            results.map((x) => {
              return (
                <div className="card" key={x.id}>
                  <header className="card-header">
                    <p className="card-header-title">
                      {dayjs(x.date).format("DD.MM.YYYY - ")}
                      {x.location.house_number} {x.location.street}{" "}
                      {x.location.district} {x.location.city} (
                      {x.location.county})
                    </p>
                  </header>
                  <div className="card-content">
                    Originale Ortsangaben aus der Chronik: {x.orig_city}{" "}
                    {x.orig_county}
                    {x.title && <p className="content">{x.title}</p>}
                    <p className="content">{x.description}</p>
                  </div>
                  <footer className="card-footer">
                    <div className="card-footer-item">
                      {x.sources.length === 1 && <span>Quelle: </span>}
                      {x.sources.length > 1 && <span>Quellen: </span>}
                      {x.sources.map((x) => (
                        <Source
                          name={x.name}
                          url={x.url}
                          date={x.date}
                          key={x.name + x.date + x.url}
                        />
                      ))}
                    </div>
                    <div className="card-footer-item">
                      Chronik: {x.chronicle.name} (<a href={x.url}>Link</a>)
                    </div>
                  </footer>
                </div>
              );
            })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default IncidentList;
