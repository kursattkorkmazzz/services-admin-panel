export type TableHeaderProps = {
  data: React.ReactNode[];
};
export default function TableHeader(props: TableHeaderProps) {
  return (
    <thead className="text-left bg-gray-100">
      <tr>
        {props.data.map((column, i) => {
          return (
            <th key={i} className="px-3 py-4 font-medium text-sm">
              {column}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
