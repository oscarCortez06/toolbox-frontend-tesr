import './App.css'

import Container from 'react-bootstrap/Container'
import TableFiles from './components/TableFiles'
import Header from './components/Header'
import Row from 'react-bootstrap/Row'
const columns = ['File Name', 'Text', 'Number', 'Hex']
const rows = []

function App () {


  return (
    <div className='App'>
      <Header/>
     <Container>
      <Row  style={{ marginTop: 20 , marginBottom : 20 }}>
          <TableFiles  rows ={rows} columns = {columns} />
       </Row>
    </Container>

    </div>
  )
}

export default App
