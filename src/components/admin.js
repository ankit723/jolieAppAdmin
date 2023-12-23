import * as React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from './userAdmin';

const AdminPanel = () => {
  const { page } = useParams();

  const ShowPage = () => {
    if (page === 'Users') {
      return (
        <UserPage />
      );
    } else {
      return null; // You might want to add a default case or handle other pages
    }
  };

  return (
    <div>
      <ShowPage />
    </div>
  );
};

export default AdminPanel;
