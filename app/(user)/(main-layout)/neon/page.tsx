import Add from '@/app/(user)/(main-layout)/neon/add';

export async function getRows() {
  const res = await fetch('http://localhost:3000/api/playing_with_neon', { cache: 'no-store' });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  return data;
}

export default async function Page() {
  const data = await getRows();

  return (
    <div>
      <h1>Data from Neon</h1>
      <Add />
      {data.length > 0 ? (
        <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: { id: number; name: string; value: number }) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item?.value?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
