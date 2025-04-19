import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen lg:pt-10">
      <div className="flex flex-col lg:flex-row mx-auto lg:w-1/2 rounded-lg min-h-[50rem] rounded-lg lg:shadow-lg lg:border border-gray-200">
        <div className="w-full lg:w-1/2 bg-gray-100 flex items-center justify-center rounded-l-lg">
          <img
            src="/logo.png"
            alt="Imagen"
            className="max-w-full max-h-full object-cover"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white rounded-r-lg lg:h-auto h-[20rem]">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6 text-gray-700">
              Bienvenido
            </h1>
            <a
              href="/auth/login"
              className="text-white rounded-lg duration-300 transition-colors bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-400 py-3 hover:shadow-sm shadow-sm font-bold text-center flex items-center justify-center text-gray-600"
            >
              Iniciar sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
