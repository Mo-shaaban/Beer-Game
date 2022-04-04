import React, { useMemo } from 'react';
import { useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './viewgame_table_columns'
import './viewgame_table.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useParams } from 'react-router-dom'

export const ViewGame = () => {
  const {id}=useParams()
   
  var ins_id=id;
  console.log(ins_id)
  
  const create_json = () => {
    axios.post('http://0.0.0.0:8086/create_json',
      {
        instructor_id:ins_id
      })
      .then(response => {
        // console.log(response.data)

        var x = response.data

        console.log(x)
      })
      .catch(error => {
        console.log(error.response)
      });
  }

  create_json();

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const tableInstance = useTable({
    columns,
    data
  })

  var x = -1;
  const getkeyunique = () => {
    x = x + 1;
    return x;
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance

  return (
    <>
      <div className="container1">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              // console.log({"Row":row.cells});
              // if (row.cells[])
              return (
                <tr {...row.getRowProps()} key={getkeyunique()}>
                  {row.cells.map(cell => {
                    // return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;

                    // console.log({"T":cell.column.Header});
                    var t = cell.column.Header;
                    if (t === "Stop/Continue Game") {
                      return <td key={getkeyunique()}><button className="btn" type="button">Stop/Continue Game</button></td>
                    }
                    else if (t === "Graphical Plots") {
                      return <td key={getkeyunique()}><button className="btn" type="button">Show Graphs</button></td>
                    }
                    else {
                      return <td {...cell.getCellProps()} key={getkeyunique()}>{cell.render("Cell")}</td>;
                    }
                    //   return <td>{ len(row.cells) }</td>
                    //   return <td><button class="btn" type="button">Button</button></td>
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="buttoncenter">
        <Link to="/editgametable">
          <button className="btn-edit" type="button">Edit/Update</button>
        </Link>
      </div>

    </>
  )

}

export default ViewGame