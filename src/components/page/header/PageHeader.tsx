export default function PageHeader({
  title,
  description,
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 bg-white text-black shadow-lg p-3 rounded-sm">
      <h1 className="text-2xl font-medium ">{title}</h1>
      <p className="text-xs font-light text-justify ">{description}</p>
    </div>
  );
}
