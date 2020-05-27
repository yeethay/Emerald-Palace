import React from 'react';
import menu from './menu.json';
import './Menu.css';

interface ICategory {
  name: string;
  items: IItem[];
}

interface IItem {
  number: string;
  name: string;
  description?: string;
  price: number | number[];
}

const Menu = () => (
  <div className="menu">
    {menu.map((category: ICategory) => (
      <div className="category" key={category.name}>
        <h1>{category.name}</h1>
        <table>
          <tbody>
            {category.items.some((item) => Array.isArray(item.price)) && (
              <tr>
                <th></th>
                <th></th>
                <th>Small</th>
                <th>Large</th>
              </tr>
            )}
            {category.items.map((item: IItem) => (
              <tr key={item.number}>
                <td>{item.number}</td>
                <td>
                  <div>{item.name}</div>
                  <div className="description">{item.description}</div>
                </td>
                {Array.isArray(item.price) ? (
                  item.price.map((p) => <td key={p}>{p}</td>)
                ) : (
                  <td>{item.price}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);

export default Menu;
