import React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from './store/atom';
import instance from './axios/axios.ts';
import { Header } from './components/Header';
import { DataTable } from './components/DataTable';
import { DataForm } from './components/DataForm';

function App() {
  const [user] = useRecoilState<any>(userState);
  const [data, setData] = React.useState<any>([]);
  const [showForm, setShowForm] = React.useState<any>(false);
  const [editingData, setEditingData] = React.useState<any>(null);

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
    }
  }, [user.country]);
  
  React.useEffect(() => {
    fetchData();
  }, [user.country]);

  const createData = async (formData:any) => {
    try {
      const response = await instance.post('/api/v1/data/create', formData);
      setData((prevData :any) => [...prevData, response.data.data]);
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const editData = async (id : string, formData : any) => {
    try {
      const response = await instance.put(`/api/v1/data/edit/${id}`, formData);
      setData((prevData : any) =>
        prevData.map((item : any) => (item._id === id ? response.data.data : item))
      );
    } catch (error) {
      console.error('Error editing data:', error);
    }
  };

  const deleteData = async (id : any) => {
    try {
      await instance.delete(`/api/v1/data/delete/${id}`);
      setData((prevData :any) => prevData.filter((item : any) => item._id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleSubmit = (formData:any) => {
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
      <main className="w-full px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Data Management</h2>
          <button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 shadow-sm"
          >
            Add New
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <DataTable
              data={data}
              onEdit={(item : any) => {
                setEditingData(item);
                setShowForm(true);
              }}
              onDelete={deleteData}
            />
          </div>
        </div>
      </main>
      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="w-full max-w-lg">
                <DataForm
                  data={editingData}
                  onSubmit={handleSubmit}
                  onClose={() => setShowForm(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;