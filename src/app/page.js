import Login from "@/components/login/Login";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-200">
      <div className="flex items-center justify-center text-center h-[50vh] w-[20vw] bg-white rounded-lg p-5">
        <Login/>
      </div>
    </div>
  );
}
