import { useState, useEffect } from "react";

export default function FetchAPI() {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  //function to fetch async data from api and returna  json response
  const fetchApi = async () => {
    const response = await fetch(
      "https://www.anapioficeandfire.com/api/characters?page=" +
        currentPage +
        "&pageSize=25"
    );
    const res = await response.json();
    setData(res);
  };

  const nextPage = () => {
    if (currentPage <= 85) {
      setCurrentPage(currentPage + 1);
    }
    fetchApi();
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    fetchApi();
  };

  //useEffect to fetch data on page load
  useEffect(() => {
    fetchApi();
  }, [currentPage]);

  return (
    <>
      <div className="p-4 flex flex-col gap-2">
        <h1 className="text-xl font-bold text-center">Fetch API</h1>
        <button
          onClick={() => nextPage()}
          className="rounded bg-slate-100 p-2 outline outline-slate-200 hover:bg-slate-200 "
        >
          Next Page
        </button>
        <button
          onClick={() => previousPage()}
          className="rounded bg-slate-100 p-2 outline outline-slate-200 hover:bg-slate-200 "
        >
          Previous Page
        </button>
        <p className="text-center mx-auto">Current Page:{currentPage}</p>

        <p>Results for this page: {data.length}</p>
      </div>

      <div className="p-4 grid grid-cols-2 gap-2">
        {
          // map over data and display it here, filter results out where the name is empty
          data
            .filter((item) => item.name !== "")
            .map((item, index) => (
              <div
                key={item.url}
                className="p-4 rounded bg-slate-100 shadow-md"
              >
                <details>
                  <summary>
                    {" "}
                    {item.name !== "" ? (
                      <h1 className="text-2xl font-semibold">{item.name} </h1>
                    ) : (
                      <h1 className="text-xl font-bold">No Name</h1>
                    )}
                  </summary>
                  <p className="my-4">
                    <span className="font-bold">Gender:</span>
                    {item.gender != "" ? item.gender : null}
                  </p>
                  <p className="my-4">
                    {item.culture != "" ? (
                      <span className="font-bold">
                        Culture:{" "}
                        <span className="font-normal">{item.culture}</span>
                      </span>
                    ) : null}
                  </p>
                  <div>
                    <span className="font-bold">Titles:</span>
                    {item.titles.map((title: string) => {
                      return <div key={title}>{title}</div>;
                    })}
                  </div>
                  <div>
                    <span className="font-bold">Aliases:</span>
                    {item.aliases.map((alias: string) => {
                      return <div key={alias}>{alias}</div>;
                    })}
                  </div>
                </details>
              </div>
            ))
        }
      </div>
    </>
  );
}
