import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/atom';
import { countries } from '../data/countries';



export const DataTable = ({ data, onEdit, onDelete }) => {
  const user = useRecoilValue(userState);
  const isAdmin = user?.role === 'admin';

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            
            <th className="w-16 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              S. No.
            </th>
            <th className="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="w-96 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Country
            </th>
          
            {isAdmin && (
              <th className="w-24 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="w-16 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="w-48 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate">
                {item.title}
              </td>
              <td className="w-96 px-6 py-4 text-sm text-gray-500">
                <div className="truncate max-w-md">{item.description}</div>
              </td>
              <td className="w-48 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {countries.find((c) => c.code === item.country)?.name}
              </td>
            
              {isAdmin && (
                <td className="w-24 px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => onEdit?.(item)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete?.(item._id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={isAdmin ? 6 : 5}
                className="px-6 py-8 text-center text-sm text-gray-500"
              >
                No data available for the selected country
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};