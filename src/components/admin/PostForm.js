'use client'
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import Spinner from '../Spinner';
import { ReactSortable } from 'react-sortablejs';
import { Context } from '@/components/context/MyContext';

export default function PostForm({
    _id,
    title:existingTitle, 
    description:existingDescription, 
    link:existingLink,
    images:existingImages,
    category: assignedCategory
}) {
  const {setIsUpdated} = useContext(Context);
  const pathname = usePathname();
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || '');
  const [category, setCategory] = useState(assignedCategory || '')
  const [description, setDescription] = useState(existingDescription || '');
  const [link, setLink] = useState(existingLink || '');
  const [images, setImages] = useState(existingImages || []);
  const [goToPost, setGoToPost] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/api/categories').then(result => {
      setCategories(result.data)
    })
  }, [])

  async function savePost(e){
    e.preventDefault();
    const data = {title, description, link, images, category};
    if(_id){
        await axios.put('/api/post', {...data, _id})
    }else{
        await axios.post('/api/post', data)
    }
    setGoToPost(true)
    setIsUpdated(true)
  }

  if (goToPost){
    return router.push('/admin/post')
  }

  async function uploadImages(e){
    const files = e.target?.files;
    if (files?.length > 0){
      setIsUploading(true)
      const data = new FormData();
      for (const file of files){
        data.append('file', file)
      }
      const res = await axios.post('/api/upload', data)
      setImages(oldImages => {
        return [...oldImages, ...res.data.links]
      });
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images){
    setImages(images)
  }

  return (
    <form onSubmit={savePost}>
      <Input 
        label={"Title Post"} 
        className={"rounded-lg max-w-screen-xl"} 
        placeholder={"Title Post"} 
        value={title} 
        onChange={e => setTitle(e.target.value)}
      />
      <label className="label">
        <span className="label-text font-semibold text-[#004f4f] text-base mb-2">Category</span>
      </label>
      <select className="select select-bordered w-full max-w-screen-xl mb-4"
        onChange={e => setCategory(e.target.value)}
        value={category}>
        <option value="0">Uncategorized</option>
        {categories.length > 0 && categories.map(category => (
          <option value={category._id} key={category._id}>{category.name}</option>
        ))}
      </select>
      <label className="label">
        <span className="label-text font-semibold text-[#004f4f] text-base mb-2">Photo</span>
      </label>
      <div className='mb-4 flex flex-wrap gap-1'>
        <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-1">
          {!!images?.length && images.map(link => (
            <div key={link} className="h-24">
              <img src={link} alt="" className="max-h-full rounded-lg"/>
            </div>
          ))}
        </ReactSortable>
        {isUploading && (
            <div className="h-24 flex items-center">
              <Spinner/>
            </div>
        )}
        <label className='w-24 h-24 cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-slate-100'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <div>
            Upload
          </div>
          <input type="file" className='hidden' onChange={uploadImages}/>
        </label>
      </div>
      <label className="label">
        <span className="label-text font-semibold text-[#004f4f] text-base mb-2">Description</span>
      </label>
      <textarea 
        placeholder="Description" 
        className="textarea textarea-bordered textarea-lg w-full mb-4 max-w-screen-xl"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <Input 
        label={"Link"} 
        className={"rounded-lg max-w-screen-xl"} 
        placeholder={"Link"}
        value={link}
        onChange={e => setLink(e.target.value)}
      />
      <Button type={"submit"} className={"rounded-lg bg-[#028d94] hover:bg-[#02b2bb] mt-2"} content={pathname.includes('/edit') ? "Save" : "Publish" }/>
    </form>
  )
}
