import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function FetchAPI() {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  //function to fetch async data from api and returna  json response, wait for response and then set data to the response
  const fetchApi = async () => {
    const response = await fetch(
      "https://www.anapioficeandfire.com/api/characters?page=" +
        currentPage +
        "&pageSize=24"
    );
    const data = await response.json();
    setData(data);
  };

  const maxPageCount: number = 89;

  const nextPage = () => {
    if (currentPage <= maxPageCount) {
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

  //function to make button disabled until data is fetched
  const isDisabled = () => {
    if (data.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="p-4 flex flex-col gap-2">
        <h1 className="text-xl font-bold text-center">
          Fetch Fire and Ice API
        </h1>

        <div className="flex justify-center flex-col mx-auto gap-2">
          <button
            onClick={() => nextPage()}
            className="rounded bg-slate-100 p-2 outline outline-slate-200 hover:bg-slate-200 w-auto"
          >
            Next Page
          </button>
          <button
            onClick={() => previousPage()}
            className="rounded bg-slate-100 p-2 outline outline-slate-200 hover:bg-slate-200 w-auto"
          >
            Previous Page
          </button>
        </div>
        <p className="text-center mx-auto">
          Current Page: <span className="text-xl font-bold">{currentPage}</span>
        </p>
      </div>

      <div className="p-4 grid grid-cols-2 gap-2">
        {!isDisabled() ? (
          // map over data and display it here, filter results out where the name is empty
          data
            .filter((item) => item.name !== "")
            .map((item, index) => (
              <div
                key={item.url}
                className="p-4 rounded bg-slate-100 shadow-md select-none"
              >
                <details className="hover:cursor-pointer">
                  <summary>
                    {" "}
                    {item.name !== "" ? (
                      <h1 className="text-2xl font-semibold">{item.name} </h1>
                    ) : (
                      <h1 className="text-xl font-bold">No Name</h1>
                    )}
                  </summary>
                  <motion.div
                    animate={{
                      x: 0,
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      boxShadow: "8px 8px 16px rgba(0, 0, 0, 0.25)",
                      position: "absolute",
                      width: "33%",
                      padding: "2rem",
                      margin: "2rem",
                      border: "1px solid #ccc",
                      scale: 1.1,
                    }}
                  >
                    <h2 className="text-2xl font-bold mb-2 tracking-wider">
                      <a
                        target={"_blank"}
                        rel="noreferrer"
                        href={
                          "https://www.google.com/search?q=" +
                          item.name +
                          " Game Of Thrones"
                        }
                      >
                        {item.name}
                      </a>
                    </h2>
                    <p className="mb-4">
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
                    <div>
                      <span className="font-bold">Played by: </span>
                      {item.playedBy.map((actor: string) => {
                        return (
                          <div key={actor}>
                            {" "}
                            <a
                              target={"_blank"}
                              rel="noreferrer"
                              href={"https://www.google.com/search?q=" + actor}
                            >
                              {actor}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </details>
              </div>
            ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
