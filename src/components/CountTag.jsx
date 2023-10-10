import React from 'react';
import { FaHeart } from 'react-icons/fa'; // Importa el ícono de un corazón de React Icons

function CountTag({ datos, icon, value = 0, theme = 'red', title }) {
  return (
    <div className={`flex items-center justify-center space-y-4 bg-gray-100`}>
      <div className={`flex flex-wrap items-start content-around justify-start text-sm font-semibold`}>
        <div
          className={`flex items-center px-0.5 border rounded-lg group hover:border-${theme}-500 hover:text-${theme}-900 hover:bg-${theme}-300 bg-gray-400`}
          title={title}
        >
          {icon && (
            <div className={`text-white cursor-default w-5 h-5`} title={title}>
              {icon}
            </div>
          )}
          {datos && (
            <div className={`group-hover:bg-${theme}-700 py-0.5 px-2 text-white rounded-full cursor-default`} title={title}>
              {datos}
            </div>
          )}
          {value != null && (
            <div className={`group-hover:bg-${theme}-700 py-0.5 px-2 text-white rounded-full cursor-default`} title={title}>
              {value}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountTag;


