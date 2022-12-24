import { useState } from "react";

function App() {
  interface IPerson {
    name?: string;
    age?: number;
    bgColor?: string;
    headShot?: string;
  }

  const people: IPerson[] = [
    {
      name: "Peter",
      age: 20,
      bgColor: "bg-red-50",
      headShot: "https://picsum.photos/200/300",
    },
    {
      name: "Jane",
      age: 21,
      bgColor: "bg-blue-50",
      headShot: "https://picsum.photos/200/301",
    },
    {
      name: "Jack",
      age: 22,
      bgColor: "bg-orange-50",
      headShot: "https://picsum.photos/201/302",
    },
    {
      name: "Jillian",
      age: 23,
      bgColor: "bg-green-50",
      headShot: "https://picsum.photos/201/300",
    },
    {
      name: "Jenn",
      age: 24,
      bgColor: "bg-purple-50",
      headShot: "https://picsum.photos/201/301",
    },
  ];

  let selected: IPerson = people[0];

  const [selectedPerson, setSelectedPerson] = useState<IPerson>(people[0]);

  const setSelected = (person: IPerson) => {
    selected = person;
    setSelectedPerson(person);
  };

  const peopleMap = people.map((person) => {
    return (
      <button
        onClick={() => setSelected(person)}
        key={person.name}
        className={
          "w-60 mx-auto p-2 h-auto bg-slate-50 transition-all" +
          (person.name === selectedPerson.name
            ? " bg-slate-500 text-white w-64 scale-105 font-bold"
            : "")
        }
      >
        {person.name != "" ? person.name : "No Name"}
      </button>
    );
  });

  return (
    <>
      <div className="text-center grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 w-full gap-4 p-4 bg-black">
        {peopleMap}
      </div>

      <div
        className={
          "text-center transition-all p-4 m-4 shadow-md h-screen flex flex-col items-center justify-center " +
          selectedPerson.bgColor
        }
      >
        <div className="lg:flex lg:items-end justify-center gap-8 lg:text-right">
          <div>
            <h2 className="text-xl font-bold">
              {selectedPerson.name != "" ? selectedPerson.name : "No Name"}
            </h2>
            <h2 className="text-xl">{selectedPerson.age} years old</h2>
          </div>
          <img
            src={selectedPerson.headShot}
            alt="missing headshot image"
            className="w-auto h-auto rounded-full object-cover transition-all hover:scale-150 transform duration-300 ease-in-out hover:shadow-2xl hover:rotate-2 rotate-0 lg:mb-0 hover:mt-20 lg:hover:ml-16"
          />
        </div>
      </div>
    </>
  );
}

export default App;
