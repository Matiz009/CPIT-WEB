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
             <Card title={item.title} userId={item.userId} body={item.body} image={item.image} />
            </div>
          )
        })
      }
    </div>
  )
}

export default Home