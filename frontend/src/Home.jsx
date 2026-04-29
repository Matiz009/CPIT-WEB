import React from 'react'
import data from './assets/data.json'
import Card from './Card'
const Home = () => {
  return (
    <div>
      {
        data.map((item) => {
          return (
            <div key={item.id}>
             <Card title={item.title}
              image={item.image} body={item.body}
              userId={item.userId} />
            </div>
          )
        })
      }
    </div>
  )
}

export default Home