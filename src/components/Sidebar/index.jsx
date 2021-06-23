import React from 'react';
import './index.scss';

const Sidebar = ({ isActive, onClose, children, direction }) => (
  <aside
    style={{}}
    className={`sidebar${isActive ? ' active' : ''}${
      direction === 'left' ? ' left' : ' right'
    }`}
  >
    <main className="content">{children}</main>
    <section className="close" role="button" onClick={onClose} />
  </aside>
);

export default Sidebar;
