import absoluteUrl from 'next-absolute-url';
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useState } from 'react';

function Home({ data }) {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [roll, setRoll] = useState('')

  let counter = 0;

  const { result } = data

  result.forEach(res => {
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

    fetch('http://localhost:3000/api/hello', {
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
          e.target.reset()
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
              </tr>
            </thead>
            <tbody>
              {
                result.map(res => <TableItem key={res._id} data={res} />)
              }
            </tbody>
          </table>
        </div>
      </body>
    </>
  )
}

const TableItem = ({ data }) => {
  return (
    <tr>
      <td>{data.sr}</td>
      <td>{data.name}</td>
      <td>{data.address}</td>
      <td>{data.classRoll}</td>
    </tr>
  )
}


export async function getServerSideProps() {


  const res = await fetch('http://localhost:3000/api/hello')
  const data = await res.json()
  return { props: { data } }
}

export default Home;