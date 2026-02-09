const PortionSlider = ({ value, onChange, min = 50, max = 600, step = 10 }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500">
        <span>Min (50g)</span>
        <span className="text-blue-600">Standard (350g)</span>
        <span>Max (600g)</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600"
      />
    </div>
  )
}

export default PortionSlider
