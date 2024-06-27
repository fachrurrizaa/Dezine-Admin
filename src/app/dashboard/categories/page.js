'use client'
import Button from '@/components/Button';
import Input from '@/components/Input';
import Layout from '/src/components/admin/Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function page() {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchCategories()
  }, [])

  function fetchCategories(){
    axios.get('/api/categories').then(result => {
      setCategories(result.data)})
  }

  async function saveCategory(e){
    e.preventDefault();
    const data = {name, parentCategory}
    if (editedCategory){
      data._id = editedCategory._id;
      await axios.put('/api/categories', {...data});
      setEditedCategory(null)
    } else {
      await axios.post('/api/categories', data);
    }
    setName('');
    fetchCategories();
  }

  function editCategory(category){
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id)
  }

  function deleteCategory(category){
    MySwal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete '${category.name}'`,
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: '#d55',
      cancelButtonText: 'Cancel',
    }).then(async result => {
      if (result.isConfirmed) {
        const {_id} = category;
        await axios.delete('/api/categories?_id='+_id);
        fetchCategories();
      }
    })
  }

  return (
    <Layout>
        <h1 className='text-2xl font-bold text-[#004f4f] leading-tight mb-8 ml-1'>Categories</h1>
        <form onSubmit={saveCategory} className="flex gap-2 flex-col">
          <Input 
            label={editedCategory ? `Edit Category ${editedCategory.name}` : "Create New Category"}
            type={"text"}
            className={"rounded-lg max-w-screen-sm"}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={"Category Name"} 
          />
          <select className="select select-bordered w-full max-w-screen-sm mb-4"
            onChange={e => setParentCategory(e.target.value)}
            value={parentCategory}>
            <option value="0">Choose your parent category</option>
            {categories.length > 0 && categories.map(category => (
              <option value={category._id} key={category._id}>{category.name}</option>
            ))}
          </select>
          <Button type={"submit"} className={"rounded-lg bg-[#028d94] hover:bg-[#02b2bb] py-4 w-20 text-white"} content={"Save"}/>
        </form>
        {categories.length === 0 ? '' : 
          <div className="overflow-x-auto mt-8">
            <table className="table text-center">
                <thead>
                    <tr>
                        <th className="bg-teal-100">Category Name</th>
                        <th className="bg-teal-100">Parent Category</th>
                        <th className="bg-teal-100">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                    <tr className="hover" key={category._id}>
                        <td className="">{category.name}</td>
                        <td className="">{category?.parent?.name ? category?.parent?.name : '-'}</td>
                        <td>
                            <Button className="bg-[#028d94] hover:bg-[#02b2bb] w-20 min-h-[28px] h-7 text-white p-0 font-normal normal-case rounded-md gap-1 mr-1 text-sm" click={() => editCategory(category)} content={
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                Edit
                              </>
                            }/>
                            <Button className="bg-[#028d94] hover:bg-[#02b2bb] w-20 min-h-[28px] h-7 text-white p-0 font-normal normal-case rounded-md gap-1 mr-1 text-sm" click={() => deleteCategory(category)} content={
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                Delete
                              </>
                            }/>
                        </td>
                    </tr>
                    ))
                    }
                </tbody>
            </table>
          </div>
        }
    </Layout>
  )
}
