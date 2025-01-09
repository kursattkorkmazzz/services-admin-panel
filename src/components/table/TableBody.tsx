export type TableBodyProps = {
  data: React.ReactNode[][];
};
export default function TableBody(props: TableBodyProps) {
  return (
    <tbody>
      {props.data.map((row, i1) => {
        return (
          <tr key={i1}>
            {row.map((data, i2) => {
              return (
                <td key={i2} className="px-3 py-4 font-md text-sm">
                  {data}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
