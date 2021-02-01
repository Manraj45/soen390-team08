import React from 'react';
import "../ERPMenu.css"
import { ERPMenuData } from './ERPMenuData'

const ERPMenu: React.FC = () => {
  return (
    <div className="sideMenu">

      <div className="accountMenuBar">
        UserName
      </div>

      <ul className="sideMenuList">
        {ERPMenuData.map((val, key) => {


          return <li className="menuItems" key="key"> {" "}

            <div className="items">
              {val.title}
            </div>

          </li>



        })}
      </ul>
    </div>
  );
}

export default ERPMenu