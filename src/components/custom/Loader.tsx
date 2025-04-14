import logo from '@/assets/logo.svg';


const Loader = () => {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center flex-col">
        <div className="relative flex justify-center items-center">
          <div className="absolute animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-secondary"></div>
          <img src={logo} className="rounded-full h-16 w-16" />
        </div>
        <h1 className="text-white mt-10">Loading please wait..</h1>
      </div>
    </>
  );
};

export default Loader;
