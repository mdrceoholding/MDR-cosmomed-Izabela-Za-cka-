interface PlaceholderViewProps {
  icon: string;
  name: string;
}

export default function PlaceholderView({ icon, name }: PlaceholderViewProps) {
  return (
    <div className="max-w-xl mx-auto bg-slate-800 rounded-lg p-8 text-center mt-16 flex flex-col items-center shadow-lg">
      <i className={`fa-solid ${icon} text-6xl mb-4 text-blue-400`}></i>
      <h2 className="font-bold text-2xl mb-2">{name}</h2>
      <span className="text-slate-400">Ten moduł zostanie udostępniony w przyszłości.</span>
    </div>
  );
}
