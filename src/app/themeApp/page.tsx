export default function Colors() {
  const colors = [
    {
      name: 'Fondo principal',
      hex: '#F2F2F2'
    },
    {
      name: 'Acento azul',
      hex: '#89CFF0'
    },
    {
      name: 'Acento rosa',
      hex: '#FFB6C1'
    },
    {
      name: 'Acento amarillo',
      hex: '#FFFACD'
    },
    {
      name: 'Acento verde',
      hex: '#98FB98'
    },
    {
      name: 'Acento morado',
      hex: '#E6E6FA'
    }
  ]

  return (
    <div className="p-5 md:p-10">
      <h1 className="mb-3 text-2xl font-bold md:text-3xl">Paleta de Colores</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {colors.map((color) => (
          <div
            key={color.name}
            className="rounded-lg border p-2 text-center md:p-4"
            style={{ backgroundColor: color.hex }}
          >
            <div className="mb-1 text-base font-semibold md:text-lg">{color.name}</div>
            <div className="font-mono text-xs md:text-sm">{color.hex}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
