import React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from './store/atom';
import instance from './axios/axios.ts';
import { Header } from './components/Header';
import { DataTable } from './components/DataTable';
import { DataForm } from './components/DataForm';

function App() {
  const [user] = useRecoilState(userState);
  const [data, setData] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editingData, setEditingData] = React.useState(null);





  const fetchData = React.useCallback(async () => {
    try {
      const response = await instance.get('/api/v1/data/getDataByCountry', {
        params: { country: user.country },
      });
  
      
      if (response.data?.data?.length) {
        setData(response.data.data);
        console.log('Data updated:', response.data.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
  
     
      toast.error('Failed to fetch data. Please try again.');
    }
  }, [user.country]);
  
  React.useEffect(() => {
    fetchData();
  }, [user.country]);

  

  const createData = async (formData) => {
    try {
      const response = await instance.post('/api/v1/data/create', formData);
      setData((prevData) => [...prevData, response.data.data]);
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const editData = async (id, formData) => {
    try {
      const response = await instance.put(`/api/v1/data/edit/${id}`, formData);
      setData((prevData) =>
        prevData.map((item) => (item._id === id ? response.data.data : item))
      );
    } catch (error) {
      console.error('Error editing data:', error);
    }
  };



  const deleteData = async (id) => {
    try {
      await instance.delete(`/api/v1/data/delete/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleSubmit = (formData) => {
    if (editingData) {
      editData(editingData._id, formData);
    } else {
      createData({ ...formData, country: user.country });
    }
    setShowForm(false);
    setEditingData(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Data Management</h2>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add New
          </button>
        </div>
        <DataTable
          data={data}
          onEdit={(item) => {
            setEditingData(item);
            setShowForm(true);
          }}
          onDelete={deleteData}
        />
      </main>
      {showForm && (
        <DataForm
          data={editingData}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;
