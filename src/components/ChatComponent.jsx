import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import axios from 'axios';

const URL_BACKEND = 'http://192.168.11.106:1337';

function AddVilleComponent() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDC, setUserDC] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${URL_BACKEND}/api/users?populate=*&pagination[limit]=-1`);
      const users = response.data;
      const updatedUsers = users.slice(1);
      setUserDC(updatedUsers);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div style={{ height: '100vh' }} className="d-flex flex-column">
      <main id="main" className="main flex-grow-1">
        <div className="content-wrapper flex-grow-1">
          {/* Content */}
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">
              {/* Order Statistics */}
              <div className="col-xxl">
                <div className="card mb-4">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="mb-0"> </h5>
                    <small className="text-muted float-end"></small>
                  </div>
                  <div className="card-body mt-4 d-flex align-items-center justify-content-between">
                    <div className="d-flex flex-column flex-md-row flex-grow-1" style={{ height: '75hv' }}>
                      <Sidebar users={userDC} onUserClick={handleUserClick} className="flex-none" />
                      <ChatWindow
                        user={selectedUser}
                        className="flex-grow"
                        
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* List des Villes */}
            
          </div>
          {/* / Content */}
        </div>
      </main>
    </div>
  );
}

export default AddVilleComponent;
