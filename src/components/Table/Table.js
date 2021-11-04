import React from 'react'
import './style.css';
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      <table>
        <tbody>
        {countries?.map((country, i) => (
          <tr key={i}>
            <td>{country.country}</td>
            <td>
              <strong>{numeral(country.cases).format("0,0")}</strong>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table
