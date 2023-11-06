const EjemploComponents = ({ title, img, alt }) => {
  return (
    <div className="border border-x-black border-y-sky-600 p-4 rounded-xl ">
      <div className="text-center font-bold text-xl text-sky-700">{title}</div>
      <div className="flex justify-center">
        <img
          src={img}
          alt={alt}
          className="h-20 w-24 "
        />
      </div>
    </div>
  )
}

export default EjemploComponents
