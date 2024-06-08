import PostForm from '@/components/admin/PostForm';
import Layout from '/src/components/admin/Layout';

export default function page() {
  return (
    <Layout>
        <h1 className="text-2xl font-bold ml-1 text-[#004f4f] leading-tight mb-8">New Post</h1>
        <PostForm/>
    </Layout>
  )
}
