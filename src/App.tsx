
import data from '../src/data/data.json'

const allData = data.map((item) => {
  return (
    <div className='bg-slate-100 p-2'>
      <h2>{item.name}</h2>
      {item.favorites.map((favorite) => {
        return (
          <>
            <h3>{favorite.name}</h3>
          </>
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
