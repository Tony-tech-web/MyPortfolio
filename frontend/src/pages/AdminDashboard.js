import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const [projectsRes, blogRes, contactsRes] = await Promise.all([
        axios.get('http://localhost:3001/api/projects'),
        axios.get('http://localhost:3001/api/blog/admin/all', {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        }),
        axios.get('http://localhost:3001/api/contact', {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
      ]);
      setProjects(projectsRes.data);
      setBlogPosts(blogRes.data);
      setContacts(contactsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401) {
        navigate('/admin');
      }
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/admin');
      return;
    }

    fetchData();
  }, [navigate, fetchData]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/logout', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded ${activeTab === 'projects' ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2 rounded ${activeTab === 'blog' ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            Blog Posts
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded ${activeTab === 'contacts' ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            Contacts
          </button>
        </div>

        {activeTab === 'projects' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Projects Management</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-2">Title</th>
                    <th className="pb-2">Technologies</th>
                    <th className="pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(project => (
                    <tr key={project.id} className="border-b border-gray-700">
                      <td className="py-2">{project.title}</td>
                      <td className="py-2">{project.technologies.join(', ')}</td>
                      <td className="py-2">
                        <button className="text-blue-400 hover:text-blue-300 mr-2">Edit</button>
                        <button className="text-red-400 hover:text-red-300">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Blog Posts Management</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-2">Title</th>
                    <th className="pb-2">Published</th>
                    <th className="pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogPosts.map(post => (
                    <tr key={post.id} className="border-b border-gray-700">
                      <td className="py-2">{post.title}</td>
                      <td className="py-2">{post.published ? 'Yes' : 'No'}</td>
                      <td className="py-2">
                        <button className="text-blue-400 hover:text-blue-300 mr-2">Edit</button>
                        <button className="text-red-400 hover:text-red-300">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Messages</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Email</th>
                    <th className="pb-2">Message</th>
                    <th className="pb-2">Read</th>
                    <th className="pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(contact => (
                    <tr key={contact.id} className="border-b border-gray-700">
                      <td className="py-2">{contact.name}</td>
                      <td className="py-2">{contact.email}</td>
                      <td className="py-2 max-w-xs truncate">{contact.message}</td>
                      <td className="py-2">{contact.read ? 'Yes' : 'No'}</td>
                      <td className="py-2">
                        {!contact.read && (
                          <button className="text-green-400 hover:text-green-300 mr-2">Mark Read</button>
                        )}
                        <button className="text-red-400 hover:text-red-300">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;