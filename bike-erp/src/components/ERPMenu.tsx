import React from 'react';
import "./ERPMenu.css"
import { ERPMenuData } from './ERPMenuData'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

const ERPMenu: React.FC = () => {
  return (
    <div className="sideMenu">

      <div className="container">
        <AccountCircleIcon className="icon" style={{ fontSize: 50 }}></AccountCircleIcon>
        <div className="username">UserName</div>
      </div>

      <ul className="sideMenuList">
        {ERPMenuData.map((val, key) => {
          return <li className="menuItems"> {" "}
            <div className="items">{val.title}</div>
          </li>
        })}
      </ul>

      <div className="settingLogout">
        <SettingsApplicationsIcon className="setting" style={{ fontSize: 50 }}></SettingsApplicationsIcon>
        <ExitToAppIcon className="logout" style={{ fontSize: 50 }}></ExitToAppIcon>
      </div>
    </div>
  );
}

export default ERPMenu