import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import getList from '../lib/getlist';

function Home() {


  const [ex, setEx] = useState([])
  const [change, setChange] = useState(1)

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setEx(data.result))
  }, [change])



  console.log(ex)


  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [roll, setRoll] = useState('')

  let counter = 0;

  ex.forEach(res => {
    counter = counter + 1
    res['sr'] = counter
  })


  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  }



  const handleForm = (e) => {
    e.preventDefault()

    const data = {
      name: name,
      address: address,
      classRoll: roll
    }

    fetch('/api/hello', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          refreshData()
          setChange(change === 1 ? 2 : 1)
          e.target.reset()
        }
      })

  }

  const clickOnDelete = (id) => {
    fetch('/api/hello', {
      method: "DELETE",
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({ id: id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          refreshData()
          setChange(change === 1 ? 2 : 1)
        }
      })

  }
  return (
    <>
      <Head>
        <title>Work</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous" />
      </Head>
      <body>
        <div className="container">
          <div className="title"><h1 className="text-center my-5">Student<span className="text-success"> Directory</span> List</h1></div>
          <form onSubmit={handleForm} className="form" >
            <label>Name</label>
            <input onChange={(e) => setName(e.target.value)} id="name" type="text" className="form-control" /> <br />
            <label>Address</label>
            <input onChange={(e) => setAddress(e.target.value)} id="address" type="text" className="form-control" /> <br />
            <label>Class Roll</label>
            <input onChange={(e) => setRoll(e.target.value)} id="roll" type="text" className="form-control" /> <br />
            <input id="submit-button" type="submit" value="Add Now" className="btn btn-success d-block w-100" />
          </form>
          <table className="table table-success table-striped my-5 text-center text-uppercase">
            <thead>
              <tr>
                <td>Sr.</td>
                <td>Name</td>
                <td>Address</td>
                <td>Class Roll</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {
                ex.map(res => <TableItem key={res._id} data={res} clickOnDelete={clickOnDelete} />)
              }
            </tbody>
          </table>
        </div>
      </body>
    </>
  )
}

const TableItem = ({ data, clickOnDelete }) => {
  return (
    <tr>
      <td>{data.sr}</td>
      <td>{data.name}</td>
      <td>{data.address}</td>
      <td>{data.classRoll}</td>
      <td><button onClick={() => clickOnDelete(data._id)} className='btn btn-danger'>Delete</button></td>
    </tr>
  )
}


/* export async function getStaticProps() {

  const data = await getList()
  return { props: { data } } 
} */

export default Home;