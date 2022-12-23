
import data from '../src/data/data.json'

const allData = data.map((item) => {
  return (
    <div key={item.name} className='bg-slate-100 p-2 border-b'>
      <h2 className='text-lg font-bold'>{item.name}</h2>
      {item.favorites.map((favorite) => {
        return (
            <div key={favorite.name}>{favorite.name}</div>
        )
      })
      }
    </div>
  )
})

function App() {
  return (
    <div>
      {allData}
    </div>
  )
}

export default App
