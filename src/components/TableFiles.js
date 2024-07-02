import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from "../redux/slice/filesSlice";
export default function TableFiles({columns, rows}){

  const dispatch = useDispatch();
  const [rowsRedux, setRowsRedux] = useState([])
  const [page, setPage ] = useState(1)
  const [totalItemsPerPage, setTotalItemsPerPage ] = useState(10)
  const [pages, setPages] =  useState([]);
  const [search, setSearch] = useState('');
  const files = useSelector((state) => state.data)
  const indexOfLastPost = page * totalItemsPerPage;
  const indexOfFirstPost = indexOfLastPost - totalItemsPerPage;


  useEffect(() => {
    dispatch(fetchFiles())
  }, [dispatch])

  useEffect(() => {
    const filesInfo = [] 
    const mappingPages = []
    files.map(({file, lines}) => lines.map((line) => {
      filesInfo.push(line) 
    }))
    const currentFiles = filesInfo.slice(indexOfFirstPost, indexOfLastPost);
    
    for (let i = 1; i <= Math.ceil(filesInfo.length / totalItemsPerPage ); i++) {
      mappingPages.push(i)    
    }
    setPages(mappingPages)
    setRowsRedux(currentFiles)
  }, [files])

  useEffect(() => {
    if (search.length === 0) {
      dispatch(fetchFiles())
    }
  }, [search])

  const searchFile = () => {
    dispatch(fetchFiles(search))
  }

  return (
    <>
    <InputGroup className="mb-3">
        <FormControl
          placeholder="Search File"
          aria-label="Search File"
          aria-describedby="basic-addon2"
          type='text'
          name='search' 
          defaultValue={search}
          onChange = { (event) => { setSearch(event.target.value) } }
        
        />
        <Button 
        disabled= { search.length <= 2}
        variant="primary"
        onClick={searchFile}
        >Search</Button>

      </InputGroup>
      
      <Table striped bordered hover>
        <thead>
         
          <tr>
            { columns.length > 0 ? 
              columns.map((column, index) =>  {
                  return (
                      <th key={index}>
                          { column }
                      </th>
                  )
              }) : null
            }
          </tr>
        </thead>
        <tbody>
          { rowsRedux.length > 0 ? 
            rowsRedux.sort((a, b) => a.file.localeCompare(b.file)).map((row, index) => {
              return(
                <tr key={index}>
                  <td>
                    { row.file}
                  </td>
                  <td>
                    {row.text}
                  </td>
                  <td>
                    {row.number}
                  </td>
                  <td>
                    {row.hex}
                  </td>
             </tr>
              )
            }) :   (
              <tr key='not_found'>
                <td colSpan={4}>
                  No files to show
                </td>
              </tr>

            )             
          }
        </tbody>
      </Table>  
      <Pagination>
      ` {pages.map((number) => (
              <Pagination.Item key={number} active={number === page} onClick={() => {
                setPage(number)
                const indexOfLastPost = number * totalItemsPerPage;
                const indexOfFirstPost = indexOfLastPost - totalItemsPerPage;
                const currentFiles = rowsRedux.slice(indexOfFirstPost, indexOfLastPost);
                console.log(currentFiles)
                setRowsRedux(currentFiles)

              }}>
              {number}
            </Pagination.Item>
        ))}     
      </Pagination>

     
    </>
  )
}