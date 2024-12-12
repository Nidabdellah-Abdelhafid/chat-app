import React, { useState } from 'react';
import { ListGroup, Image } from 'react-bootstrap';

const URL_BACKEND = 'http://192.168.11.106:1337';

const Sidebar = ({ users, onUserClick }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUserId(user.id);
    onUserClick(user);
  };

  const renderUserListItem = (user) => (
    <ui
      key={user.id}
      onClick={() => handleUserClick(user)}
      className={`cursor-pointer p-2 ${selectedUserId === user.id ? 'bg-light' : 'hover:bg-gray-300'}`}
    >
      <div className="d-flex align-items-center" style={{cursor:'pointer'}}>
        <div className="avatar">
          <div className="w-16 h-16 overflow-hidden">
            <img
            width={60}
            height={60}
              src={user.image && user.image.url ? `${URL_BACKEND}${user.image.url}` : 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/75/cc/7c/75cc7cf2-516f-b0f4-a8ed-3baccc1abcbf/source/512x512bb.jpg'}
              alt={user.username}
              className='rounded-circle'
            />
          </div>
        </div>
        <div className='align-items-center mx-2 '>
          <p className="text-lg font-medium">{user.username}</p>
        </div>
      </div>
    </ui>
  );

  return (
    <div className="bg-gray-100 border-end col-md-3 col-sm-12">
      <div className="d-flex align-items-center justify-content-center mb-3 border-bottom p-2">
        <div className="avatar">
          <div className="overflow-hidden ">
            <Image src="https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/75/cc/7c/75cc7cf2-516f-b0f4-a8ed-3baccc1abcbf/source/512x512bb.jpg" 
            height={90}
            width={90}
            className='rounded-circle'
            alt="Logo" />
          </div>
        </div>
        <div className="mx-2">
          <p className="text-xl font-semibold">Voyages sur mesure</p>
        </div>
      </div>
      <ListGroup className='overflow-auto' style={{ height: '50vh' }}>
        {users.map((user) => renderUserListItem(user))}
      </ListGroup>
    </div>
  );
};

export default Sidebar;
